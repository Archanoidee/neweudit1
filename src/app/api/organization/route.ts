import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// Initialize Prisma Client
const prisma = new PrismaClient();

// Handle POST request: Add new organization
export async function POST(req: NextRequest) {
  try {
    const {
      id,
      name,
      type,
      description,
      address,
    } = await req.json();

    // Dropdown data (category, organization stage, and organization proposal status options)
    const dropdown = {
        types: {
            types: [
              { Key: "GN", Value: "General" },
              { Key: "VN", Value: "Vendor" },
              { Key: "CU", Value: "Customer" }
            ]
          }
    };

    // organization data to store inside the `organization` field
    const organizationData = {
        id,
        name,
        type,
        description,
        address,
    };

    // Create a new organization record
    const organization = await prisma.organization.create({
      data: {
        organization: organizationData, // Store all organization details in the `organization` JSON field
        dropdown,            // Store dropdown data in the `dropdown` JSON field
      },
    });

    return NextResponse.json(
      { message: "organization added successfully", organization },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding organization:", error);
    return NextResponse.json({ error: "Failed to add organization" }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Fetch all organizations
    const organizations = await prisma.organization.findMany({
      select: {
        organization: true, // Select only the `organization` field
      },
    });

    // Define the type for organization
    type Organization = {
      name: string;
      type: string;
    };

    // Filter organizations with type "Customer"
    const customerOrganizations = organizations
      .map((org) => org.organization as Organization)
      .filter((org) => org.type === "Customer");

    // Extract names
    const customerNames = customerOrganizations.map((org) => ({
      name: org.name,
    }));

    return NextResponse.json({ success: true, data: customerNames });
  } catch (error) {
    console.error("Error fetching customer names:", error);
    return NextResponse.json({ error: "Failed to fetch customer names" }, { status: 500 });
  }
}
