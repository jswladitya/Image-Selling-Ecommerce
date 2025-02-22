import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Check your db connection string inside .env"
  );
}

let cached = global.mongoose; 
//global doesn't know is there any mongoose object in it , so lets put mongoose into it in types.d.ts file

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  //if u already have cashed connection , go and give the connection
  if (cached.conn) {
    return cached.conn;
  }

  //if u dont have promise in action, lets make one
  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then(() => mongoose.connection);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
