import mongoose from "mongoose";
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/bookmind";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}
//create a cache connection to avoid server crash due to multiple connections
declare global {
  var mongoose: {
    conn: any| null;
    promise: Promise<any> | null;
  };
}
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}
export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }
  try {
    cached.conn = await cached.promise;
    console.log("Connected to MongoDB");
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    console.error("Error connecting to MongoDB:", e);
    throw e;
  }
}
