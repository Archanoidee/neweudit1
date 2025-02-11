"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Search } from "lucide-react";
import { handleDrawerOpen } from "@/context/drawer-state";
import { useSnapshot } from "valtio";
import { store } from "@/context/store";

interface Project {
  _id: string;
  id: string;
  name: string;
  client: string;
  startDate: string;
  endDate: string;
  projectStage: string;
}

const ProjectsListing = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { isSheetOpen } = useSnapshot(store);

  useEffect(() => {
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
    fetchProjects();
  }, [isSheetOpen]);

  // Filter projects based on name OR client
  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!projects.length) {
    return (
      <div className="text-center text-gray-500">No projects available.</div>
    );
  }
  return (
    <>
      {/* Search bar */}
      <div className="relative mt-10 flex w-full items-center rounded-lg border-0 border-gray-300 bg-white p-1">
        {/* Search Input & Button */}
        <div className="flex max-w-md flex-1 items-center gap-2">
          <input
            type="text"
            className="w-72 rounded-lg border border-gray-300 px-3 py-2 outline-none placeholder:text-stone-300 focus:ring-2 focus:ring-blue-500"
            placeholder="Search Content"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="flex w-20 items-center justify-center rounded-lg bg-indigo-800 p-3">
            <Search className="text-white" size={20} />
          </button>
        </div>

        {/* Add Project Button - Moved to Right End */}
        <Button
          className="ml-auto mr-12 transform rounded-xl bg-indigo-800 px-6 py-3 text-white shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-indigo-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => handleDrawerOpen("add-project")}
        >
          Add Project
        </Button>
      </div>

      {/* Grid layout for cards */}
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="flex min-h-[250px] w-full flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-md"
          >
            <h2 className="truncate text-lg font-semibold text-blue-700">
              {project.name}
            </h2>
            <p className="truncate text-black">
                <strong>client:</strong>{" "}
                <strong>{project.client}</strong>
              </p>
            <p className="mt-5 text-sm text-gray-500"> {project.id}</p>
            <div className="mt-2 text-sm text-gray-700">
              <p className="truncate text-black">
                <strong>Start Date:</strong>{" "}
                <strong>{project.startDate}</strong>
              </p>
              <p className="truncate text-black">
                <strong>End Date:</strong> <strong> {project.endDate} </strong>
              </p>
            </div>
            <span className="mt-3 block w-max rounded-full border-gray-100 bg-gray-100 px-3 py-1 text-sm text-green-700">
              {project.projectStage}
            </span>

            <Button
              className="mt-5 w-full rounded-full bg-indigo-800 py-2 text-sm font-medium text-white hover:bg-indigo-800"
              onClick={() => router.push(`/project/${project._id}`)}
            >
              View Details
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProjectsListing;
