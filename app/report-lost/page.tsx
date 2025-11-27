"use client";

import { useState } from "react";
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

export default function ReportLost() {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    const type = "lost";

    formData.append("type", type);
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("category", category);
    formData.append("location", location);
    formData.append("email", email);
    formData.append("phone", String(phone));
    if (image) formData.append("image", image);

    const res = await fetch("/api/lost", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert(data.message || "Saved!");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="px-8 py-10 flex flex-col items-center">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Report a Lost Item
        </h3>

        <div className="max-w-4xl border rounded-md p-8 bg-white ">
          <h2 className="text-xl font-semibold mb-1">Item Details</h2>
          <span className="text-gray-500">
            Provide basic information about the lost item.
          </span>

          <div className="mt-6">
            <h4 className="text-md font-medium">Item Title</h4>
            <Textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2"
              placeholder="e.g., Black Leather Wallet"
            />
          </div>

          <div className="mt-4">
            <h4 className="text-md font-medium">Description</h4>
            <Textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="mt-2"
              placeholder="Provide a detailed description..."
            />
          </div>

          <div className="mt-4">
            <h4 className="text-md font-medium">Category</h4>
            <div className="mt-2">
              <Select onValueChange={setCategory}>
                <SelectTrigger className="w-[455px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wallet">Wallet</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="bag">Bag</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="max-w-4xl border rounded-md p-8 bg-white mt-6 w-[530px]">
          <h2 className="text-xl font-semibold mb-1">Location Information</h2>
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Central Park, Main Street Cafe"
            className="w-full mt-2"
          />
        </div>

        <div className="max-w-4xl border rounded-md p-8 bg-white mt-5">
          <h2 className="text-xl font-semibold mb-1">Upload Photo</h2>
          <span className="text-gray-500">
            Add a photo of your lost item (optional but recommended)
          </span>

          <div className="mt-3">
            <input
              type="file"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="border rounded-md w-[455px] pl-5 h-10"
            />
          </div>
        </div>

        <div className="max-w-4xl border rounded-md p-8 bg-white mt-5">
          <h3 className="text-xl font-semibold mb-1">Enter your date</h3>
          <input
            type="date"
            placeholder="enter your date"
            className="border w-[460px] mt-5 pl-3 rounded-md "
          />
        </div>

        <div className="w-[520px] border rounded-md p-8 bg-white mt-5">
          <h2 className="text-xl font-semibold mb-1">Contact Information</h2>

          <div className="flex gap-4 mt-4">
            <div className="flex-1 flex flex-col">
              <label className="font-semibold mb-1">Email Address</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
              />
            </div>

            <div className="flex-1 flex flex-col">
              <label className="font-semibold mb-1">Phone Number</label>
              <Input
                type="number"
                value={phone}
                onChange={(e) => setPhone(Number(e.target.value))}
                placeholder="+1 (123) 456-7890"
              />
            </div>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          className="w-[520px] mt-6 font-semibold bg-blue-600 text-white hover:bg-blue-700"
        >
          Submit Lost Item Report
        </Button>
      </div>
    </div>
  );
}
