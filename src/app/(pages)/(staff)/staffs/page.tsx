"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/shadcn/input";
import AddStaffButton from "@/components/staff/listing/staffsidebar/page";
import StaffCard from "@/components/staff/listing/stafftile/page";
import axios from "axios";
import { Search } from "lucide-react";

const StaffListing: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [staff, setStaff] = useState<any[]>([]); // State to hold staff data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [filteredStaff, setFilteredStaff] = useState<any[]>([]); // State for filtered staff
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewStaffAdded, setIsNewStaffAdded] = useState(false); // State to track new staff addition

  // Fetch staff data when the component mounts
  const fetchStaff = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await axios.get<{ staff: any[] }>("/api/staff");
      setStaff(response.data.staff); // Access 'staff' from the response
      setFilteredStaff(response.data.staff); // Set filteredStaff initially as all staff
    } catch (error) {
      console.error("Failed to fetch staff:", error);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);
  useEffect(() => {
    fetchStaff();
  }, [isNewStaffAdded]);
  useEffect(() => {
    // Filter staff based on search query
    if (searchQuery) {
      const filtered = staff.filter((member) => {
        const fullName =
          `${member.profile.firstName} ${member.profile.lastName}`.toLowerCase();
        return fullName.includes(searchQuery.toLowerCase());
      });
      setFilteredStaff(filtered);
    } else {
      setFilteredStaff(staff); // Reset to all staff when search is cleared
    }
  }, [searchQuery, staff]);
  return (
    <div className="mt-20">
      <div className="relative min-h-screen bg-gray-50 p-6">
        {/* Search bar on the left and AddStaffButton on the right */}
        <div className="mb-4 flex items-center justify-between">
          {/* Search bar on the left */}
          <div className="flex w-full max-w-md items-center gap-2 rounded-lg p-1">
            <Input
              type="text"
              placeholder="Search Content"
              className="ml-32 w-full rounded-lg px-3 py-2 outline-none placeholder:text-stone-300 focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="flex h-9 w-20 items-center justify-center rounded-lg bg-indigo-800 p-3">
              <Search className="text-white" size={20} />
            </button>
          </div>
          {/* AddStaffButton on the right */}
          <AddStaffButton setIsNewStaffAdded={setIsNewStaffAdded} />
        </div>
        {/* Staff listing grid */}
        <div className="mx-auto mt-6 grid max-w-screen-xl grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredStaff.length > 0 ? (
            filteredStaff.map((staff, index) => (
              <StaffCard key={index} id={staff.id} profile={staff.profile} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No staff members found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default StaffListing;
