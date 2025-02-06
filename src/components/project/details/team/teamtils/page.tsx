"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/shadcn/card";
import { Button } from "@/components/ui/shadcn/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/shadcn/drawer";
import { Input } from "@/components/ui/shadcn/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/shadcn/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/shadcn/avatar";

const TeamCard = () => {
  const [teamMembers, setTeamMembers] = useState<{ name: string; role: string }[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Fetch team members from API
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch("/api/team");
        const data = await response.json();
        if (data.success) {
          setTeamMembers(data.team); // Assuming API returns { success: true, team: [...] }
        }
      } catch (error) {
        console.error("Failed to fetch team members:", error);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="p-8">
      {/* Add Team Drawer */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild>
          <Button className="mb-6">Add Team</Button>
        </DrawerTrigger>

        <DrawerContent className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Add Team</h2>
          <form>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select team type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Internal">Internal</SelectItem>
                  <SelectItem value="External">External</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">Name</label>
              <Input placeholder="Enter Name" />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">Role</label>
              <Input placeholder="Enter Role" />
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </DrawerContent>
      </Drawer>

      {/* Team Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {teamMembers.length > 0 ? (
          teamMembers.map((member, index) => (
            <Card key={index} className="flex w-full flex-col items-center rounded-lg bg-white p-4 shadow-md">
              <Avatar className="h-12 w-12">
                <AvatarImage src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" />
                <AvatarFallback>?</AvatarFallback>
              </Avatar>
              <h2 className="text-center text-lg font-semibold">{member.name}</h2>
              <p className="text-center text-sm text-gray-500">{member.role}</p>
              <Button className="mt-4">View Details</Button>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No team members found.</p>
        )}
      </div>
    </div>
  );
};

export default TeamCard;
