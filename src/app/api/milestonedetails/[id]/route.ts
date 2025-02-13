import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// Handle GET request to fetch milestone by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await params to access 'id'
    const { id } = await params;

    // Validate ID
    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    // Fetch milestone by ID
    const milestone = await prisma.milestone.findUnique({
      where: { id },
    });

    if (milestone) {
      return NextResponse.json(milestone, { status: 200 });
    } else {
      return NextResponse.json({ error: "milestone not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching milestone by ID:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
// Handle PUT request to update milestone profile by ID
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    try {
      // Await params to access 'id'
      const { id } = await params;
      const formData = await req.json(); // Extract raw formData from the request body
  
      // Validate the presence of ID and formData
      if (!id || !formData) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }
  
      // Validate required fields within formData
      const requiredFields = ["title"];
      for (const field of requiredFields) {
        if (!formData[field]) {
          return NextResponse.json(
            { error: `${field} is required` },
            { status: 400 }
          );
        }
      }
  
      // Update milestone profile
      const updatedmilestone = await prisma.milestone.update({
        where: { id },
        data: {
          milestone: formData,
        },
      });
  
      return NextResponse.json(
        { message: "milestone profile updated successfully", milestone: updatedmilestone },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error updating milestone profile:", error);
      return NextResponse.json(
        { error: "Failed to update milestone profile" },
        { status: 500 }
      );
    }
  }