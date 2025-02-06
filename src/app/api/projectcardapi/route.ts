import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// Define the ProjectData type
interface ProjectData {
  name: string;
  owner: string;
  manager: string;
  client: string;
  category: string;
  projectproposalstatus: string;
  projectStage: string;
  worknumber: string;
  startDate: string;
  endDate: string;
  description: string;
  title: string;
  address: string;
}

const prisma = new PrismaClient();

// Handle GET request: Fetch all projects
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  try {
    // Fetch all projects from the database
    const projects = await prisma.project.findMany();

    // Assuming `project.project` contains a JSON object with project details
    const formattedProjects = projects.map((project) => {
      // Cast `project.project` to the correct type (ProjectData)
      const projectData = project.project as unknown as ProjectData;

      return {
        id: project.id,
        name: projectData.name,
        owner: projectData.owner,
        manager: projectData.manager,
        client: projectData.client,
        category: projectData.category,
        projectproposalstatus: projectData.projectproposalstatus,
        projectStage: projectData.projectStage,
        worknumber: projectData.worknumber,
        startDate: projectData.startDate,
        endDate: projectData.endDate,
        description: projectData.description,
        title: projectData.title,
        address: projectData.address,
      };
    });
    // Return the formatted data
    return NextResponse.json({ projects: formattedProjects }, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}