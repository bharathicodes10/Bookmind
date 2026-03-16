import React from "react";

export default function Loading() {
  return (
    <main className="book-page-container">
      <div className="mx-auto max-w-4xl space-y-6">
        <section className="vapi-header-card">
          <div className="vapi-cover-wrapper">
            <div className="vapi-cover-image bg-gray-200 animate-pulse" />
          </div>

          <div className="flex-1 flex flex-col gap-3">
            <div className="h-8 w-3/4 bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-4 w-1/2 bg-gray-200 rounded-lg animate-pulse" />

            <div className="flex flex-wrap items-center gap-2">
              <div className="vapi-status-indicator">
                <span className="vapi-status-dot vapi-status-dot-ready" />
                <span className="vapi-status-text">Loading…</span>
              </div>
              <div className="vapi-status-indicator">
                <span className="vapi-status-text">Loading…</span>
              </div>
              <div className="vapi-status-indicator">
                <span className="vapi-status-text">Loading…</span>
              </div>
            </div>
          </div>
        </section>

        <section className="transcript-container">
          <div className="transcript-empty">
            <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse mb-4" />
            <div className="h-6 w-1/2 bg-gray-200 rounded-lg animate-pulse mb-2" />
            <div className="h-4 w-3/4 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </section>
      </div>
    </main>
  );
}
