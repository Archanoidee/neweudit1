import { MongoClient, GridFSBucket } from "mongodb";

// Use DATABASE_URL from environment variables
const uri = process.env.DATABASE_URL!;
if (!uri) {
  throw new Error("DATABASE_URL is not defined in the environment variables");
}

let client: MongoClient | null = null;

async function getDb() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db(); // Return the database
}
export async function getGridFSBucket() {
  const db = await getDb();
  return new GridFSBucket(db, { bucketName: "uploads" }); // Returns the GridFSBucket instance
}
