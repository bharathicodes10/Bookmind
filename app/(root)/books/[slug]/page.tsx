
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getBookBySlug } from "@/lib/actions/book.action";
import VapiControls from "@/components/VapiControls";

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
  const book=result.data;

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
 <VapiControls book={book}/>
      
    </main>
  );
}
