import type { Metadata } from "next";
import { profile } from "@/lib/site";

export const metadata: Metadata = {
  title: "Résumé — Arun P M",
  description: "Résumé of Arun P M — Senior Frontend Lead Engineer.",
};

const downloadName = "Arun-P-M-Resume.pdf";

export default function ResumePage() {
  return (
    <main className="min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <a
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            <span className="hidden sm:inline">Back to portfolio</span>
            <span className="sm:hidden">Back</span>
          </a>

          <div className="flex items-center gap-2">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer rounded-full border border-border bg-surface/50 px-4 py-2 text-sm text-fg transition-colors hover:border-accent/50"
            >
              Open in new tab
            </a>
            <a
              href={profile.resumeUrl}
              download={downloadName}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-bg transition-colors hover:bg-accent-soft"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
              </svg>
              Download
            </a>
          </div>
        </div>
      </header>

      {/* PDF viewer */}
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          <object
            data={`${profile.resumeUrl}#view=FitH`}
            type="application/pdf"
            className="h-[82vh] w-full"
            aria-label="Résumé PDF"
          >
            {/* Fallback (e.g. mobile browsers that can't embed PDFs) */}
            <div className="flex flex-col items-center gap-4 p-10 text-center">
              <p className="text-muted">
                Your browser can&apos;t display the PDF inline.
              </p>
              <a
                href={profile.resumeUrl}
                download={downloadName}
                className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg transition-colors hover:bg-accent-soft"
              >
                Download résumé (PDF)
              </a>
            </div>
          </object>
        </div>

        <p className="mt-4 text-center text-xs text-faint">
          Trouble viewing? Use{" "}
          <a
            href={profile.resumeUrl}
            download={downloadName}
            className="text-accent hover:text-accent-soft"
          >
            Download
          </a>{" "}
          or{" "}
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-soft"
          >
            open in a new tab
          </a>
          .
        </p>
      </div>
    </main>
  );
}
