import { NextRequest, NextResponse } from "next/server";
import Chat from "@/database/models/Chat";
import { connectToDatabase } from "@/database/mongoose";


export async function POST(req: NextRequest) {
  try {
    const { userId, bookId, message } = await req.json();

    if (!userId || !bookId || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const chat = await Chat.findOneAndUpdate(
      { userId, bookId },
      {
        $push: { messages: message },
      },
      {
        new: true,
        upsert: true,
      }
    );

    return NextResponse.json({ success: true, chat });
  } catch (error) {
    console.error("SAVE CHAT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to save chat" },
      { status: 500 }
    );
  }
}