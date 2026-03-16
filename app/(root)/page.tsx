import BookCard from "@/components/BookCard";
import HeroSection from "@/components/HeroSection";
import { getAllBooks } from "@/lib/actions/book.action";


const Page = async ({ searchParams }: { searchParams: Promise<{ query?: string }> }) => {
    const { query } = await searchParams;

    const bookResults = await getAllBooks(query)
    //empty array in case uploaded book is undefined
    const books = bookResults.success ? bookResults.data ?? [] : []
  return (
    <main className="min-h-screen bg-('--bg-primary')">
      <HeroSection />
      <section className="max-w-7xl mx-auto px-6 py-12">
       
          <div className="library-books-grid">
            {books.map((book) => (
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
export default Page