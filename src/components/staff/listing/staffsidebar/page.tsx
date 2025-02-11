/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";
import axios from "axios";

const AddStaffButton: React.FC<{
  setIsNewStaffAdded: (value: boolean) => void;
}> = ({ setIsNewStaffAdded }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [address, setAddress] = useState("");
  const [designation, setDesignation] = useState("");
  const [languages, setLanguages] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState(""); // Uncommented status
  const [active, setActive] = useState(false); // Added active state
  const [bloodgroup, setBloodgroup] = useState("");
  const [parentsspousename, setParentsSpouseName] = useState("");
  const [identificationmark, setIdentificationMark] = useState("");
  const [salutation, setSalutation] = useState("");
  const [maritalstatus, setMaritalStatus] = useState("");
  const [department, setDepartment] = useState("");

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent form submission from reloading page
    try {
      const response = await axios.post("/api/staff", {
        firstName,
        lastName,
        email,
        phone,
        employeeId,
        dateOfBirth,
        gender,
        nationality,
        address,
        designation,
        languages,
        role,
        status,
        active, // Ensured active is properly set
        bloodgroup,
        parentsspousename,
        identificationmark,
        salutation,
        maritalstatus,
        department,
      });
      setIsNewStaffAdded(true);
      closeSidebar();
    } catch (error) {
      console.error("Failed to add staff:", error);
    }
  };

  const handleToggleActive = () => {
    const action = active ? "deactivate" : "activate";
    const confirmMessage = `Are you sure you want to ${action}?`;

    if (confirm(confirmMessage)) {
      setActive(!active);
    }
  };

  const departments = ["HR", "Engineering", "Marketing", "Sales", "Finance"]; // Add your departments here

  return (
    <>
      <Button
        className="transform rounded-full bg-indigo-800 px-6 py-3 text-white shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-indigo-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={openSidebar}
      >
        Add Staff
      </Button>
      {isSidebarOpen && (
        <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col overflow-y-auto bg-white p-6 shadow-lg">
          <form onSubmit={handleSave}>
            <div className="flex justify-end gap-4 p-6">
              <h3 className="text-xl font-semibold">Personal Information</h3>
              <Button variant="outline" onClick={closeSidebar}>
                Close
              </Button>
              <Button
                className="bg-indigo-800 text-white hover:bg-indigo-800"
                type="submit"
              >
                Save
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Salutation
                </label>
                <Select value={salutation} onValueChange={setSalutation}>
                  <SelectTrigger className="rounded-md border border-gray-100 bg-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select your Salutation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mr.">Mr.</SelectItem>
                    <SelectItem value="Mrs.">Mrs.</SelectItem>
                    <SelectItem value="Miss">Miss</SelectItem>
                    <SelectItem value="Ms.">Ms.</SelectItem>
                    <SelectItem value="Dr.">Dr.</SelectItem>
                    <SelectItem value="Prof.">Prof.</SelectItem>
                    <SelectItem value="Rev.">Rev.</SelectItem>
                    <SelectItem value="Hon.">Hon.</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  First Name <span className="text-red-600">*</span>
                </label>
                <Input
                  required
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={`${
                    !firstName ? "border-red-600 focus:ring-red-500" : ""
                  } borderborder-gray-100 rounded-md bg-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Last Name <span className="text-red-600">*</span>
                </label>
                <Input
                  required
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={`${
                    !lastName ? "border-red-600 focus:ring-red-500" : ""
                  } borderborder-gray-100 rounded-md bg-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Email <span className="text-red-600">*</span>
                </label>
                <Input
                  required
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${
                    !email ? "border-red-600 focus:ring-red-500" : ""
                  } borderborder-gray-100 rounded-md bg-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Contact number
                </label>
                <Input
                  type="text"
                  placeholder="Contact Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="borderborder-gray-100 rounded-md border-red-600 bg-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                  pattern="^\d{10,}$"
                  title="Please enter at least 10 digits"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Employee ID
                </label>
                <Input
                  type="text"
                  placeholder="Enter your id"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="borderborder-gray-100 rounded-md border-red-600 bg-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Date of Birth
                </label>
                <Input
                  type="date"
                  placeholder="DD/MM/YYYY"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="borderborder-gray-100 rounded-md bg-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Languages Preferences
                </label>
                <Select value={languages} onValueChange={setLanguages}>
                  <SelectTrigger className="borderborder-gray-100 rounded-md bg-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select your languages" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Malayalam">Malayalam</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                    <SelectItem value="Tamil">Tamil</SelectItem>
                    <SelectItem value="Telugu">Telugu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Gender</label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger className="borderborder-gray-100 rounded-md bg-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Role</label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="borderborder-gray-100 rounded-md bg-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select your Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Staff">Staff</SelectItem>
                    <SelectItem value="Hr">Hr</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Blood Group
                </label>
                <Select value={bloodgroup} onValueChange={setBloodgroup}>
                  <SelectTrigger className="borderborder-gray-100 rounded-md bg-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select Blood Group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A Positive">A Positive</SelectItem>
                    <SelectItem value="A Negative">A Negative</SelectItem>
                    <SelectItem value="B Positive">B Positive</SelectItem>
                    <SelectItem value="B Negative">B Negative</SelectItem>
                    <SelectItem value="O Positive">O Positive</SelectItem>
                    <SelectItem value="O Negative">O Negative</SelectItem>
                    <SelectItem value="AB Positive">AB Positive</SelectItem>
                    <SelectItem value="AB Negative">AB Negative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Marital Status
                </label>
                <Select value={maritalstatus} onValueChange={setMaritalStatus}>
                  <SelectTrigger className="borderborder-gray-100 rounded-md bg-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder=" Marital Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="Married">Married</SelectItem>
                    <SelectItem value="Divorced">Divorced</SelectItem>
                    <SelectItem value="Widowed">Widowed</SelectItem>
                    <SelectItem value="Separated">Separated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Nationality
                </label>
                <Input
                  type="text"
                  placeholder="Enter your nationality"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className="borderborder-gray-100 rounded-md bg-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Designation
                </label>
                {/* "Manager",
    "Developer",
    "Designer",
    "Marketing Lead",
    "HR Executive", */}
                <Select value={designation} onValueChange={setDesignation}>
                  <SelectTrigger className="rounded-md border border-gray-100 bg-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select Designation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manager">
                    Manager
                    </SelectItem>
                    <SelectItem value="Developer">
                    Developer
                    </SelectItem>
                    <SelectItem value="Designer">Designer</SelectItem>
                    <SelectItem value="Marketing Lead">
                    Marketing Lead
                    </SelectItem>
                    <SelectItem value="HR Executive">HR Executive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Department
                </label>
                <Select onValueChange={(value) => setDepartment(value)}>
                  <SelectTrigger className="rounded-md border border-gray-100 bg-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Parents/spouse Name
                </label>
                <Input
                  type="text"
                  placeholder="Parents/spouse Name"
                  value={parentsspousename}
                  onChange={(e) => setParentsSpouseName(e.target.value)}
                  className="borderborder-gray-100 rounded-md bg-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Identification mark
                </label>
                <Input
                  type="text"
                  placeholder="Identification mark"
                  value={identificationmark}
                  onChange={(e) => setIdentificationMark(e.target.value)}
                  className="borderborder-gray-100 rounded-md bg-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Address
                </label>
                <textarea
                  placeholder="Enter address here"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="borderborder-gray-100 block w-full rounded-md bg-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Active Status
                </label>
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    handleToggleActive();
                  }}
                >
                  {active ? "Deactivate" : "Activate"}
                </Button>
              </div>
              {/* onClick={(e) => {
                  e.preventDefault(); */}
            </div>
          </form>
        </div>
      )}
    </>
  );
};
export default AddStaffButton;
