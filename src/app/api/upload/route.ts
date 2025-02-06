import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";
import { getGridFSBucket } from "../../../lib/gridfs"; // Import GridFS bucket

export async function POST(req: NextRequest) {
  try {
    // Handle the form data
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Get GridFS bucket instance from lib/gridfs.ts
    const bucket = await getGridFSBucket();

    // Create an upload stream and pipe the file buffer to it
    const uploadStream = bucket.openUploadStream(file.name);
    const fileBuffer = await file.arrayBuffer();
    const readableStream = Readable.from(Buffer.from(fileBuffer));

    // Pipe the file buffer into GridFS
    readableStream.pipe(uploadStream);

    // Respond with success
    return NextResponse.json({ message: "File uploaded successfully", fileId: uploadStream.id });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// Disable bodyParser for file uploads
export const config = { api: { bodyParser: false } };
