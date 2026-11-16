import Reveal from "./Reveal";
import { profile } from "@/lib/site";

const allLinks = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: (
      <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm0 2.4V18h18V7.4l-9 6-9-6Zm1.8-.4L12 11.2 19.2 7H4.8Z" />
    ),
  },
  {
    label: "GitHub",
    value: profile.github.replace("https://", ""),
    href: profile.github,
    icon: (
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.22-3.37-1.22-.46-1.18-1.11-1.5-1.11-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    ),
  },
  {
    label: "LinkedIn",
    value: profile.linkedin.replace("https://", ""),
    href: profile.linkedin,
    icon: (
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21h-4V9Z" />
    ),
  },
];

// Hide any profile link that hasn't been filled in yet.
const links = allLinks.filter((link) => link.href);

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-28">
      <Reveal className="card overflow-hidden rounded-3xl p-10 text-center sm:p-16">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">
            Let&apos;s build
          </p>
          <h2 className="mt-4 font-heading text-4xl font-extrabold tracking-tight sm:text-6xl">
            <span className="text-gradient">Have something</span>
            <br />
            <span className="text-gradient-accent">worth making?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-muted">
            I&apos;m open to senior frontend and lead roles and interesting
            collaborations. The fastest way to reach me is email.
          </p>

          <a
            href={`mailto:${profile.email}`}
            className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-bg transition-colors duration-200 hover:bg-accent-soft"
          >
            {profile.email}
          </a>

          <div className="mt-10 flex items-center justify-center gap-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={link.label}
                className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border bg-surface-2/40 text-muted transition-colors duration-200 hover:border-accent/50 hover:text-accent"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 fill-current"
                  aria-hidden="true"
                >
                  {link.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </Reveal>

      <footer className="mt-16 flex flex-col items-center justify-between gap-2 border-t border-border pt-8 text-sm text-faint sm:flex-row">
        <span>
          © {new Date().getFullYear()} {profile.name}. Built with Next.js &amp;
          Three.js.
        </span>
        <span>{profile.location}</span>
      </footer>
    </section>
  );
}
