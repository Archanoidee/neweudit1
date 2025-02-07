/* eslint-disable @next/next/no-img-element */
"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import { Card } from "@/components/ui/shadcn/card";
import ClientOnlyComponent from "@/components/clientonly/ClientOnly";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";

const ProfilePage: React.FC = () => {
  const router = useRouter();
  // const id = searchParams?.get("id");
  const { id } = useParams();
  console.log(id);

  const [formData, setFormData] = useState({
    active: true,
    firstName: "",
    lastName: "",
    contactNumber: "",
    gmail: "",
    employeeId: "",
    role: "",
    department: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    address: "",
    designation: "",
    languages: "",
    bloodgroup: "",
    parentsspousename: "",
    identificationmark: "",
    salutation: "",
    maritalstatus: "",

    salutations: [],
    maritalstatuss: [],
    genders: [],
    language: [],
    bloodgroups: [],
    roles: [],
  });
  console.log(formData.active);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      console.log("hai");
      const fetchUserData = async () => {
        setLoading(true);
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const response = await axios.get<any>(`/api/staff/${id}`);
          console.log(response);

          setFormData({
            active: response.data.profile?.active || false,
            firstName: response.data.profile.firstName || "",
            lastName: response.data.profile.lastName || "",
            contactNumber: response.data.profile.contactNumber || "",
            gmail: response.data.profile.gmail || "",
            employeeId: response.data.profile.employeeId || "",
            role: response.data.profile.role || "",
            department: response.data.profile.department || "",
            dateOfBirth: response.data.profile.dateOfBirth || "",
            gender: response.data.profile.gender || "",
            nationality: response.data.profile.nationality || "",
            address: response.data.profile.address || "",
            designation: response.data.profile.designation || "",
            languages: response.data.profile.languages || "",
            bloodgroup: response.data.profile.bloodgroup || "",
            parentsspousename: response.data.profile.parentsspousename || "",
            identificationmark: response.data.profile.identificationmark || "",
            salutation: response.data.profile.salutation || "",
            maritalstatus: response.data.profile.maritalstatus || "",
            salutations: response.data.dropdown.salutations || [],
            genders: response.data.dropdown.gender || [],
            language: response.data.dropdown.language || [],
            maritalstatuss: response.data.dropdown.maritalstatuss || [],
            bloodgroups: response.data.dropdown.bloodgroups || [],
            roles: response.data.dropdown.roles || [],
          });
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError("Error fetching user data");
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    }
  }, [id]);
  console.log(formData);
  console.log("first", formData.firstName);
  const handletextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value == "Active" ? true : false,
    }));
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  console.log(formData.role);
  const handleSave = async () => {
    setLoading(true);
    try {
      // Send raw formData in the body, directly matching API expectations
      const response = await axios.put(`/api/staff/${id}`, formData);

      if (response.status === 200) {
        alert("Profile updated successfully");
        router.push(`/staff/details/${id}`); // Redirect on success
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error updating profile:", error);
      alert(error.response?.data?.error || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };
  // Handle toggle for both the switch and button
  const handleToggle = () => {
    const action = formData.active ? "deactivate" : "activate"; // Determine the action
    const confirmMessage = `Are you sure you want to ${action}?`;

    // Show confirmation dialog
    if (confirm(confirmMessage)) {
      setFormData((prev) => ({ ...prev, active: !prev.active }));
    }
  };

  return (
    <div className="mt-20">
      <ClientOnlyComponent>
        <div className="h-screen min-h-screen w-full bg-gray-50 p-10">
          <Card className="max-w-10xl mx-auto rounded-lg p-5 shadow-lg">
            <div className="mb-10 flex flex-wrap gap-8 border-b text-lg">
              <Button
                variant="link"
                className="w-full border-b-4 border-blue-600 px-6 py-3 text-center font-semibold text-blue-600 sm:w-auto"
              >
                Profile
              </Button>
            </div>
            <div>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <div>
                  <div className="mt-10 flex items-center justify-between">
                    <h3 className="mb-6 text-left text-xl font-semibold">
                      Personal Information
                    </h3>

                    <div className="flex gap-5">
                     
                      <Button
                        className="rounded bg-indigo-800 hover:bg-indigo-800 px-4 py-2 text-white transition-colors duration-200"
                        onClick={handleSave}
                        disabled={loading}
                      >
                        {loading ? "Saving..." : "Save"}
                      </Button>
                      <Button
                        className=" hover:bg-stone-100 rounded border-gray-100  bg-gray-100 px-4 py-2 text-black transition-colors duration-200 "
                        onClick={() => router.push("/staff/listing")}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                  <div className="mb-10 flex items-center gap-5">
                    <img
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                      alt="Profile Avatar"
                      className="h-20 w-20 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="text-2xl font-semibold">
                        {formData.firstName} {formData.lastName}
                      </h2>
                      <p className="text-sm text-gray-600">
                        Team: {formData.employeeId}
                      </p>
                      <div
                        className="mt-2 flex items-center"
                        style={{ width: "100rem" }}
                      >
                        {/* Input on the left */}
                        <input
                          type="text"
                          readOnly
                          value={formData.active ? "Active" : "Inactive"}
                          className={`  w-24 rounded-md p-1 pl-3 text-sm ${
                            formData.active
                              ? "border-green-500 bg-green-100 text-green-700"
                              : "border-red-500 bg-red-100 text-red-700"
                          }`}
                        />

                        {/* Spacer to push button further to the right */}

                        <div className="absolute right-0"></div>
                        {/* Button on the right */}
                        <Button
                          onClick={handleToggle}
                          className=" hover:bg-stone-100 text-indigo-600 absolute right-16 rounded border-gray-100  bg-gray-100 px-3 py-1 text-sm transition-colors duration-200"
                        >
                          {formData.active ? "Deactivate" : "Activate"}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <form>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                      <div className=" p-5" >
                        <label className="mb-3 block text-sm font-medium tracking-wide text-gray-900">
                          Salutation
                        </label>
                        <Select
                          value={formData.salutation}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              salutation: value,
                            }))
                          }
                        >
                          <SelectTrigger className="rounded-md border border-gray-100  bg-gray-100 p-2  focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <SelectValue placeholder="Select salutation">
                              {formData.salutation || "Select salutation"}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {formData.salutations.map(
                              (item: { Key: string; Value: string }) => (
                                <SelectItem key={item.Key} value={item.Value}>
                                  {item.Value}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className=" p-5" >
                        <label className="mb-3 block text-sm font-medium tracking-wide text-gray-900">
                          First Name<span className="text-red-600">*</span>
                        </label>
                        <Input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="First Name"
                          className="rounded-md border-gray-100  bg-gray-100  focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className=" p-5" >
                        <label className="mb-3 block text-sm font-medium tracking-wide text-gray-900">
                          Last Name<span className="text-red-600">*</span>
                        </label>
                        <Input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Last Name"
                          className="rounded-md border-gray-100  bg-gray-100  focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className=" p-5" >
                        <label className="mb-3 block text-sm font-medium tracking-wide text-gray-900">
                          Date of Birth
                        </label>
                        <Input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          placeholder="DD/MM/YYYY"
                          className="rounded-md border-gray-100  bg-gray-100  focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className=" p-5" >
                        <label className="mb-3 block text-sm font-medium tracking-wide text-gray-900">
                          Gender
                        </label>

                        <Select
                          value={formData.gender}
                          onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, gender: value }))
                          }
                        >
                          <SelectTrigger className="rounded-md border   bg-gray-100 p-2  focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <SelectValue placeholder="Select your gender">
                              {formData.gender || "Select your gender"}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {formData.genders.map(
                              (item: { Key: string; Value: string }) => (
                                <SelectItem
                                  key={item.Key}
                                  value={item.Value}
                                  className="cursor-pointer border-b border-gray-200 px-4 py-2 hover:bg-gray-300"
                                >
                                  {item.Value}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className=" p-5" >
                        <label className="mb-3 block text-sm font-medium tracking-wide text-gray-900">
                          Nationality
                        </label>
                        <Input
                          type="text"
                          name="nationality"
                          value={formData.nationality}
                          onChange={handleInputChange}
                          placeholder="Nationality"
                          className="rounded-md border-gray-100  bg-gray-100  focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div  className=" p-5" >
                        <label className="mb-3 block text-sm font-medium tracking-wide text-gray-900">
                          Contact Number
                        </label>
                        <Input
                          type="text"
                          name="contactNumber"
                          value={formData.contactNumber}
                          onChange={handleInputChange}
                          placeholder="Contact Number"
                          className="rounded-md border-gray-100  bg-gray-100  focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className=" p-5" >
                        <label className="mb-3 block text-sm font-medium tracking-wide text-gray-900">
                          Email ID<span className="text-red-600">*</span>
                        </label>
                        <Input
                          required
                          type="text"
                          name="gmail"
                          value={formData.gmail}
                          onChange={handleInputChange}
                          placeholder="Gmail ID"
                          className="rounded-md border-gray-100  bg-gray-100  focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div  className=" p-5" >
                        <label className="mb-3 block text-sm font-medium tracking-wide text-gray-900">
                          Employee ID
                        </label>
                        <Input
                          type="text"
                          name="employeeId"
                          value={formData.employeeId}
                          onChange={handleInputChange}
                          placeholder="Employee ID"
                          className="rounded-md border-gray-100  bg-gray-100  focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className=" p-5" >
                        <label className="mb-3 block text-sm font-medium tracking-wide text-gray-900">
                          Roles
                        </label>
                        <Select
                          value={formData.role}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              role: value,
                            }))
                          }
                        >
                          <SelectTrigger className="rounded-md border   bg-gray-100 p-2  focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <SelectValue placeholder="Select role">
                              {formData.role || "Select role"}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {formData.roles.map(
                              (item: { Key: string; Value: string }) => (
                                <SelectItem key={item.Key} value={item.Value}>
                                  {item.Value}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      <div  className=" p-5" >
                        <label className="mb-3 block text-sm font-medium tracking-wide text-gray-900">
                          Department
                        </label>
                        <Input
                          type="text"
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          placeholder="Department"
                          className="rounded-md border-gray-100  bg-gray-100  focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className=" p-5" >
                        <label className="mb-3 block text-sm font-medium tracking-wide text-gray-900">
                          Languages
                        </label>
                        <Select
                          value={formData.languages}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              languages: value,
                            }))
                          }
                        >
                          <SelectTrigger className="rounded-md border   bg-gray-100 p-2  focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <SelectValue placeholder="Select languages">
                              {formData.languages || "Select languages"}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {formData.language?.map(
                              (item: { Key: string; Value: string }) => (
                                <SelectItem key={item.Key} value={item.Value}>
                                  {item.Value}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      <div  className=" p-5" >
                        <label className="mb-3 block text-sm font-medium tracking-wide text-gray-900">
                          Marital Status
                        </label>
                        <Select
                          value={formData.maritalstatus}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              maritalstatus: value,
                            }))
                          }
                        >
                          <SelectTrigger className="rounded-md border   bg-gray-100 p-2  focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <SelectValue placeholder="Select marital status">
                              {formData.maritalstatus ||
                                "Select marital status"}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {formData.maritalstatuss.map(
                              (item: { Key: string; Value: string }) => (
                                <SelectItem key={item.Key} value={item.Value}>
                                  {item.Value}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className=" p-5" >
                        <label className="mb-3 block text-sm font-medium tracking-wide text-gray-900">
                          Blood Group
                        </label>
                        <Select
                          value={formData.bloodgroup}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              bloodgroup: value,
                            }))
                          }
                        >
                          <SelectTrigger className="rounded-md border   bg-gray-100 p-2  focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <SelectValue placeholder="Select blood group">
                              {formData.bloodgroup || "Select blood group"}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {formData.bloodgroups.map(
                              (item: { Key: string; Value: string }) => (
                                <SelectItem key={item.Key} value={item.Value}>
                                  {item.Value}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      <div  className=" p-5" >
                        <label className="mb-3 block text-sm font-medium tracking-wide text-gray-900">
                          Designation
                        </label>
                        <Input
                          type="text"
                          name="designation"
                          value={formData.designation}
                          onChange={handleInputChange}
                          placeholder="Designation"
                          className="rounded-md border-gray-100  bg-gray-100  focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="hidden">
                        <label className="mb-3 block text-sm font-medium tracking-wide text-gray-900">
                          status
                        </label>
                        <Input
                          type="text"
                          name="active"
                          value={formData.active ? "Active" : "Inactive"} // Dynamically set the value
                          onChange={handleStatusChange}
                          placeholder="status"
                          className="rounded-md border-gray-100  bg-gray-100  focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className=" p-5" >
                        <label className="mb-3 block text-sm font-medium tracking-wide text-gray-900">
                          Identification Mark
                        </label>
                        <Input
                          type="text"
                          name="identificationmark"
                          value={formData.identificationmark}
                          onChange={handleInputChange}
                          placeholder="Enter Identification Mark"
                          className="rounded-md border-gray-100  bg-gray-100  focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className=" p-5" >
                        <label className="mb-3 block text-sm font-medium tracking-wide text-gray-900">
                          Parent/Spouse Name
                        </label>
                        <Input
                          type="text"
                          name="parentsspousename"
                          value={formData.parentsspousename}
                          onChange={handleInputChange}
                          placeholder="Enter Parent/Spouse Name"
                          className="rounded-md border-gray-100  bg-gray-100  focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div  className=" p-5" >
                        <label className="mb-3 block text-sm font-medium tracking-wide text-gray-900">
                          Address
                        </label>
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handletextareaChange}
                          placeholder="Address"
                          className="f block w-full rounded-md border   bg-gray-100 p-2  focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </Card>
        </div>
      </ClientOnlyComponent>
    </div>
  );
};
export default function Profile() {
  return (
    <Suspense fallback={<div>Loading profile...</div>}>
      <ProfilePage />
    </Suspense>
  );
}
