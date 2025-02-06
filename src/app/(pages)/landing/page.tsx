"use client";

import { Button } from "@/components/ui/shadcn/button";
import { Card } from "@/components/ui/shadcn/card";
import { CardFooter } from "@/components/ui/shadcn/card";
import { CardHeader } from "@/components/ui/shadcn/card";
import { CardDescription } from "@/components/ui/shadcn/card";
import { CardTitle } from "@/components/ui/shadcn/card";
import { NAVIGATION_CARDS } from "../../../../constants/home";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div>
      <div className="mt-20 flex flex-wrap justify-center gap-8 p-8">
        {NAVIGATION_CARDS.map((item) => (
          <Card
            className="w-72 transform rounded-xl border border-gray-200 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
            key={item.id}
          >
            <CardHeader>
              <div className="mb-6 flex justify-center">{item.icon}</div>
              <CardTitle className="text-center text-xl font-semibold text-gray-800">
                {item.title}
              </CardTitle>
              <CardDescription className="text-center text-sm text-gray-600">
                {item.description}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Button
                className="rounded bg-blue-500 px-4 py-2 capitalize text-white transition-colors duration-200 hover:bg-blue-800"
                asChild
              >
                <Link href={item.link.href}>{item.link.title}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default Dashboard;
