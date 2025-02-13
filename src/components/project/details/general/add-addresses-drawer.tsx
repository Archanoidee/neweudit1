"use client";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
// import { Label } from "@/components/ui/shadcn/label"
import { ChangeEvent, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useSnapshot } from "valtio";
import { store } from "@/context/store";
import { handleDrawerClose } from "@/context/drawer-state";

function AddProjectAddress() {
  // const [loading, setLoading] = useState<boolean>(false);
  //  const [newAddress, setNewAddress] = useState({ title: "", address: "" });
  const [formData, setFormData] = useState({ title: "", address: "" });
  const { sheetData } = useSnapshot(store);

  // const router = useRouter();
  const { id } = useParams();
  const handleNewAddressChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    // setLoading(true);
    try {
      const response = await axios.put(`/api/project/${id}`, {
        addresses: [...sheetData.addresses, formData],
      });
      if (response.status === 200) {
        alert("Project updated successfully");
        // router.push(/projects);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error updating project:", error);
      alert(error.response?.data?.error || "Failed to update project");
    } finally {
      // setLoading(false);
    }
  };

  return (
    <>
      <div className="flex h-[80px] w-full justify-between gap-[10px]">
        <div>
          <h1>Add Address</h1>
        </div>
        <div className="flex gap-[10px]">
          <Button onClick={handleDrawerClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>

      <div>
        <div className="mb-4 rounded-md border p-4">
          <h3 className="text-md font-semibold">New Address</h3>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleNewAddressChange}
            className="w-3/4 rounded-md border-gray-100 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="mt-2 block text-sm font-medium text-gray-700">
            Address
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleNewAddressChange}
            className="w-3/4 rounded-md border-gray-100 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <br />
          {/* <Button className="mt-2" onClick={handleAddNewAddress}>
                  Save Address
                </Button> */}
        </div>
      </div>
    </>
  );
}
export default AddProjectAddress;