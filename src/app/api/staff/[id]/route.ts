import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// Handle GET request to fetch staff by ID
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

    // Fetch staff by ID
    const staff = await prisma.staff.findUnique({
      where: { id },
    });

    if (staff) {
      return NextResponse.json(staff, { status: 200 });
    } else {
      return NextResponse.json({ error: "Staff not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching staff by ID:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Handle PUT request to update staff profile by ID
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
    const requiredFields = ["firstName", "lastName", "contactNumber", "gmail"];
    for (const field of requiredFields) {
      if (!formData[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Update staff profile
    const updatedStaff = await prisma.staff.update({
      where: { id },
      data: {
        profile: formData,
      },
    });

    return NextResponse.json(
      { message: "Staff profile updated successfully", staff: updatedStaff },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating staff profile:", error);
    return NextResponse.json(
      { error: "Failed to update staff profile" },
      { status: 500 }
    );
  }
}
