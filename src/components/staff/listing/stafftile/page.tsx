"use client"; 

import { Button } from "@/components/ui/shadcn/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/shadcn/avatar";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/shadcn/badge";

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
    <div className="mx-auto w-[300px] h-[300px] bg-white rounded-lg shadow-lg shadow-gray-300 p-5 overflow-hidden 
                    flex-wrap min-w-[300px] min-h-[400px]">
      {/* Profile Image & Name */}
      <div className="flex items-center mt-6 ">
        <Avatar className="h-14 w-14">
          <AvatarImage
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
            alt={`${profile.firstName} ${profile.lastName}`}
          />
          <AvatarFallback>
            {profile.firstName?.charAt(0)}
            {profile.lastName?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="ml-5">
          <span className="block text-lg font-semibold text-gray-900 truncate w-[200px]">
            {profile.firstName} {profile.lastName}
          </span>
          <span className="text-gray-600 text-md">{profile.role}</span>
        </div>
      </div>
      {/* Last Login & Status */}
      <div className="flex justify-between items-center my-3">
        <p className="text-xs pl-2">
          Last login: <span className="font-bold text-blue-600 text-md">No activity found</span>
        </p>
        <Badge variant={profile.active ? "active" : "inactive"} className="border-0 p-1">
          {profile.active ? "Active" : "Inactive"}
        </Badge>
      </div>
      {/* Contact Info */}
      <div className="bg-gray-100 p-3 rounded-md text-sm">
        <p className="flex items-center gap-2 text-md">
          📧 <span title={profile.gmail}>{shortenEmail(profile.gmail)}</span>
        </p>
        <p className="flex items-center gap-2 mt-2 text-md">📞+91 {profile.contactNumber}</p>
     
      {/* View Details Button */}
      <br />
      <br />
      <br />
      <br />
      </div>
     
      <div className="mt-10 text-center " >  <Button
          className="  p-0 bg-blue-600 text-white px-5 py-2 text-sm rounded-md hover:bg-blue-700"
          onClick={() => router.push(`/staff/details/${id}`)}
        >
          View Details
        </Button></div>
    </div>
  );
};
export default StaffCard;
