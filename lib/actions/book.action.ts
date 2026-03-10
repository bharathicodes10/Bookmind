'use server';
import { connectToDatabase } from "@/database/mongoose";
import { CreateBook, TextSegment } from "@/types";
import { generateSlug, serializeData } from "../utils";
import Book from "@/database/models/book.model";
import BookSegment from "@/database/models/bookSegment.model";


//import Book from "@/database/models/book.model";

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
