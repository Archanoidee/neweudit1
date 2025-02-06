/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// Initialize Prisma Client
const prisma = new PrismaClient();

// Handle POST request: Add new milestone
export async function POST(req: NextRequest) {
  try {
    const {
     title,
     startDate,
     enddate,
     description,
     status,
     milestonestatus,
     milestonestartdate,
     milestoneenddate,
    reason,
    goal,
      // Expecting an array of { title, address }
    } = await req.json();
    
    // Dropdown data (category, milestone stage, and milestone proposal status options)
    const dropdown = {
      milestonestatus: [
        { Key: "OG", Value: "On Going" },
        { Key: "CM", Value: "Completed" },
        { Key: "OH", Value: "On Hold" },
      ],
      status: [
        { Key: "Y", Value: "yes" },
        { Key: "N", Value: "no" },
      ],
    };

    // milestone data to store inside the `milestone` field
    const milestoneData = {
      title,
     startDate,
     enddate,
     description,
     status,
     milestonestatus,
     milestonestartdate,
     milestoneenddate,
    reason,
    goal,// Store as an array of objects
    };

    // Create a new milestone record
    const milestone = await prisma.milestone.create({
      data: {
        milestone: milestoneData, // Store all milestone details in the `milestone` JSON field
        dropdown,            // Store dropdown data in the `dropdown` JSON field
      },
    });

    return NextResponse.json(
      { message: "milestone added successfully", milestone },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding milestone:", error);
    return NextResponse.json({ error: "Failed to add milestone" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const milestone = await prisma.milestone.findMany();
    return NextResponse.json({ milestone }, { status: 200 });
  } catch (error) {
    console.error("Error fetching milestone:", error);
    return NextResponse.json({ error: "Failed to fetch milestone" }, { status: 500 });
  }
}