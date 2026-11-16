"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { drawBack, drawFront, loadFonts, readFonts, CARD_H, CARD_W } from "./drawCard";

const CARD_HEIGHT = 3.5;
const CARD_WIDTH = (CARD_HEIGHT * CARD_W) / CARD_H;

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Brushed titanium: anisotropic streaks catch a moving highlight, foil areas
// read as polished metal, and the edge carries a signal-orange light.
const fragmentShader = /* glsl */ `
  uniform sampler2D uMap;
  uniform sampler2D uMask;
  uniform vec2 uTilt;     // current rotation (y, x) relative to rest
  uniform vec2 uLight;    // glare position in card space
  uniform float uTime;
  uniform float uAspect;  // width / height
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x),
               mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
  }
  float sdRoundBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }

  void main() {
    vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0);
    float d = sdRoundBox(p, vec2(uAspect, 1.0) * 0.5, 0.045);
    float aa = fwidth(d);
    float alpha = 1.0 - smoothstep(-aa, aa, d);
    if (alpha <= 0.0) discard;

    vec3 base = texture2D(uMap, vUv).rgb;
    float m = texture2D(uMask, vUv).r;

    // Polished metal: a bright band sweeps across as the card tilts
    float n = noise(p * 5.0 + uTime * 0.05);
    float phase = dot(p, vec2(1.15, 0.85)) + uTilt.x * 1.7 - uTilt.y * 1.3 + n * 0.12;
    float band = pow(0.5 + 0.5 * cos(6.28318 * phase), 3.0);
    vec3 steel = mix(vec3(0.34, 0.34, 0.36), vec3(0.93, 0.91, 0.87), band);
    // Brushed streaks along the card's width
    float brush = noise(vec2(vUv.x * 2.0, vUv.y * 420.0)) * 0.12;
    vec3 signal = vec3(1.0, 0.353, 0.122);
    vec3 film = steel + brush;

    // Glare that follows the cursor
    vec2 lp = p - uLight;
    float glare = exp(-dot(lp, lp) * 7.0);

    // Sparkle flecks inside the foil
    vec2 cell = floor(vUv * vec2(260.0, 364.0));
    float h = hash(cell);
    float sparkle = step(0.988, h) * (0.5 + 0.5 * sin(uTime * 2.6 + h * 60.0));

    vec3 col = base * (1.0 - m * 0.5);
    col += film * m * (0.42 + 0.75 * glare);
    col += vec3(glare) * 0.07;
    col += vec3(sparkle) * m * 0.35;
    // A touch of signal orange where the glare is hottest
    col += signal * m * glare * glare * 0.35;

    // Signal-orange edge light, brighter on the side facing the light
    float rim = smoothstep(-0.014, -0.003, d);
    float rimLight = 0.55 + 0.45 * clamp(dot(normalize(p + 1e-4), normalize(uLight + 1e-4)), -1.0, 1.0);
    col = mix(col, signal * (0.7 + 0.6 * rimLight), rim * 0.9);

    gl_FragColor = vec4(col, alpha);
  }
`;

type Shared = {
  uTilt: { value: THREE.Vector2 };
  uLight: { value: THREE.Vector2 };
  uTime: { value: number };
  uAspect: { value: number };
};

const makeShared = (): Shared => ({
  uTilt: { value: new THREE.Vector2() },
  uLight: { value: new THREE.Vector2(0.3, 0.4) },
  uTime: { value: 0 },
  uAspect: { value: CARD_WIDTH / CARD_HEIGHT },
});

function makeMaterial(color: HTMLCanvasElement, mask: HTMLCanvasElement, shared: Shared) {
  const map = new THREE.CanvasTexture(color);
  const maskTex = new THREE.CanvasTexture(mask);
  for (const t of [map, maskTex]) {
    // Raw sRGB in, raw sRGB out: keeps the canvas colours exact.
    t.colorSpace = THREE.NoColorSpace;
    t.anisotropy = 4;
    t.generateMipmaps = true;
    t.minFilter = THREE.LinearMipmapLinearFilter;
  }
  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    uniforms: {
      uMap: { value: map },
      uMask: { value: maskTex },
      // The animated uniforms are the same objects on both faces.
      ...shared,
    },
  });
}

type Props = {
  flipped: boolean;
  hovering: React.RefObject<boolean>;
  onFlip: () => void;
  onReady: () => void;
};

export default function HoloCardScene({ flipped, hovering, onFlip, onReady }: Props) {
  const group = useRef<THREE.Group>(null);
  // Animated uniforms live in a ref shared by both faces; useFrame mutates only these.
  const shared = useRef<Shared | null>(null);
  const [materials, setMaterials] = useState<[THREE.ShaderMaterial, THREE.ShaderMaterial] | null>(null);
  const invalidate = useThree((s) => s.invalidate);

  // Draw the card faces once the page fonts are ready.
  useEffect(() => {
    let cancelled = false;
    const fonts = readFonts();
    loadFonts(fonts).then(() => {
      if (cancelled) return;
      const front = drawFront(fonts);
      const back = drawBack(fonts);
      const made: [THREE.ShaderMaterial, THREE.ShaderMaterial] = [
        makeMaterial(front.color, front.mask, (shared.current ??= makeShared())),
        makeMaterial(back.color, back.mask, shared.current),
      ];
      setMaterials(made);
      invalidate();
    });
    return () => {
      cancelled = true;
    };
  }, [invalidate]);

  // Free GPU memory when the card unmounts or the materials change.
  useEffect(
    () => () => {
      materials?.forEach((mat) => {
        (mat.uniforms.uMap.value as THREE.Texture).dispose();
        (mat.uniforms.uMask.value as THREE.Texture).dispose();
        mat.dispose();
      });
    },
    [materials]
  );

  useEffect(() => {
    if (materials) onReady();
  }, [materials, onReady]);

  const geometry = useMemo(() => new THREE.PlaneGeometry(CARD_WIDTH, CARD_HEIGHT), []);
  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state, delta) => {
    const g = group.current;
    const u = shared.current;
    if (!g || !u) return;
    const t = state.clock.elapsedTime;
    const dt = Math.min(delta, 1 / 30);
    const flipBase = flipped ? Math.PI : 0;
    const active = hovering.current;

    const targetY = flipBase + (active ? state.pointer.x * 0.5 : Math.sin(t * 0.45) * 0.16);
    const targetX = active ? -state.pointer.y * 0.38 : Math.sin(t * 0.6) * 0.06;

    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 5, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 5, dt);
    g.position.y = Math.sin(t * 0.8) * 0.05;

    const tiltY = g.rotation.y - flipBase;
    u.uTime.value = t;
    u.uTilt.value.set(tiltY, g.rotation.x);
    // Glare moves opposite to the tilt, like a light fixed in the room.
    u.uLight.value.set(-tiltY * 0.9 + 0.15, g.rotation.x * 1.4 + 0.25);
  });

  if (!materials) return null;

  return (
    <group ref={group}>
      <mesh
        geometry={geometry}
        material={materials[0]}
        onClick={(e) => {
          e.stopPropagation();
          onFlip();
        }}
      />
      <mesh
        geometry={geometry}
        material={materials[1]}
        rotation-y={Math.PI}
        position-z={-0.002}
        onClick={(e) => {
          e.stopPropagation();
          onFlip();
        }}
      />
    </group>
  );
}
