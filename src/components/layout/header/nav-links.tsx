"use client";

import IconAccount from "@/components/icons/account";
import IconBell from "@/components/icons/bell";
import IconSettings from "@/components/icons/settings";
import { Button } from "@/components/ui/shadcn/button";
import { handleDrawerOpen } from "@/context/drawer-state";

const NavLinks = () => {
  const NAV_LINKS = [
    {
      id: 1,
      name: "settings",
      icon: <IconSettings className="size-full" />,
    },
    {
      id: 2,
      name: "notifications",
      icon: <IconBell className="size-full" />,
    },
    {
      id: 3,
      name: "account",
      icon: <IconAccount className="mx-auto size-full" />,
    },
  ];
  return (
    <nav className="flex gap-4">
      {NAV_LINKS.map((item, idx) => (
        <Button
          key={idx + item.id}
          variant="base"
          size="base"
          className="text-secondary-blue-navy p-2 [&_svg]:size-auto"
          onClick={
            item.name === "account"
              ? () => handleDrawerOpen("profile")
              : undefined
          }
        >
          {item.name === "account" ? (
            <span className="bg-secondary-gray-cloud w-5 overflow-hidden rounded-full">
              {item.icon}
            </span>
          ) : (
            item.icon
          )}
        </Button>
      ))}
    </nav>
  );
};

export default NavLinks;
