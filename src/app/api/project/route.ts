import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// Initialize Prisma Client
const prisma = new PrismaClient();

// Handle POST request: Add new project
export async function POST(req: NextRequest) {
  try {
    const {
      id,
      name,
      owner,
      manager,
      client,
      category,
      projectProposalStatus,
      projectStage,
      workNumber,
      startDate,
      endDate,
      description,
      addresses, // Expecting an array of { title, address }
    } = await req.json();

    // Check if the project with the given id already exists
    const existingProjects = await prisma.project.findMany({
      where: {
        project: {
          // We're going to fetch all projects and check manually
        },
      },
    });

    // Loop through the projects and check if the project id exists in the project JSON
     // Loop through the staff records and check if the employeeId exists in the profile
    const isProjectidExists = existingProjects.some((existingProject) => {
      const projectData = existingProject.project as { id: string };
      return projectData.id === id;
    });
    if (isProjectidExists) {
      return NextResponse.json(
        { error: "Project ID already exists" },
        { status: 400 }
      );
    }
    // Ensure addresses are stored as an array of objects
    const formattedAddresses = Array.isArray(addresses)
      ? addresses.map((item) => ({
          title: item.title || "",
          address: item.address || "",
        }))
      : [];
    // Dropdown data (category, project stage, and project proposal status options)
    const dropdown = {
      categorys: [
        { Key: "GA", Value: "General Audit" },
        { Key: "WA", Value: "Water Audit" },
        { Key: "ESA", Value: "Energy Saving Audit" },
        { Key: "SI", Value: "Site Assessment" },
        { Key: "IMB", Value: "IMB" },
        { Key: "NACC", Value: "NACC" },
        { Key: "TA", Value: "Thermography Audit" },
        { Key: "PQA", Value: "Power Quality Audit" },
      ],
      projectStages: [
        { Key: "OG", Value: "On Going" },
        { Key: "CM", Value: "Completed" },
        { Key: "OH", Value: "On Hold" },
      ],
      projectProposalStatuss: [
        { Key: "WON", Value: "Won" },
        { Key: "LOSE", Value: "Lose" },
      ],
    };

    // Project data to store inside the `project` field
    const projectData = {
      id,
      name,
      owner,
      manager,
      client,
      category,
      projectProposalStatus,
      projectStage,
      workNumber,
      startDate,
      endDate,
      description,
      addresses: formattedAddresses, // Store as an array of objects
    };

    // Create a new project record
    const project = await prisma.project.create({
      data: {
        project: projectData, // Store all project details in the `project` JSON field
        dropdown,            // Store dropdown data in the `dropdown` JSON field
      },
    });

    return NextResponse.json(
      { message: "Project added successfully", project },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding project:", error);
    return NextResponse.json({ error: "Failed to add project" }, { status: 500 });
  }
}

// Handle GET request: Fetch all staff names
export async function GET() {
  try {
    // Fetch staff data from the database
    const staff = await prisma.staff.findMany({
      select: {
        profile: true, // Only select the profile field
      },
    });

    // Define the type for profile
    type Profile = {
      firstName: string;
      lastName: string;
    };

    // Extract firstName and lastName from profile JSON
    const staffNames = staff.map((member) => {
      const profile = member.profile as Profile;
      return {
        firstName: profile?.firstName || "",
        lastName: profile?.lastName || "",
      };
    });

    return NextResponse.json({ success: true, data: staffNames });
  } catch (error) {
    console.error("Error fetching staff names:", error);
    return NextResponse.json({ error: "Failed to fetch staff names" }, { status: 500 });
  }
}
