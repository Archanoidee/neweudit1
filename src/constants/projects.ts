import ProjectForm from "@/components/project/details/general/form";
import Milestone from "@/components/project/details/milestone/section";

export const PROJECT_DETAILS_TABS = [
  {
    id: 1,
    name: "General",
    query: "general",
    component: ProjectForm,
  },
  {
    id: 2,
    name: "Milestone",
    query: "milestone",
    component: Milestone,
  },
];
