"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/shadcn/tabs";
import { PROJECT_DETAILS_TABS } from "@/constants/projects";

const ProjectNavSection = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "";

  const handleToggleTab = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "") {
      params.delete("tab");
    } else {
      params.set("tab", value);
    }
    const queryString = params.toString();
    router.push(`${pathname}?${queryString}`, { scroll: false });
  };

  const getTabValue = (id: number, query: string, currentTab: string) => {
    if (id === 1) {
      if (currentTab === "") return "";
      else return query;
    }
    return query;
  };

  return (
    <Tabs
      value={currentTab}
      onValueChange={handleToggleTab}
      className=" size-full"
    >
      <TabsList className="w-full justify-normal">
        {PROJECT_DETAILS_TABS.map((item) => (
          <TabsTrigger
            value={getTabValue(item.id, item.query, currentTab)}
            key={item.id}
          >
            {item.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {PROJECT_DETAILS_TABS.map((item) => (
        <TabsContent
          value={getTabValue(item.id, item.query, currentTab)}
          key={item.id}
          className=""
        >
          {item.component && <item.component />}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ProjectNavSection;
