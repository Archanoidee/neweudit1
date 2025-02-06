import { PrismaClient,  } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

type Profile = {
  firstName: string;
  lastName: string;
};

type Organization = {
  name: string;
  type: string;
};
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      console.error("ID is missing or invalid");
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    // Fetch project by ID
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      console.error(`Project not found for ID: ${id}`);
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Fetch staff data
    const staff = await prisma.staff.findMany({
      select: { profile: true },
    });

    if (!staff) {
      console.error("No staff data found");
      return NextResponse.json({ error: "Staff data not found" }, { status: 404 });
    }

    const staffNames = staff.map((member) => {
      const profile = member.profile as Profile | null;
      return {
        firstName: profile?.firstName || "Unknown",
        lastName: profile?.lastName || "Unknown",
      };
    });

    // Fetch organizations
    const organizations = await prisma.organization.findMany({
      select: { organization: true },
    });

    if (!organizations) {
      console.error("No organizations data found");
      return NextResponse.json({ error: "Organizations data not found" }, { status: 404 });
    }

    const customerOrganizations = organizations
      .map((org) => org.organization as Organization | null)
      .filter((org) => org && org.type === "Customer");

    const customerNames = customerOrganizations.map((org) => ({ name: org?.name }));

    // Combine all results
    const combinedResponse = {
      project,
      staffNames,
      customerNames,
    };

    return NextResponse.json(combinedResponse, { status: 200 });
  } catch (error) {
    console.error("Error handling combined GET request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

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
console.log(formData.project);

    // If formData is a collection-like structure, update only specific fields
    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        // Assuming formData contains the entire 'project' collection you want to store
        project: formData // If the project is a collection, this is the update
         // Similarly for dropdown if required
      },
    });

    return NextResponse.json(
      { message: "Project updated successfully", project: updatedProject },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}


// // Handle PUT request to update project by ID
// export async function PUT(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     // Await params to access 'id'
//     const { id } = await params;

//     const formData = await req.json(); // Extract raw formData from the request body

//     // Validate the presence of ID and formData
//     if (!id || !formData) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Validate required fields within formData
//     const requiredFields = ["project", "dropdown"]; // Example fields that are required for project
//     for (const field of requiredFields) {
//       if (!formData[field]) {
//         return NextResponse.json(
//           { error: `${field} is required` },
//           { status: 400 }
//         );
//       }
//     }
//         // Update project
//         const updatedProject = await prisma.project.update({
//           where: { id },
//           data: {
//             project: formData.project,
//             dropdown: formData.dropdown,
//             updatedAt: new Date(), // Automatically set updated time
//           },
//         });
    
//         return NextResponse.json(
//           { message: "Project updated successfully", project: updatedProject },
//           { status: 200 }
//         );
//       } catch (error) {
//         console.error("Error updating project:", error);
    
//         if (error instanceof Prisma.PrismaClientKnownRequestError) {
//           return NextResponse.json(
//             { error: `Prisma error: ${(error as Prisma.PrismaClientKnownRequestError).message}` },
//             { status: 400 }
//           );
//         }
    
//         return NextResponse.json(
//           { error: "Failed to update project" },
//           { status: 500 }
//         );
//       }
//     }