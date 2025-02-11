
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // Read request body
    const body = await req.json();
    console.log("Received Body:", body); // Log request body

    // Check if request body is missing
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: "Request body is missing" }, { status: 400 });
    }
    // Extract fields including `projectId`
    const {
      projectId, // Make sure this is included
      title,
      startDate,
      endDate,
      description,
      status,
      milestoneStatus,
      milestoneStartDate,
      milestoneEndDate,
      reason,
      goal,
    } = body;

    // Validate `projectId`
    if (!projectId || typeof projectId !== "string") {
      return NextResponse.json({ error: "Invalid or missing projectId" }, { status: 400 });
    }

    // Prepare milestone data
    const milestoneData = {
      title,
      startDate,
      endDate,
      description,
      status,
      milestoneStatus,
      milestoneStartDate,
      milestoneEndDate,
      reason,
      goal,
    };

    // Dropdown options
    const dropdown = {
      milestonestatus: [
        { Key: "OG", Value: "On Going" },
        { Key: "CM", Value: "Completed" },
        { Key: "OH", Value: "On Hold" },
      ],
      status: [
        { Key: "Y", Value: "Yes" },
        { Key: "N", Value: "No" },
      ],
    };

    // Save milestone with projectId
    const milestone = await prisma.milestone.create({
      data: {
        milestone: milestoneData,
        dropdown,
        projectId, // Now projectId is properly assigned
      },
    });

    return NextResponse.json(
      { message: "Milestone added successfully", milestone },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding milestone:", error);
    return NextResponse.json({ error: "Failed to add milestone" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}


export async function GET(req: NextRequest) {
  try {
    // Extract projectId from query parameters
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");

    // Validate projectId
    if (!projectId) {
      return NextResponse.json({ error: "projectId is required" }, { status: 400 });
    }

    // Find milestones by projectId
    const milestones = await prisma.milestone.findMany({
      where: { projectId },
    });

    return NextResponse.json({ milestones }, { status: 200 });
  } catch (error) {
    console.error("Error fetching milestones:", error);
    return NextResponse.json({ error: "Failed to fetch milestones" }, { status: 500 });
  }
}
