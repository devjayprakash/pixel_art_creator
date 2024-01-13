import mongoose from 'mongoose';

const MONGO_DB_URL = `mongodb+srv://admin:${process.env.MONGO_DB_PASS}@cluster0.vflma.mongodb.net/pixel_art?retryWrites=true&w=majority`;

let cached = global.mongoose;

//@ts-ignore
if (!cached) cached = global.mongoose = { promise: null, conn: null };

export const connectMongo = async () => {
  if (cached.conn) return cached.conn;
  cached.conn = await mongoose.connect(MONGO_DB_URL);
  return cached.conn;
};

export default connectMongo;
