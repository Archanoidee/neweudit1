"use client";
import ProjectCard from "@/components/project/details/basic/projectcard/page";
import AddprojectButton from "@/components/project/details/basic/projectsidebar/page";
import { useState } from "react";

const Projects = () => {
  const [isNewStaffAdded, setIsNewStaffAdded] = useState(false); // State to track new staff addition
  return (
    <>
    <div className="mt-14" >
      <AddprojectButton setIsNewStaffAdded={setIsNewStaffAdded} />
      <ProjectCard isNewStaffAdded={isNewStaffAdded} />
      </div>
    </>
  );
};
export default Projects;
