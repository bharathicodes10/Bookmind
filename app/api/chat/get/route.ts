import { NextRequest, NextResponse } from "next/server";
import Chat from "@/database/models/Chat";
import { connectToDatabase } from "@/database/mongoose";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const bookId = searchParams.get("bookId");

    if (!userId || !bookId) {
      return NextResponse.json(
        { error: "Missing userId or bookId" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const chat = await Chat.findOne({ userId, bookId });

    return NextResponse.json({
      messages: chat?.messages || [],
    });
  } catch (error) {
    console.error("GET CHAT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch chat" },
      { status: 500 }
    );
  }
}