import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/shadcn/tabs";

const TabNavigation: React.FC = () => {
  return (
    <div className="w-full bg-white shadow-md rounded-lg p-4">
      <Tabs defaultValue="general">
        <TabsList className="flex justify-start gap-6 border-b">
          <TabsTrigger value="general" className="px-4 py-2 text-sm font-medium">
            General
          </TabsTrigger>
          <TabsTrigger value="team" className="px-4 py-2 text-sm font-medium">
            Team
          </TabsTrigger>
          <TabsTrigger
            value="stakeholder"
            className="px-4 py-2 text-sm font-medium"
          >
            Stake Holder
          </TabsTrigger>
          <TabsTrigger value="milestone" className="px-4 py-2 text-sm font-medium">
            Milestone
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TabNavigation;
