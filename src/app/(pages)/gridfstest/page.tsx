"use client";

import Image from "next/image";
import { useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [fileId, setFileId] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select a file to upload");

    setLoading(true);
    setMessage("Uploading...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setMessage("File uploaded successfully");
        console.log("File ID:", data.fileId);
        setFileId(data.fileId); // Store the fileId
        setFileUrl(URL.createObjectURL(file)); // Create URL for the uploaded file
        setFile(null); // Reset the file input
      } else {
        setMessage("File upload failed");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred during file upload");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!fileId) {
      alert("No file to download");
      return;
    }

    const res = await fetch(`/api/files/${fileId}`);

    if (res.ok) {
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "file"; // You can customize the filename here
      a.click();
      window.URL.revokeObjectURL(url); // Clean up the object URL
    } else {
      alert("File download failed");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
        Upload File
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-gray-700 border border-gray-300 rounded-md py-2 px-3"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            loading ? "cursor-wait" : ""
          }`}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {message && <p className="mt-4 text-center text-gray-700">{message}</p>}

      {fileUrl && (
        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold text-gray-700">
            Uploaded Image Preview
          </h3>
          <Image
            src={fileUrl}
            alt="Uploaded File"
            className="mx-auto mt-2 max-h-64 object-cover rounded-md shadow-md"
          />
        </div>
      )}

      {fileId && (
        <div className="mt-4 text-center">
          <button
            onClick={handleDownload}
            className="py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Download File
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
