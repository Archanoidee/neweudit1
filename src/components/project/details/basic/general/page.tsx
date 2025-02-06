/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/shadcn/select";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

interface ProjectData {
  [x: string]: any;
  id: string;
  name: string;
  owner: string;
  manager: string;
  client: string;
  category: string;
  projectProposalStatus: string;
  projectStage: string;
  workNumber: string;
  startDate: string;
  endDate: string;
  description: string;
  title: string;
  address: string;
}

interface DropdownData {
  categorys: Array<{ Key: string; Value: string }>;
  projectProposalStatuss: Array<{ Key: string; Value: string }>;
  projectStages: Array<{ Key: string; Value: string }>;
}

const ProjectForm: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState<{
    id: string;
    name: string;
    owner: string;
    manager: string;
    client: string;
    category: string;
    projectProposalStatus: string;
    projectStage: string;
    workNumber: string;
    startDate: string;
    endDate: string;
    description: string;
    categorys: { Key: string; Value: string }[];
    projectProposalStatuss: { Key: string; Value: string }[];
    projectStages: { Key: string; Value: string }[];
    addresses: { title: string; address: string }[]; // Add this line
  }>({
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
    description: "", // Add this line
    addresses: [],
    categorys: [],
    projectProposalStatuss: [],
    projectStages: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [customerNames, setCustomerNames] = useState<string[]>([]);
  const [staffNames, setStaffNames] = useState<
    { firstName: string; lastName: string }[]
  >([]);
  const [clientSearch, setClientSearch] = useState<string>("");
  const [ownerSearch, setOwnerSearch] = useState<string>("");
  const [managerSearch, setManagerSearch] = useState<string>("");
  const [newAddressAdd, setNewAddressAdd] = useState(false);
  const [newAddress, setNewAddress] = useState({ title: "", address: "" });

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
  const filteredClients = customerNames.filter((name) =>
    name.toLowerCase().includes(clientSearch.toLowerCase())
  );
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddressChange = (
    index: number,
    field: "title" | "address",
    value: string
  ) => {
    setFormData((prev) => {
      const updatedAddresses = prev.addresses.map((addr, i) =>
        i === index ? { ...addr, [field]: value } : addr
      );
      return { ...prev, addresses: updatedAddresses };
    });
  };

  const handleNewAddressChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddNewAddress = () => {
    if (newAddress.title && newAddress.address) {
      setFormData((prev) => ({
        ...prev,
        addresses: [...prev.addresses, newAddress],
      }));
      setNewAddress({ title: "", address: "" }); // Reset the input fields
      setNewAddressAdd(false);
    } else {
      alert("Please fill in both fields.");
    }
  };
  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await axios.put(`/api/project/${id}`, formData);
      if (response.status === 200) {
        alert("Project updated successfully");
        router.push(`/project/details/projectprofile/${id}`);
      }
    } catch (error: any) {
      console.error("Error updating project:", error);
      alert(error.response?.data?.error || "Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const response = await axios.get(`/api/project/${id}`);
        const data = response.data as {
          project: ProjectData;
          dropdown: DropdownData;
          customerNames: { name: string }[];
          staffNames: { firstName: string; lastName: string }[];
        };
        const project = data.project || {};

        console.log(project);
        setFormData({
          id: project.project.id || "",
          name: project.project.name || "",
          owner: project.project.owner || "",
          manager: project.project.manager || "",
          client: project.project.client || "",
          category: project.project.category || "",
          projectProposalStatus: project.project.projectProposalStatus || "",
          projectStage: project.project.projectStage || "",
          workNumber: project.project.workNumber || "",
          startDate: project.project.startDate || "",
          endDate: project.project.endDate || "",
          description: project.project.description || "",
          categorys: project.dropdown.categorys || [],
          projectProposalStatuss: project.dropdown.projectProposalStatuss || [],
          projectStages: project.dropdown.projectStages || [],
          addresses: project.project.addresses || [], // ✅ Add this line
        });
        console.log(data);
        setCustomerNames(
          data.customerNames.map((org: { name: string }) => org.name)
        );
        setStaffNames(
          data.staffNames.map(
            (staffMember: { firstName: string; lastName: string }) => ({
              firstName: staffMember.firstName,
              lastName: staffMember.lastName,
            })
          )
        );
      } catch (error) {
        console.error("Error fetching project data:", error);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-gray-100 p-8">
      <div className="rounded-lg bg-white p-8 shadow-md">
        <form>
          <div className="mt-6 flex items-center justify-between">
            <h1 className="mb-6 text-xl font-semibold underline">
              General Info
            </h1>
            <div className="flex gap-4">
              <Button
                className="rounded bg-blue-900 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-800"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/projects");
                }}
              >
                Cancel
              </Button>
              <Button variant="default" onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="mt-10">
              <label
                htmlFor="id"
                className="block text-sm font-medium text-gray-700"
              >
                ID <span className="text-red-500">*</span>
              </label>
              <Input
                id="id"
                name="id"
                placeholder="Enter your ID"
                className="w-3/4 rounded-md bg-blue-100 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.id}
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-10">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your name"
                className="w-3/4 rounded-md bg-blue-100 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-7">
              <label className="mb-3 block text-sm font-medium tracking-wide text-gray-900">
                Category
              </label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger className="w-3/4 rounded-md bg-blue-100 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <SelectValue
                    placeholder={formData.category || "Select category"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {formData.categorys.map((item) => (
                    <SelectItem key={item.Key} value={item.Value}>
                      {item.Value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mt-1">
              <label
                htmlFor="owner"
                className="block text-sm font-medium text-gray-700"
              >
                Owner
              </label>
              <Select
                onValueChange={(value) =>
                  handleInputChange({
                    target: { name: "owner", value },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
                value={formData.owner}
                name="owner"
              >
                <SelectTrigger className="w-3/4 rounded-md bg-blue-100 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Select Owner" />
                </SelectTrigger>
                <SelectContent>
                  <Input
                    placeholder="Search Owner"
                    value={ownerSearch} // Search state for owner
                    onChange={(e) => setOwnerSearch(e.target.value)} // Update search state
                    className="mb-2 w-full"
                  />
                  {filteredOwners.length > 0 ? (
                    filteredOwners.map((staff, index) => (
                      <SelectItem
                        key={index}
                        value={`${staff.firstName} ${staff.lastName}`}
                      >
                        {`${staff.firstName} ${staff.lastName}`}
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
            <div className="mt-1">
              <label
                htmlFor="manager"
                className="block text-sm font-medium text-gray-700"
              >
                Manager
              </label>
              <Select
                onValueChange={(value) =>
                  handleInputChange({
                    target: { name: "manager", value },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
                value={formData.manager}
                name="manager"
              >
                <SelectTrigger className="w-3/4 rounded-md bg-blue-100 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Select Manager" />
                </SelectTrigger>
                <SelectContent>
                  <Input
                    placeholder="Search Manager"
                    value={managerSearch} // Search state for manager
                    onChange={(e) => setManagerSearch(e.target.value)} // Update search state
                    className="mb-2 w-full"
                  />
                  {filteredManagers.length > 0 ? (
                    filteredManagers.map((staff, index) => (
                      <SelectItem
                        key={index}
                        value={`${staff.firstName} ${staff.lastName}`}
                      >
                        {`${staff.firstName} ${staff.lastName}`}
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
            <div className="mt-1">
              <label
                htmlFor="client"
                className="block text-sm font-medium text-gray-700"
              >
                Client <span className="text-red-500">*</span>
              </label>
              <Select
                onValueChange={(value) =>
                  handleInputChange({
                    target: { name: "client", value },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
                value={formData.client}
                name="client"
              >
                <SelectTrigger className="w-3/4 rounded-md bg-blue-100 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Select Client" />
                </SelectTrigger>
                <SelectContent>
                  <Input
                    placeholder="Search Client"
                    value={clientSearch} // Search state for client
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
            <div>
              <label
                htmlFor="projectProposalStatus"
                className="block text-sm font-medium text-gray-700"
              >
                Project Proposal Status
              </label>
              <Select
                value={formData.projectProposalStatus}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    projectProposalStatus: value,
                  }))
                }
              >
                <SelectTrigger className="w-3/4 rounded-md bg-blue-100 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <SelectValue
                    placeholder={
                      formData.projectProposalStatus || "Select status"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {formData.projectProposalStatuss.map((item) => (
                    <SelectItem key={item.Key} value={item.Value}>
                      {item.Value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="projectStage"
                className="block text-sm font-medium text-gray-700"
              >
                Project Stage
              </label>
              <Select
                value={formData.projectStage}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, projectStage: value }))
                }
              >
                <SelectTrigger className="w-3/4 rounded-md bg-blue-100 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <SelectValue
                    placeholder={formData.projectStage || "Select stage"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {formData.projectStages.map((item) => (
                    <SelectItem key={item.Key} value={item.Value}>
                      {item.Value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
                onChange={handleInputChange}
              />
            </div>

            <div className="mt-1">
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
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-1">
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
                onChange={handleInputChange}
              />
            </div>
            <div className="mt-1">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                placeholder="Enter project description"
                className="w-3/4 rounded-md bg-blue-100 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.description}
                onChange={handleTextareaChange}
              />
            </div>
            <div className="mt-1">
              <h2 className="mb-4 text-lg font-semibold">Addresses</h2>
              {formData.addresses.map((addr, index) => (
                <div key={index} className="p-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <Input
                    className="w-3/4 rounded-md bg-blue-100 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    value={addr.title}
                    onChange={(e) =>
                      handleAddressChange(index, "title", e.target.value)
                    }
                  />
                  <label className="mt-2 block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <textarea
                    className="w-3/4 rounded-md border border-gray-300 bg-blue-100 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={addr.address}
                    onChange={(e) =>
                      handleAddressChange(index, "address", e.target.value)
                    }
                  />
                </div>
              ))}
              {newAddressAdd && (
                <div className="mb-4 rounded-md border p-4">
                  <h3 className="text-md font-semibold">New Address</h3>
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <Input
                    type="text"
                    name="title"
                    value={newAddress.title}
                    onChange={handleNewAddressChange}
                    className="w-3/4 rounded-md bg-blue-100 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="mt-2 block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={newAddress.address}
                    onChange={handleNewAddressChange}
                    className="w-3/4 rounded-md border border-gray-300 bg-blue-100 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <br />
                  <Button className="mt-2" onClick={handleAddNewAddress}>
                    Save Address
                  </Button>
                </div>
              )}
              <Button
                variant="default"
                onClick={(e) => {
                  e.preventDefault();
                  setNewAddressAdd(true);
                }}
              >
                + Add New Address
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ProjectForm;
