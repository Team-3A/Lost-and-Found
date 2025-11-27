"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
export default function ReportFound() {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<number>(0);

  const handleSubmit = async () => {
    const formData = new FormData();
    const type = "found";

    formData.append("type", type);
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("email", email);
    formData.append("category", category);
    formData.append("location", location);
    formData.append("phone", String(phone));
    if (image) formData.append("image", image);

    const res = await fetch("/api/lost", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log({ data });
    alert(data.message || "Saved");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="px-8 py-10 flex flex-col items-center">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Report a Found Item
        </h3>

        <div className=" max-w-4xl  p-8 bg-white ">
          <h2 className="text-xl font-semibold mb-1">Item Details</h2>

          <div className="mt-6">
            <h4 className="text-md font-medium">Item Title</h4>
            <Textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2"
              placeholder="e.g., Black, Silver Ring "
            />
          </div>

          <div className="mt-4">
            <h4 className="text-md font-medium">Description</h4>
            <Textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="mt-2"
              placeholder="Provide a detailed description of the item and its condition."
            />
          </div>

          <div className="mt-4">
            <h4 className="text-md font-medium">Category</h4>
            <div className="mt-2 ">
              <Select onValueChange={setCategory}>
                <SelectTrigger className="w-[455px]">
                  <SelectValue
                    className="text-black"
                    placeholder="Select a category"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className=" max-w-4xl  p-8 bg-white mt-6">
          <h2 className="text-xl font-semibold mb-1">Location Information</h2>
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Central Park, Main Street Cafe"
            className="w-full pl-3"
          ></Input>
          <div className="mt-3">
            <h3 className="text-black">Lost location </h3>
            <img className="-mt-3 w-[472px] -ml-5" src="map2.png" />
            <span className="text-gray-400 -ml-2 text-[14px]">
              Drag the pin to mark the exact spot where the item was found.
            </span>
          </div>
        </div>

        <div className=" max-w-4xl p-8 bg-white mt-5 -ml-35">
          <h2 className="text-xl font-semibold mb-1">Upload Photo</h2>
          <Input
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            type="file"
            className="text-black "
            placeholder="Click to upload photos or drag and drop here"
          ></Input>
        </div>

        <div className="w-[520px] border rounded-md p-8 bg-white mt-5 ml-18">
          <h2 className="text-xl font-semibold mb-1">Contact Information</h2>
          <span className="text-gray-500">
            How can others reach you if your item is found?
          </span>

          <div className="flex gap-4 mt-4">
            <div className="flex-1 flex flex-col">
              <label className="font-semibold mb-1" htmlFor="email">
                Email Address
              </label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="your.email@example.com"
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex-1 flex flex-col">
              <label className="font-semibold mb-1" htmlFor="phone">
                Phone Number
              </label>
              <Input
                id="phone"
                type="number"
                value={phone}
                onChange={(e) => setPhone(Number(e.target.value))}
                placeholder="+1 (123) 456-7890"
                className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          className=" w-[520px] mt-6 borde font-semibold bg-blue-600 hover:bg-blue-700 ml-18"
        >
          Submit Found Item Report
        </Button>
      </div>
    </div>
  );
}
