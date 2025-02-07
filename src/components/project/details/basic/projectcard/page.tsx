
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Search } from "lucide-react";
interface Project {
  _id: string
  id: string;
  name: string;
  client: string;
  startDate: string;
  endDate: string;
  projectStage: string;
}

const ProjectCard: React.FC<{ isNewStaffAdded: boolean }> = ({
  isNewStaffAdded,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

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
  }, [isNewStaffAdded]);

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
    <div className="px-6 pb-6 ">
    {/* Search bar */}
    <div className="  border-gray-200 bg-white flex items-center justify-start mb-6 pl-7">
    <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-300 max-w-md p-1">
      <input
        type="text"
        className=" placeholder:text-stone-300 w-80 rounded-lg  cus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder=  "Search Content"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className=" w-20 bg-indigo-800 p-3 rounded-lg flex items-center justify-center">
        <Search className="text-white" size={20} />
      </button>
    </div>
    </div>

  
    {/* Grid layout for cards */}
    <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
      {filteredProjects.map((project) => (
        <div
          key={project.id}
          className="  w-full min-h-[250px] flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-md"
        >
          <h2 className="text-lg font-semibold text-blue-700 truncate">
            {project.name}
          </h2>
          <p className="text-sm text-gray-500 mt-5 "> {project.id}</p>
          <div className="mt-2 text-sm text-gray-700">
            <p className="truncate text-black ">
              <strong>Start Date:</strong>  <strong>{project.startDate}</strong>
            </p>
            <p className="truncate text-black ">
              <strong>End Date:</strong>  <strong> {project.endDate} </strong>
            </p>
          </div>
          <span className="mt-3 block w-max rounded-full border-gray-100 bg-gray-100 px-3 py-1 text-sm text-green-700">
            {project.projectStage}
          </span>
  
          <Button
            className="mt-5 w-full rounded-full bg-indigo-800 py-2 text-sm font-medium text-white hover:bg-indigo-800"
            onClick={() =>
              router.push(`/project/details/projectprofile/${project._id}`)
            }
          >
            View Details
          </Button>
        </div>
      ))}
    </div>
  </div>
  

  );
};

export default ProjectCard;
