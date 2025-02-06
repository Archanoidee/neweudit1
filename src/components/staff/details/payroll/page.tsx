/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { useRouter } from "next/navigation";

const PayrollPage: React.FC = () => {
  const router = useRouter();

  // State to store form data
  const [formData, setFormData] = useState({
    designation: "",
    joiningDate: "",
    leaveDays: "",
    pf: "",
    esi: "",
    tax: "",
    basicPay: "",
    travelAllowance: "",
    otherAllowance: "",
    dailyAllowance: "",
  });

  const [totalPayroll, setTotalPayroll] = useState<number | null>(null);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Calculate payroll
  const calculatePayroll = () => {
    const {
      basicPay,
      travelAllowance,
      otherAllowance,
      dailyAllowance,
      tax,
    } = formData;

    // Convert values to numbers and handle empty strings as 0
    const total =
      (parseFloat(basicPay) || 0) +
      (parseFloat(travelAllowance) || 0) +
      (parseFloat(otherAllowance) || 0) +
      (parseFloat(dailyAllowance) || 0) -
      (parseFloat(tax) || 0);

    setTotalPayroll(total);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <Card className="max-w-6xl mx-auto shadow-lg rounded-lg">
        <CardHeader>
          <div className="flex items-center gap-6 mb-10">
            <img
              src="/placeholder-avatar.png"
              alt="Profile Avatar"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <CardTitle className="text-2xl font-semibold">Olivia Bennett</CardTitle>
              <p className="text-sm text-gray-600">Team: 003509-ce</p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Navigation Tabs */}
          <div className="flex gap-8 border-b mb-10 text-lg">
            <Button
              variant="link"
              className="py-3 px-6 text-gray-600 hover:text-blue-600"
              onClick={() => router.push("/profile")}
            >
              Profile
            </Button>
            <Button variant="link" className="py-3 px-6 text-gray-600 hover:text-blue-600">
              Skill Management
            </Button>
            <Button
              variant="link"
              className="py-3 px-6 text-blue-600 font-semibold border-b-4 border-blue-600"
            >
              Payrolls
            </Button>
            <Button variant="link" className="py-3 px-6 text-gray-600 hover:text-blue-600">
              Documents
            </Button>
          </div>

          {/* Payroll Form */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Payroll Information</h3>
            <form className="grid grid-cols-2 gap-6">
              <div>
                <Label className="block text-sm font-medium mb-2">Designation/Role</Label>
                <Input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  placeholder="Enter your designation"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-2">Date of Joining</Label>
                <Input
                  type="text"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleInputChange}
                  placeholder="DD/MM/YYYY"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-2">Total Leave Days</Label>
                <Input
                  type="string"
                  name="leaveDays"
                  value={formData.leaveDays}
                  onChange={handleInputChange}
                  placeholder="Enter your leave days"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-2">PF</Label>
                <Input
                  type="string"
                  name="pf"
                  value={formData.pf}
                  onChange={handleInputChange}
                  placeholder="Enter your PF no"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-2">ESI</Label>
                <Input
                  type="string"
                  name="esi"
                  value={formData.esi}
                  onChange={handleInputChange}
                  placeholder="Enter your ESI no"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-2">Tax</Label>
                <Input
                  type="string"
                  name="tax"
                  value={formData.tax}
                  onChange={handleInputChange}
                  placeholder="Enter your tax details"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-2">Basic Pay</Label>
                <Input
                  type="string"
                  name="basicPay"
                  value={formData.basicPay}
                  onChange={handleInputChange}
                  placeholder="$10,000"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-2">Travel Allowance</Label>
                <Input
                  type="string"
                  name="travelAllowance"
                  value={formData.travelAllowance}
                  onChange={handleInputChange}
                  placeholder="$1,000"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-2">Other Allowance</Label>
                <Input
                  type="string"
                  name="otherAllowance"
                  value={formData.otherAllowance}
                  onChange={handleInputChange}
                  placeholder="$6,000"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-2">Daily Allowance</Label>
                <Input
                  type="string"
                  name="dailyAllowance"
                  value={formData.dailyAllowance}
                  onChange={handleInputChange}
                  placeholder="$300"
                />
              </div>
            </form>

            {/* Payroll Calculator Button */}
            <div className="mt-10 flex justify-center">
              <Button
                className="px-8 py-3 bg-blue-600 text-white rounded-md"
                onClick={calculatePayroll}
              >
                Payroll Calculator
              </Button>
            </div>

            {/* Display Calculated Payroll */}
            {totalPayroll !== null && (
              <div className="mt-6 text-center">
                <h4 className="text-lg font-semibold">Total Payroll</h4>
                <p className="text-xl font-bold">${totalPayroll.toFixed(2)}</p>
              </div>
            )}

            {/* Save and Cancel Buttons */}
            <div className="flex justify-end gap-6 mt-10">
              <Button variant="outline" className="px-8 py-3">
                Cancel
              </Button>
              <Button className="px-8 py-3 bg-blue-600 text-white">Save</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollPage;
