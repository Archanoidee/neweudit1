import React from "react";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";

const AddressForm: React.FC = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-9xl  bg-white shadow-md rounded-lg p-8 ">
        <h1 className="text-xl font-semibold mb-6">Address</h1>
        <Button variant="default" className="mb-6">
          Add Address
        </Button>
        <div className="grid grid-cols-3 gap-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <Input id="title" placeholder="Enter your title" />
          </div>

           {/* Address */}
           <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <textarea
              id="Address"
              placeholder="Enter Address"
              className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
          </div>
          
        </div>
      </div>
    </div>
  );
};
export default AddressForm;
