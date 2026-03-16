'use client';
import Link from "next/link";

export default function Error({ error }: { error: Error }) {
  return (
    <main className="book-page-container">
      <div className="mx-auto max-w-4xl space-y-6">
        <section className="transcript-container">
          <div className="transcript-empty">
            <div className="text-xl font-bold text-[var(--text-primary)] mb-2">
              Something went wrong
            </div>
            <div className="text-sm text-[var(--text-muted)] mb-6">
              {error?.message || "Unable to load this book."}
            </div>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-white border border-[var(--border-subtle)] rounded-full px-5 py-3 shadow-sm hover:shadow-md"
            >
              <span className="text-sm font-medium">Back to library</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
