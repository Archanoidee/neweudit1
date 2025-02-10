"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from "@/components/ui/shadcn/sheet";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/shadcn/select";
import axios from "axios";
import { toast } from "sonner";

const AddMilestoneButton = () => {
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    enddate: "",
    description: "",
    status: "",
    milestonestatus: "",
    milestonestartdate: "",
    milestoneenddate: "",
    reason: "",
    goal: "",
  });
  const [isSheetOpen, setIsSheetOpen] = useState(false); // State for controlling sheet visibility
  const milestoneStatusOptions = [
    { key: "OG", value: "On Going" },
    { key: "CM", value: "Completed" },
    { key: "OH", value: "On Hold" },
  ];
  const statusOptions = [
    { key: "Y", value: "Yes" },
    { key: "N", value: "No" },
  ];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/milestone", formData);
      toast.success("Milestone added successfully!"); // Show success message
      setIsSheetOpen(false); // Close the sheet
    } catch (error) {
      console.error("Error adding milestone:", error);
      toast.error("Failed to add milestone");
    }
  };
  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button className="transform rounded-xl bg-indigo-800 px-6 py-3 text-white shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-indigo-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          Add Milestone
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-6">
        <SheetHeader>
          <SheetTitle>Add Milestone</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          {/* Status (Dropdown) */}
  
          {/* Milestone Start Date */}
          <div>
            <Label htmlFor="milestonestartdate">Milestone Start Date</Label>
            <Input type="date" id="milestonestartdate" name="milestonestartdate" value={formData.milestonestartdate} onChange={handleChange} required />
          </div>
          {/* Milestone End Date */}
          <div>
            <Label htmlFor="milestoneenddate">Milestone End Date</Label>
            <Input type="date" id="milestoneenddate" name="milestoneenddate" value={formData.milestoneenddate} onChange={handleChange} required />
          </div>
            {/* Description */}
            <div>
            <Label htmlFor="description">Description</Label>
            <Input id="description" name="description" value={formData.description} onChange={handleChange} required />
          </div>
           {/* Milestone Status (Dropdown) */}
           <div>
            <Label htmlFor="milestonestatus">Milestone Status</Label>
            <Select onValueChange={(value) => handleSelectChange("milestonestatus", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select milestone status" />
              </SelectTrigger>
              <SelectContent>
                {milestoneStatusOptions.map((option) => (
                  <SelectItem key={option.key} value={option.key}>
                    {option.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Goal */}
          <div>
            <Label htmlFor="goal">Goal</Label>
            <Input id="goal" name="goal" value={formData.goal} onChange={handleChange} required />
          </div>
           {/* Start Date */}
           <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} required />
          </div>
          {/* End Date */}
          <div>
            <Label htmlFor="enddate">End Date</Label>
            <Input type="date" id="enddate" name="enddate" value={formData.enddate} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select onValueChange={(value) => handleSelectChange("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.key} value={option.key}>
                    {option.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
           {/* Reason */}
           <div>
            <Label htmlFor="reason">Reason</Label>
            <Input id="reason" name="reason" value={formData.reason} onChange={handleChange} required />
          </div>
          {/* Footer Buttons */}
          <SheetFooter className="mt-6 flex justify-between">
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button type="submit">Save</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};
export default AddMilestoneButton;
