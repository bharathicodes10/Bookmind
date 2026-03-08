import BookCard from "@/components/BookCard";
import HeroSection from "@/components/HeroSection";
import { sampleBooks } from "@/lib/constants";

export default function Page() {
  return (
    <main className="min-h-screen bg-('--bg-primary')">
      <HeroSection />
      <section className="max-w-7xl mx-auto px-6 py-12">
       
          <div className="library-books-grid">
            {sampleBooks.map((book) => (
              <BookCard
                key={book._id}
                title={book.title}
                author={book.author}
                coverURL={book.coverURL}
                slug={book.slug}
              />
            ))}
          </div>
       
      </section>
    </main>
  );
}
