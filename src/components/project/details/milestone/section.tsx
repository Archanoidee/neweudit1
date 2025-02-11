"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/shadcn/button";
import { Search } from "lucide-react";
import AddMilestoneButton from "./add-milestone-button";
import { useParams } from "next/navigation"; // Use useParams to get projectId

interface Milestone {
  id: string;
  milestone: {
    title: string;
    startDate: string;
    endDate: string;
    description: string;
    status: string;
    milestoneStatus: string;
    milestonestartdate: string;
    milestoneenddate: string;
    reason: string;
    goal: string;
  };
}

const Milestone: React.FC = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const fetchMilestones = async () => {
      try {
        console.log("Fetching milestones...");
        const response = await axios.get(`/api/milestone/${id}`);
        console.log("API Response:", response.data);
        const data = response.data as { milestones: Milestone[] };
        setMilestones(data.milestones);
      } catch (error) {
        console.error("Error fetching milestones:", error);
      }
    };

    fetchMilestones();
  }, [id]);

  return (
    <div className="">
      <div className="mb-6 flex items-center justify-start border-black">
        <div className="relative flex w-full items-center rounded-lg border-0 border-gray-300 bg-white p-1">
          <div className="  flex max-w-md flex-1 items-center gap-2">
            <input
              type="text"
              className="w-72 rounded-lg border border-gray-300 px-3 py-2 outline-none placeholder:text-stone-300 focus:ring-2 focus:ring-blue-500"
              placeholder="Search Content"
            />
            <button className=" mb flex w-20 items-center justify-center rounded-lg bg-indigo-800 p-3">
              <Search className="text-white" size={20} />
            </button>
          </div>

          <div className="mb-5 ml-auto mr-8 h-3">
            <AddMilestoneButton />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
                {milestone.milestone.milestoneStatus}
              </span>
              <br />
              <div className="mt-2 bg-gray-100 p-4 text-sm text-gray-700">
                <p className="truncate text-black">
                  <strong>Start Date:</strong> {milestone.milestone.startDate}
                </p>
                <p className="truncate text-black">
                  <strong>End Date:</strong> {milestone.milestone.endDate}
                </p>
                <p className="mt-2 truncate text-black">
                  <strong>Description:</strong>{" "}
                  {milestone.milestone.description}
                </p>
                <br />
              </div>
              <Button className="mt-5 w-full rounded-full bg-indigo-800 py-2 text-sm font-medium text-white hover:bg-indigo-800">
                View Details
              </Button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No milestones available
          </p>
        )}
      </div>
    </div>
  );
};
export default Milestone;
