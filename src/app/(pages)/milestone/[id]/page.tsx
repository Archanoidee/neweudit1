"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/shadcn/select";
import { Button } from "@/components/ui/shadcn/button";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { CalendarIcon, TrashIcon } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/shadcn/popover";
import { Calendar } from "@/components/ui/shadcn/calendar";

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
  const [goals, setGoals] = useState([{ goal: "", startDate: "", endDate: "", status: "" }]);

  type GoalField = "goal" | "startDate" | "endDate" | "status";

  const handleGoalChange = (index: number, field: GoalField, value: string) => {
    const newGoals = [...goals];
    newGoals[index][field] = value;
    setGoals(newGoals);
  };

  const addGoal = () => {
    setGoals([...goals, { goal: "", startDate: "", endDate: "", status: "" }]);
  };

  const removeGoal = (index: number) => {
    const newGoals = goals.filter((_, i) => i !== index);
    setGoals(newGoals);
  };

  return (
    <div className=" mt-12 space-y-6 p-6 border rounded-lg shadow-lg bg-white">
      {/* Title */}
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" placeholder="Enter your title" />
      </div>

      {/* Dates */}
      <div>
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full flex justify-between">
                DD/MM/YY <CalendarIcon className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar mode="single" />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label htmlFor="endDate">End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full flex justify-between">
                DD/MM/YY <CalendarIcon className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar mode="single" />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" placeholder="Enter here" className="h-24" />
      </div>

      {/* Status */}
      <div>
        <Label htmlFor="status">Status</Label>
        <Select>
          <SelectTrigger>
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

      {/* Goals Section */}
      <div>
        <Label>Goal</Label>
        {goals.map((goal, index) => (
          <div key={index} className="flex items-center space-x-2 mt-2">
            <Input
              placeholder="Enter the goal"
              value={goal.goal}
              onChange={(e) => handleGoalChange(index, "goal", e.target.value)}
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-28">
                  {goal.startDate || "Start Date"} <CalendarIcon className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  onSelect={(date) => handleGoalChange(index, "startDate", format(date!, "dd-MM-yyyy"))}
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-28">
                  {goal.endDate || "End Date"} <CalendarIcon className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  onSelect={(date) => handleGoalChange(index, "endDate", format(date!, "dd-MM-yyyy"))}
                />
              </PopoverContent>
            </Popover>
            <Select onValueChange={(value) => handleGoalChange(index, "status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status type" />
              </SelectTrigger>
              <SelectContent>
                {milestoneStatusOptions.map((option) => (
                  <SelectItem key={option.key} value={option.key}>
                    {option.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="ghost" className="text-red-500" onClick={() => removeGoal(index)}>
              <TrashIcon className="w-5 h-5" />
            </Button>
          </div>
        ))}
        <Button variant="outline" className="mt-2" onClick={addGoal}>
          + Add Goal
        </Button>
      </div>

      {/* Reason/Comments */}
      <div>
        <Label htmlFor="reason">Reason / Comments</Label>
        <Textarea id="reason" placeholder="Enter here" className="h-24" />
      </div>
    </div>
  );
};

export default MilestoneProfile;
