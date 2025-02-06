"use client"; // Enables React's client-side rendering.

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/shadcn/avatar";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Project {
  id: string;
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

const ProjectCard: React.FC<{ isNewStaffAdded: boolean }> = ({
  isNewStaffAdded,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const fetchProjects = async () => {
    try {
      const response = await axios.get<{ projects: Project[] }>(
        "/api/projectcardapi"
      );
      setProjects(response.data.projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [isNewStaffAdded]);

  // Filter projects based on name OR client
  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()) // Added client filter
  );

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center text-gray-500">No projects available.</div>
    );
  }

  return (
    <div className="px-6 pb-6">
      {/* Search bar */}
      <div className="mb-6 flex justify-start">
        <input
          type="text"
          className="w-full max-w-md rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search projects by name or client..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Project list */}
      <div className="container mx-auto grid gap-12 pt-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div
              key={project.id}
              className="mx-auto w-[300px] h-[300px] bg-white rounded-lg shadow-lg shadow-gray-300 p-5 overflow-hidden flex-wrap min-w-[300px] min-h-[400px]"
            >
              {/* Profile Image & Name */}
              <div className="flex items-center mt-6">
                <Avatar className="h-14 w-14">
                  <AvatarImage
                    src="https://allnvysbhq.cloudimg.io/v7/www.projectsmart.co.uk/img/project.png"
                    alt={`Avatar for ${project.name}`}
                  />
                  <AvatarFallback>
                    {project.name?.charAt(0)}
                    {project.name?.charAt(1)}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-5">
                  <span className="block text-lg font-semibold text-gray-900 truncate w-[200px]">
                    {project.name}
                  </span>
                  <span className="block text-lg font-semibold text-gray-900 truncate w-[200px]"> client: {project.client}</span>

                </div>
              </div>
              {/* Project Info */}
              
              <div className="bg-gray-100 p-3 rounded-md text-sm">
                
                <p className="flex items-center gap-2 text-md">
                  📅 Start Date: {project.startDate}
                </p>
                <p className="flex items-center gap-2 mt-2 text-md">
                  📅 End Date: {project.endDate}
                </p>
                <p className="flex items-center gap-2 mt-2 text-md">
                  📝 Project Stage: {project.projectStage}
                  
                </p>
                <br />
                <br />
                <br /><br />
                <br />
              </div>

              {/* View Details Button */}
              <div className="mt-10 text-center">
                <Button
                  className="p-0 bg-blue-600 text-white px-5 py-2 text-sm rounded-md hover:bg-blue-700"
                  onClick={() =>
                    router.push(`/project/details/projectprofile/${project.id}`)
                  }
                >
                  View Details
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            No projects match your search query.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
