"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/shadcn/select";
import { Button } from "@/components/ui/shadcn/button";
import { Textarea } from "@/components/ui/shadcn/textarea";

const milestoneStatusOptions = [
  { key: "OG", value: "On Going" },
  { key: "CM", value: "Completed" },
  { key: "OH", value: "On Hold" },
];

const statusOptions = [
  { key: "Y", value: "Yes" },
  { key: "N", value: "No" },
];

const MilestoneProfile = () => {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    description: "",
    status: "",
    milestoneStatus: "",
    milestoneStartDate: "",
    milestoneEndDate: "",
    reason: "",
    goal: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await axios.put(`/api/milestonedetails/${id}`, formData);
      if (response.status === 200) {
        alert("Milestone updated successfully");
        router.push(`/milestone/${id}`);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error updating milestone:", error);
      alert(error.response?.data?.error || "Failed to update milestone");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/milestonedetails/${id}`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const milestone = (response.data as { milestone: any }).milestone || {};

        setFormData({
          title: milestone.title || "",
          startDate: milestone.startDate || "",
          endDate: milestone.endDate || "",
          description: milestone.description || "",
          status: milestone.status || "",
          milestoneStatus: milestone.milestoneStatus || "",
          milestoneStartDate: milestone.milestoneStartDate || "",
          milestoneEndDate: milestone.milestoneEndDate || "",
          reason: milestone.reason || "",
          goal: milestone.goal || "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [id]);

  return (
    <form  onSubmit={(e) => e.preventDefault()} className="mt-12 space-y-6 rounded-lg border bg-gray-100 p-6 shadow-lg">
        {/* Submit Button */}
        <div className="flex justify-end">
  <Button type="button" onClick={handleSave} disabled={loading}>
    {loading ? "Saving..." : "Submit"}
  </Button>
</div>
<div className="grid grid-cols-4  gap-4 p-4 bg-gray-100">
     {/* Title */}
     <div>
        <Label htmlFor="title">Title</Label>
        <Input
                                  className="rounded-md border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"

        id="title" name="title" value={formData.title} onChange={handleInputChange} />
      </div>
</div>
<div className="grid grid-cols-4  gap-4 p-4 bg-gray-100">
  {/* Milestone Dates */}
  <div>
        <Label htmlFor="milestoneStartDate">Milestone Start Date</Label>
        <Input
                                  className="rounded-md border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"

          type="date"
          id="milestoneStartDate"
          name="milestoneStartDate"
          value={formData.milestoneStartDate}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label htmlFor="milestoneEndDate">Milestone End Date</Label>
        <Input
                                  className="rounded-md border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"

          type="date"
          id="milestoneEndDate"
          name="milestoneEndDate"
          value={formData.milestoneEndDate}
          onChange={handleInputChange}
        />
</div>
</div>
      {/* Description */}
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea  className=" w-  h-64 "  id="description" name="description" value={formData.description} onChange={handleInputChange} />
      </div>
      {/* Milestone Status */}
      <div className="w-96" >
        <Label htmlFor="milestoneStatus">Milestone Status</Label>
        <Select
          value={formData.milestoneStatus}
          onValueChange={(value) => setFormData({ ...formData, milestoneStatus: value })}
        >
          <SelectTrigger                           className="rounded-md border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
 >
            <SelectValue placeholder="Select Milestone Status" />
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

    
      <div className="grid grid-cols-4  gap-4 p-4 bg-gray-100">
      {/* Goal */}
      <div>
        <Label htmlFor="goal">Goal</Label>
        <Textarea                           className="rounded-md border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
 id="goal" name="goal" value={formData.goal} onChange={handleInputChange} />
      </div>
            {/* Dates */}
            <div>
        <Label htmlFor="startDate">Start Date</Label>
        <Input                           className="rounded-md border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
 type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleInputChange} />
      </div>
      <div>
        <Label htmlFor="endDate">End Date</Label>
        <Input                           className="rounded-md border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
 type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleInputChange} />
      </div>
    {/* Status */}
    <div>
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
          <SelectTrigger                           className="rounded-md border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
 >
            <SelectValue placeholder="Select Status type" />
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
            {/* Reason / Comments */}
            <div>
        <Label htmlFor="reason">Reason / Comments</Label>
        <Textarea                           className="rounded-md border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
 id="reason" name="reason" value={formData.reason} onChange={handleInputChange} />
      </div>
      </div>
   
    </form>
  );
};

export default MilestoneProfile;