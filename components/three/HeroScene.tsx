"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { Tier } from "./useDeviceTier";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  varying vec3 vNormalW;
  varying vec3 vViewDir;

  float wobble(vec3 p) {
    return (sin(p.x * 3.0 + uTime) +
            sin(p.y * 2.3 + uTime * 1.3) +
            sin(p.z * 2.7 + uTime * 0.7)) / 3.0;
  }

  void main() {
    float d = wobble(position * 1.3) * uAmp;
    vec3 displaced = position + normal * d;
    vec4 worldPos = modelMatrix * vec4(displaced, 1.0);
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vViewDir = normalize(cameraPosition - worldPos.xyz);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uPower;
  varying vec3 vNormalW;
  varying vec3 vViewDir;

  void main() {
    float fres = pow(
      1.0 - clamp(dot(normalize(vNormalW), normalize(vViewDir)), 0.0, 1.0),
      uPower
    );
    vec3 col = mix(uColorA, uColorB, smoothstep(0.15, 1.0, fres));
    col += uColorB * fres * 0.35;
    gl_FragColor = vec4(col, 1.0);
  }
`;

function Blob({ detail }: { detail: number }) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uAmp: { value: 0.13 },
          uPower: { value: 3.1 },
          uColorA: { value: new THREE.Color("#050d0a") },
          uColorB: { value: new THREE.Color("#22c55e") },
        },
      }),
    []
  );

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh material={material}>
      <icosahedronGeometry args={[1.25, detail]} />
    </mesh>
  );
}

function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.3 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#5b708f"
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += 0.0015;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, state.pointer.y * 0.22, 0.05);
    g.position.x = THREE.MathUtils.lerp(g.position.x, state.pointer.x * 0.28, 0.05);
  });

  return <group ref={group}>{children}</group>;
}

export default function HeroScene({ tier }: { tier: Tier }) {
  const detail = tier === "high" ? 24 : 12;
  const count = tier === "high" ? 1400 : 600;

  return (
    <Rig>
      <Blob detail={detail} />
      <Particles count={count} />
    </Rig>
  );
}
