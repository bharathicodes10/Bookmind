
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getBookBySlug } from "@/lib/actions/book.action";

type Props = {
  params: {
    slug: string;
  };
};

export default async function BookDetailsPage({ params }: Props) {
  const { userId } = await auth();

  if (!userId) {
    // If user is not authenticated, send them back to home (or you could redirect to sign in)
    redirect("/");
  }

  const { slug } = await params;
  const result = await getBookBySlug(slug);

  if (!result.success || !result.data) {
    // Let the route-level error boundary show a friendly error state.
    throw new Error("Book not found");
  }

  const { title, author, coverURL, persona } = result.data;

  return (
    <main className="book-page-container">
      <Link href="/" className="back-btn-floating" aria-label="Go back">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[var(--text-primary)]"
        >
          <path
            d="M14 18l-6-6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      <div className="mx-auto max-w-4xl space-y-6">
        <section className="vapi-header-card">
          <div className="vapi-cover-wrapper">
            <Image
              src={coverURL}
              alt={`Cover for ${title}`}
              className="vapi-cover-image"
              width={130}
              height={195}
              unoptimized
            />
            <div className="vapi-mic-wrapper">
              <button
                type="button"
                className="vapi-mic-btn"
                aria-label="Microphone off"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#212a3b]"
                >
                  <path
                    d="M12 15C13.6569 15 15 13.6569 15 12V8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8V12C9 13.6569 10.3431 15 12 15Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19 11C19 14.3137 16.3137 17 13 17H11C7.68629 17 5 14.3137 5 11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 21H16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 17V21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-3">
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-[#212a3b]">
              {title}
            </h1>
            <p className="text-sm text-[var(--text-muted)]">by {author}</p>

            <div className="flex flex-wrap items-center gap-2">
              <div className="vapi-status-indicator">
                <span className="vapi-status-dot vapi-status-dot-ready" />
                <span className="vapi-status-text">Ready</span>
              </div>
              <div className="vapi-status-indicator">
                <span className="vapi-status-text">Voice: {persona}</span>
              </div>
              <div className="vapi-status-indicator">
                <span className="vapi-status-text">0:00/15:00</span>
              </div>
            </div>
          </div>
        </section>

        <section className="transcript-container">
          <div className="transcript-empty">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[var(--text-muted)] mb-4"
            >
              <path
                d="M12 15C13.6569 15 15 13.6569 15 12V8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8V12C9 13.6569 10.3431 15 12 15Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 11C19 14.3137 16.3137 17 13 17H11C7.68629 17 5 14.3137 5 11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 21H16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 17V21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="transcript-empty-text">No conversation yet</div>
            <div className="transcript-empty-hint">
              Click the mic button above to start talking
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
