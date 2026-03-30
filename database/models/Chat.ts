import mongoose, { Schema, models, model } from "mongoose";

const MessageSchema = new Schema(
  {
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const ChatSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    bookId: {
      type: String,
      required: true,
    },
    messages: {
      type: [MessageSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

ChatSchema.index({ userId: 1, bookId: 1 }, { unique: true });

const Chat = models.Chat || model("Chat", ChatSchema);

export default Chat;