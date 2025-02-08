"use client"; // Enables React's client-side rendering.

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/shadcn/button";
import { Search } from "lucide-react";
import AddMilestoneButton from "../addmilestonebutton/page";
// Define the type for Milestone data
interface Milestone {
  id: string;
  milestone: {
    title: string;
    startDate: string;
    enddate: string;
    description: string;
    status: string;
    milestonestatus: string;
    milestonestartdate: string;
    milestoneenddate: string;
    reason: string;
    goal: string;
  };
}

const Milestone: React.FC = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  useEffect(() => {
    // Fetch milestones when the component mounts
    const fetchMilestones = async () => {
      try {
        const response = await axios.get("/api/milestone"); // Adjust API endpoint if needed
        const data = response.data as { milestone: Milestone[] };
        setMilestones(data.milestone); // Update state with fetched milestones
      } catch (error) {
        console.error("Error fetching milestones:", error);
      }
    };

    fetchMilestones();
  }, []);

  return (
    <div className="px-6 pb-6">
      {/* Search bar */}
      <div className="mb-6 flex items-center justify-start border-black pl-7">
        <div className="relative mt-14 flex w-full items-center rounded-lg border-0 border-gray-300 bg-white p-1">
          {/* Search Input & Button */}
          <div className="flex max-w-md flex-1 items-center gap-2">
            <input  
              type="text"
              className="w-72 rounded-lg border border-gray-300 px-3 py-2 outline-none placeholder:text-stone-300 focus:ring-2 focus:ring-blue-500"
              placeholder="Search Content"
            />
            <button className="flex w-20 items-center justify-center rounded-lg bg-indigo-800 p-3">
              <Search className="text-white" size={20} />
            </button>
          </div  >

          {/* Add Milestone Button - Moved to Right End */}
          <div className="mr-8 h-3 ml-auto" >
         <AddMilestoneButton/>
         </div>
        </div>
      </div>

      {/* Grid layout for milestone cards */}
      <div className="grid grid-cols-1 gap-6 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {milestones.length > 0 ? (
          milestones.map((milestone) => (
            <div
              key={milestone.id}
              className="flex min-h-[250px] w-full flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-md"
            >
              <h2 className="truncate text-lg font-semibold text-blue-700">
                {milestone.milestone.title}
              </h2>
              <span className="mt-3 block w-max rounded-full border-gray-100 bg-gray-100 px-3 py-1 text-sm text-green-700">
                {milestone.milestone.milestonestatus}
              </span>
              <br />
              <div className="p-4 mt-2 text-sm text-gray-700 bg-gray-100">
                <p className="truncate text-black">
                  <strong>Start Date:</strong> {milestone.milestone.startDate}
                </p>
                <p className="truncate text-black">
                  <strong>End Date:</strong> {milestone.milestone.enddate}
                </p>
                <p className="mt-2 truncate text-black">
                  <strong>Description:</strong> {milestone.milestone.description}
                </p>
                <br />
              </div>
              <Button className="mt-5 w-full rounded-full bg-indigo-800 py-2 text-sm font-medium text-white hover:bg-indigo-800">
                View Details
              </Button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No milestones available</p>
        )}
      </div>
    </div>
  );
};
export default Milestone;
