'use server';
import { connectToDatabase } from "@/database/mongoose";
import { CreateBook, TextSegment } from "@/types";
import { escapeRegex, generateSlug, serializeData } from "../utils";
import Book from "@/database/models/book.model";
import BookSegment from "@/database/models/bookSegment.model";
import  mongoose  from "mongoose";


//import Book from "@/database/models/book.model";

export const getAllBooks = async (search?: string) => {
    try {
        await connectToDatabase();

        let query = {};

        if (search) {
            const escapedSearch = escapeRegex(search);
            const regex = new RegExp(escapedSearch, 'i');
            query = {
                $or: [
                    { title: { $regex: regex } },
                    { author: { $regex: regex } },
                ]
            };
        }

        const books = await Book.find(query).sort({ createdAt: -1 }).lean();

        return {
            success: true,
            data: serializeData(books)
        }
    } catch (e) {
        console.error('Error connecting to database', e);
        return {
            success: false, error: e
        }
    }
}

export const checkBookExists=async(title:string)=>{
    try{
        await connectToDatabase();
        const slug=generateSlug(title);
        const existingBook=await Book.findOne({slug}).lean();
        return{
            exists:!!existingBook,
            data:existingBook? serializeData(existingBook):null
        }
    } catch(e){
        console.error("error checking book exists",e);
        return{
            exists:false,
            error:e
        }
    }
}

export const createBook = async (bookData: CreateBook) => {
  try {
    await connectToDatabase();
    const slug = generateSlug(bookData.title);
    const existingBook = await Book.findOne({ slug });
    if (existingBook) {
      return {
        success: false,
        data: serializeData(existingBook),
        error:
          "A book with this title already exists. Please choose a different title.",
        alreadyExists: true,
      };
    }
    //check subscription limits before creating a book
    const book = await Book.create({ ...bookData, slug, totalSegments: 0 });
    return { success: true, data: serializeData(book) };
    // const response = await fetch("/api/books", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(bookData)
    // });
    // const result = await response.json();
    // return { success: true, data: result };
  } catch (e) {
    console.error("Error creating book:", e);
    // throw e;
    return {
      success: false,
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
};

export const saveBookSegments = async (
  bookId: string,
  clerkId: string,
  segments: TextSegment[],
) => {
  try {
    await connectToDatabase();
    const segmentstoInsert = segments.map(
      ({ text, segmentIndex, pageNumber, wordCount }) => ({
        clerkId,
        bookId,
        content: text,
        segmentIndex,
        pageNumber,
        wordCount,
      }),
    );
    await BookSegment.insertMany(segmentstoInsert);
    await Book.findByIdAndUpdate(bookId, { totalSegments: segments.length });
    console.log(`Saved ${segments.length} segments for book ${bookId}`);
    return {
      success: true,
      data: {
        segmentsCreated: segments.length,
      },
    };
   
  } catch (e) {
    console.error("Error saving book segments:", e);
    await BookSegment.deleteMany({ bookId });
    await Book.findByIdAndDelete(bookId);
    console.log(
      "Deleted book segments and books due to failure of saving segments",
    );
    return {
      success: false,
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
};

export const getBooks = async (clerkId: string) => {
  try {
    await connectToDatabase();
    const books = await Book.find({ clerkId });
    return { success: true, data: books.map(serializeData) };
  } catch (e) {
    console.error("Error fetching books:", e);
    return {
      success: false,
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
};

export const getBookBySlug = async (slug: string) => {
    try {
        await connectToDatabase();

        const book = await Book.findOne({ slug }).lean();
        console.log("searching slug:",slug)
        console.log("found book",book)

        if (!book) {
            return { success: false, error: 'Book not found' };
        }

        return {
            success: true,
            data: serializeData(book)
        }
    } catch (e) {
        console.error('Error fetching book by slug', e);
        return {
            success: false, error: e
        }
    }
}

// Searches book segments using MongoDB text search with regex fallback
export const searchBookSegments = async (bookId: string, query: string, limit: number = 5) => {
    try {
        await connectToDatabase();

        console.log(`Searching for: "${query}" in book ${bookId}`);

        const bookObjectId = new mongoose.Types.ObjectId(bookId);

        // Try MongoDB text search first (requires text index)
        let segments: Record<string, unknown>[] = [];
        try {
            segments = await BookSegment.find({
                bookId: bookObjectId,
                $text: { $search: query },
            })
                .select('_id bookId content segmentIndex pageNumber wordCount')
                .sort({ score: { $meta: 'textScore' } })
                .limit(limit)
                .lean();
        } catch {
            // Text index may not exist — fall through to regex fallback
            segments = [];
        }

        // Fallback: regex search matching ANY keyword
        if (segments.length === 0) {
            const keywords = query.split(/\s+/).filter((k) => k.length > 2);
            const pattern = keywords.map(escapeRegex).join('|');

            segments = await BookSegment.find({
                bookId: bookObjectId,
                content: { $regex: pattern, $options: 'i' },
            })
                .select('_id bookId content segmentIndex pageNumber wordCount')
                .sort({ segmentIndex: 1 })
                .limit(limit)
                .lean();
        }

        console.log(`Search complete. Found ${segments.length} results`);

        return {
            success: true,
            data: serializeData(segments),
        };
    } catch (error) {
        console.error('Error searching segments:', error);
        return {
            success: false,
            error: (error as Error).message,
            data: [],
        };
    }
};