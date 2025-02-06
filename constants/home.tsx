import {
  BriefcaseIcon,
  FolderIcon,
  MailIcon,
  NetworkIcon,
  UserIcon,
} from "lucide-react";

const iconClassName = "text-blue-500";

export const NAVIGATION_CARDS = [
  {
    id: 1,
    icon: <UserIcon className={iconClassName} />,
    title: "Staff",
    description: "Manage and View staff information with ease.",
    link: { title: "show", href: "/staff/listing" },
  },
  {
    id: 2,
    icon: <FolderIcon className={iconClassName} />,
    title: "Project",
    description: "Explore and manage ongoing projects seamlessly.",
    link: { title: "show", href: "/projects" },
  },
  {
    id: 3,
    icon: <BriefcaseIcon className={iconClassName} />,
    title: "Work",
    description: "Get in touch with our team and collaborate.",
    link: { title: "show", href: "/work" },
  },
  {
    id: 4,
    icon: <NetworkIcon className={iconClassName} />,
    title: "Organization",
    description: "Explore and manage ongoing projects seamlessly.",
    link: { title: "show", href: "/organization" },
  },
  {
    id: 5,
    icon: <MailIcon className={iconClassName} />,
    title: "Contact",
    description: "Get in touch with us for further information.",
    link: { title: "show", href: "/contact" },
  },
];
