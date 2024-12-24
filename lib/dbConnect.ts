import mongoose from "mongoose";

const getMongoUri = (envVariable: any) => {
  let uri: any;
  if (envVariable === 1) {
    uri = process.env.DATABASE_PRODUCTION;
  } else {
    uri = process.env.DATABASE_SEPOLIA;
  }

  if (!uri) {
    throw new Error(`Please define the ${envVariable} environment variable`);
  }
  return uri;
};

interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
  currentUri: string | null;
}

declare global {
  var mongoose: MongooseCache;
}

global.mongoose = global.mongoose || {
  conn: null,
  promise: null,
  currentUri: null,
};

let cached = global.mongoose;

async function dbConnect(envVariable: any) {
  const mongoUri = getMongoUri(envVariable);

  if (
    cached.conn &&
    cached.currentUri === mongoUri &&
    mongoose.connection.readyState === 1
  ) {
    console.log("Using existing database connection");
    return cached.conn;
  }

  if (cached.conn && cached.currentUri !== mongoUri) {
    console.log("Disconnecting from current database");
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
  }

  if (mongoose.connection.readyState === 3) {
    // Estado 'disconnecting'
    await new Promise((resolve) => {
      mongoose.connection.once("disconnected", resolve);
    });
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log("Connecting to new database:", mongoUri);
    cached.promise = mongoose
      .connect(mongoUri, opts)
      .then((mongoose) => mongoose.connection);
    cached.conn = await cached.promise;
    cached.currentUri = mongoUri;
  }

  return cached.conn;
}

export default dbConnect;
