"use client";

import { Button } from "@/components/ui/shadcn/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/shadcn/avatar";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/shadcn/badge";
import { Mail, Phone, User } from "lucide-react"; // Importing icons from Lucide React

// Function to shorten email
const shortenEmail = (email: string | undefined) => {
  const [local, domain] = email?.split("@") || ["", ""];
  const shortenedLocal = local.length > 10 ? `${local.slice(0, 7)}...` : local;
  return `${shortenedLocal}@${domain}`;
};

// Type for staff profile
interface StaffProfile {
  id: string;
  gmail: string;
  contactNumber: string;
  firstName: string;
  lastName: string;
  role: string;
  active: boolean;
}

// Props type for the StaffCard
interface StaffCardProps {
  id: string;
  profile: StaffProfile;
}

const StaffCard: React.FC<StaffCardProps> = ({ id, profile }) => {
  const router = useRouter();

  return (
    <div className="mx-auto w-[320px] bg-white rounded-3xl shadow-md p-6 overflow-hidden flex flex-col items-center border border-gray-200 ">
      {/* Profile Image */}
      <Avatar className="h-16 w-16 border-2 border-gray-300">
        <AvatarImage
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
          alt={`${profile.firstName} ${profile.lastName}`}
        />
        <AvatarFallback className="text-lg font-bold">
          {profile.firstName?.charAt(0)}
          {profile.lastName?.charAt(0)}
        </AvatarFallback>
      </Avatar>

      {/* Name & Role */}
      <h2 className="text-lg font-semibold text-gray-900 mt-3">
        {profile.firstName} {profile.lastName}
      </h2>

      {/* Last Login & Status */}
      <div className="flex justify-between items-center w-full mt-3 px-3">
        <p className="text-xs text-gray-600">
          Last login <span className="font-bold text-blue-600">50 mins ago</span>
        </p>
        <Badge variant={profile.active ? "active" : "inactive"} className="border-0 p-1">
          {profile.active ? "Active" : "Inactive"}
        </Badge>
      </div>

      {/* Contact Info */}
      <div className= "pl-12  bg-gray-100 p-3 rounded-md text-sm w-full mt-3  ">
        <p className="flex items-center gap-2 text-gray-700">
          <User className="w-5 h-5 text-blue-700  " /> {profile.role}
        </p>
        <p className="flex items-center gap-2 mt-2 text-gray-700">
          <Mail className="w-5 h-5 text-blue-700" /> <span title={profile.gmail}>{shortenEmail(profile.gmail)}</span>
        </p>
        <p className="flex items-center gap-2 mt-2 text-gray-700">
          <Phone className="w-5 h-5 text-blue-700" /> {profile.contactNumber}
        </p>
      </div>

      {/* View Details Button */}
      <Button
        className="mt-4 w-full bg-indigo-800 hover:bg-indigo-800 text-white py-2 rounded-full font-medium text-sm"
        onClick={() => router.push(`/staff/details/${id}`)}
      >
        View details
      </Button>
    </div>
  );
};

export default StaffCard;
