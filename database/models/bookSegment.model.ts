import { IBookSegment } from '@/types';
import { Book } from 'lucide-react';
import mongoose, { Document, Schema, model, models } from 'mongoose';

const BookSegmentSchema = new Schema<IBookSegment>(
  {
    clerkId: { type: String, required: true },
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true, index:true },
    content: { type: String, required: true },
    segmentIndex: { type: Number, required: true, index:true },
    pageNumber: { type: Number, index: true },
    wordCount: { type: Number, required: true },
  },
  { timestamps: true }
);
//split a book into segments for LLM processing - dive deeper into it, each segment should have a unique combination of bookId and segmentIndex
BookSegmentSchema.index({ bookId: 1, segmentIndex: 1 }, { unique: true });
BookSegmentSchema.index({ bookId: 1, pageNumber: 1 });
// Add a text index on the content field for full-text search
BookSegmentSchema.index({ bookId: 1, content:'text' });
const BookSegment = models.BookSegment || model<IBookSegment>('BookSegment', BookSegmentSchema);
export default BookSegment;
