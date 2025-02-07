"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/shadcn/select"; // Import Select components
import axios from "axios";
const AddprojectButton: React.FC<{
  setIsNewStaffAdded: (value: boolean) => void;
}> = ({ setIsNewStaffAdded }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    owner: "",
    manager: "",
    client: "",
    category: "",
    projectProposalStatus: "",
    projectStage: "",
    workNumber: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [addresses, setAddresses] = useState<
    { title: string; address: string }[]
  >([]);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [dropdownData, setDropdownData] = useState<{
    category: { Key: string; Value: string }[];
    projectStage: { Key: string; Value: string }[];
    projectProposalStatus: { Key: string; Value: string }[];
  }>({
    category: [],
    projectStage: [],
    projectProposalStatus: [],
  });

  // Add address to array
  const addAddress = () => {
    if (title && address) {
      setAddresses([...addresses, { title, address }]);
      setTitle("");
      setAddress("");
    }
  };

  // Remove an address
  const removeAddress = (index: number) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  // const [message, setMessage] = useState("");
  const [staffNames, setStaffNames] = useState<
    { firstName: string; lastName: string }[]
  >([]);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const [ownerSearch, setOwnerSearch] = useState("");
  const [managerSearch, setManagerSearch] = useState("");
  const [clientSearch, setClientSearch] = useState("");

  const filteredOwners = staffNames.filter((staff) =>
    `${staff.firstName} ${staff.lastName}`
      .toLowerCase()
      .includes(ownerSearch.toLowerCase())
  );

  const filteredManagers = staffNames.filter((staff) =>
    `${staff.firstName} ${staff.lastName}`
      .toLowerCase()
      .includes(managerSearch.toLowerCase())
  );

  const [filteredClients, setFilteredClients] = useState<string[]>([]);
  const [customerNames, setCustomerNames] = useState<string[]>([]);

  // Fetch dropdown data from the server
  useEffect(() => {
    const dropdown = {
      category: [
        { Key: "GA", Value: "General Audit" },
        { Key: "WA", Value: "Water Audit" },
        { Key: "ESA", Value: "Energy Saving Audit" },
        { Key: "SI", Value: "System Integration" },
        { Key: "IMB", Value: "IMB" },
        { Key: "NACC", Value: "NACC" },
        { Key: "TA", Value: "Thermography Audit" },
        { Key: "PQA", Value: "Power Quality Audit" },
      ],
      projectStage: [
        { Key: "OG", Value: "On Going" },
        { Key: "CM", Value: "Completed" },
        { Key: "OH", Value: "On Hold" },
      ],
      projectProposalStatus: [
        { Key: "WON", Value: "Won" },
        { Key: "LOSE", Value: "Lose" },
      ],
    };

    setDropdownData(dropdown);

    // Fetch staff names
    const fetchStaffNames = async () => {
      try {
        const response = await axios.get("/api/project");
        const responseData = response.data as {
          success: boolean;
          data?: { firstName: string; lastName: string }[];
          error?: string;
        };
        if (responseData.success) {
          if (
            response.data &&
            typeof response.data === "object" &&
            "data" in response.data
          ) {
            setStaffNames(
              response.data.data as { firstName: string; lastName: string }[]
            );
          } else {
            console.error("Unexpected response format:", response.data);
          }
          const staffData = response.data as {
            data: { firstName: string; lastName: string }[];
          };
          console.log("Staff Names:", staffData.data);
        } else {
          const errorData = response.data as { error: string };
          console.error("Failed to fetch staff names:", errorData.error);
        }
      } catch (error) {
        console.error("Error fetching staff names:", error);
      }
    };

    fetchStaffNames();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { ...formData, addresses };
      const response = await axios.post("/api/project", payload);

      if (response.status === 201) {
        setFormData({
          id: "",
          name: "",
          owner: "",
          manager: "",
          client: "",
          category: "",
          projectProposalStatus: "",
          projectStage: "",
          workNumber: "",
          startDate: "",
          endDate: "",
          description: "",
        });
        setAddresses([]);
        setIsNewStaffAdded(true);
        closeSidebar();
      } else {
        console.error("Failed to add project");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    const fetchCustomerNames = async () => {
      try {
        const response = await axios.get("/api/organization"); // Adjust the URL based on your API route
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const responseData = response.data as { success: boolean; data?: any };
        if (responseData.success) {
          // Store only the names (strings)
          const names = responseData.data.map(
            (org: { name: string }) => org.name
          );
          setCustomerNames(names);
        }
      } catch (error) {
        console.error("Error fetching customer names:", error);
      }
    };

    fetchCustomerNames();
  }, []);

  useEffect(() => {
    // Filter the client names based on the search input
    setFilteredClients(
      customerNames.filter((name) =>
        name.toLowerCase().includes(clientSearch.toLowerCase())
      )
    );
  }, [clientSearch, customerNames]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="mt-24">
      <>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="ml-11 text-2xl font-semibold">Projects</h1>
          <Button
            className=" mr-11 transform rounded-xl bg-indigo-800 px-6 py-3 text-white shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-indigo-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={openSidebar}
          >
            Add project
          </Button>
        </div>
        {isSidebarOpen && (
          <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col overflow-y-auto bg-white p-6 shadow-lg">
            <Button variant="outline" onClick={closeSidebar}>
              Cancel
            </Button>
            <form onSubmit={handleSubmit}>
              <div className="mt-6 flex items-center justify-between">
                <h1 className="mb-6 text-xl font-semibold underline">
                  General info
                </h1>
                <div className="flex gap-4">
                  <Button variant="default">Save</Button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
                {/* ID Field */}
                <div>
                  <label
                    htmlFor="id"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ID <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="id"
                    name="id"
                    placeholder="Enter project ID"
                    className="w-3/4 rounded-md bg-blue-100 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.id}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter project name"
                    className="w-3/4 rounded-md bg-blue-100 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="owner"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Owner
                  </label>
                  <Select
                    onValueChange={(value) =>
                      handleChange({
                        target: { name: "owner", value },
                      } as React.ChangeEvent<HTMLInputElement>)
                    }
                    value={formData.owner}
                    name="owner"
                  >
                    <SelectTrigger className="w-3/4">
                      <SelectValue placeholder="Select Owner" />
                    </SelectTrigger>
                    <SelectContent>
                      <Input
                        placeholder="Search Owner"
                        value={ownerSearch}
                        onChange={(e) => {
                          setOwnerSearch(e.target.value);
                          console.log("Owner Search:", e.target.value); // Debugging
                        }}
                        className="mb-2 w-full rounded-md bg-blue-100 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {filteredOwners.length > 0 ? (
                        filteredOwners.map((staff, index) => (
                          <SelectItem
                            key={index}
                            value={`${staff.firstName} ${staff.lastName}`}
                          >
                            {staff.firstName} {staff.lastName}
                          </SelectItem>
                        ))
                      ) : (
                        <p className="p-2 text-sm text-gray-500">
                          No results found
                        </p>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label
                    htmlFor="manager"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Manager
                  </label>
                  <Select
                    onValueChange={(value) =>
                      handleChange({
                        target: { name: "manager", value },
                      } as React.ChangeEvent<HTMLInputElement>)
                    }
                    value={formData.manager}
                    name="manager"
                  >
                    <SelectTrigger className="w-3/4">
                      <SelectValue placeholder="Select Manager" />
                    </SelectTrigger>
                    <SelectContent>
                      <Input
                        placeholder="Search Manager"
                        value={managerSearch} // State for searching
                        onChange={(e) => setManagerSearch(e.target.value)} // Update search state
                        className="mb-2 w-full"
                      />
                      {filteredManagers.length > 0 ? ( // Render filtered managers
                        filteredManagers.map((staff, index) => (
                          <SelectItem
                            key={index}
                            value={`${staff.firstName} ${staff.lastName}`}
                          >
                            {staff.firstName} {staff.lastName}
                          </SelectItem>
                        ))
                      ) : (
                        <p className="p-2 text-sm text-gray-500">
                          No results found
                        </p>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label
                    htmlFor="client"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Client <span className="text-red-500">*</span>
                  </label>
                  <Select
                    onValueChange={(value) =>
                      handleChange({
                        target: { name: "client", value },
                      } as React.ChangeEvent<HTMLInputElement>)
                    }
                    value={formData.client}
                    name="client"
                  >
                    <SelectTrigger className="w-3/4">
                      <SelectValue placeholder="Select Client" />
                    </SelectTrigger>
                    <SelectContent>
                      <Input
                        placeholder="Search Client"
                        value={clientSearch} // Search state
                        onChange={(e) => setClientSearch(e.target.value)} // Update search state
                        className="mb-2 w-full"
                      />
                      {filteredClients.length > 0 ? (
                        filteredClients.map((name, index) => (
                          <SelectItem key={index} value={name}>
                            {name}
                          </SelectItem>
                        ))
                      ) : (
                        <p className="p-2 text-sm text-gray-500">
                          No results found
                        </p>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <Select
                    name="category"
                    value={formData.category}
                    onValueChange={(value) =>
                      handleChange({
                        target: { name: "category", value },
                      } as React.ChangeEvent<HTMLInputElement>)
                    }
                    required
                  >
                    <SelectTrigger className="w-3/4">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {dropdownData.category.map((item) => (
                        <SelectItem key={item.Key} value={item.Value}>
                          {item.Value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="proposal-status"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Project Proposal Status
                  </label>
                  <Select
                    name="projectProposalStatus"
                    value={formData.projectProposalStatus}
                    onValueChange={(value) =>
                      handleChange({
                        target: { name: "projectProposalStatus", value },
                      } as React.ChangeEvent<HTMLInputElement>)
                    }
                    required
                  >
                    <SelectTrigger className="w-3/4">
                      <SelectValue placeholder="Select Proposal Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {dropdownData.projectProposalStatus.map((item) => (
                        <SelectItem key={item.Key} value={item.Value}>
                          {item.Value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* Project Stage (Dropdown) */}
                <div className="mb-4">
                  <label
                    htmlFor="project-stage"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Project Stage
                  </label>
                  <Select
                    name="projectStage"
                    value={formData.projectStage}
                    onValueChange={(value) =>
                      handleChange({
                        target: { name: "projectStage", value },
                      } as React.ChangeEvent<HTMLInputElement>)
                    }
                    required
                  >
                    <SelectTrigger className="w-3/4">
                      <SelectValue placeholder="Select Project Stage" />
                    </SelectTrigger>
                    <SelectContent>
                      {dropdownData.projectStage.map((item) => (
                        <SelectItem
                          className="cursor-pointer border-b border-gray-200 px-4 py-2 hover:bg-gray-300"
                          key={item.Key}
                          value={item.Value}
                        >
                          {item.Value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* Work Number */}
                <div>
                  <label
                    htmlFor="workNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Work Number
                  </label>
                  <Input
                    id="workNumber"
                    name="workNumber"
                    placeholder="Enter work number"
                    className="w-3/4 rounded-md bg-blue-100 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.workNumber}
                    onChange={handleChange}
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label
                    htmlFor="startDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Start Date
                  </label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    className="w-3/4 rounded-md bg-blue-100 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="endDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    End Date
                  </label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    className="w-3/4 rounded-md bg-blue-100 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Enter description"
                    className="w-3/4 rounded-md border border-gray-300 bg-blue-100 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  {/* Address Input */}
                  <div className="mt-4">
                    <h2 className="mb-2 text-lg font-semibold">
                      Project Addresses
                    </h2>
                    <br />
                    <div className="flex gap-2">
                      <Input
                        className="w-3/4 rounded-md bg-blue-100 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <br />
                    <div>
                      <textarea
                        className="w-3/4 rounded-md border border-gray-300 bg-blue-100 p-3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <Button type="button" onClick={addAddress}>
                      Add
                    </Button>

                    {/* Display added addresses */}
                    <ul className="mt-2">
                      {addresses.map((addr, index) => (
                        <li
                          key={index}
                          className="mt-1 flex justify-between rounded bg-gray-100 p-2"
                        >
                          {addr.title}: {addr.address}
                          <Button
                            variant="outline"
                            onClick={() => removeAddress(index)}
                          >
                            Remove
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </>
    </div>
  );
};
export default AddprojectButton;
