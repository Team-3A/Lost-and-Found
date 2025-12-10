import { Badge } from "@/components/ui/badge";
import { itemType } from "@/lib/types";
import {
  ChartBarStacked,
  ClipboardMinus,
  Mail,
  Phone,
  Star,
  Wallet,
} from "lucide-react";

import { MapPin } from "lucide-react";

import Link from "next/link";
import React from "react";
async function getItems() {
  const response = await fetch("http://localhost:3000/api/items");
  // console.log(response);

  const resData = await response.json();
  // console.log(resData);

  return resData.data;
}

export default async function LostItemDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const items = await getItems();
  const dynamicParams = await params;
  const id = dynamicParams.id;
  const item = items.find((itm: itemType) => itm._id === id);

  if (!item) {
    return <div className="p-8">Item not found</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto font-sans">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold">{item.title}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-2xl border  h-fit shadow-ls">
          <img
            className="w-180 rounded-t-2xl"
            src={item.imageUrl || "skeleton.png"}
          />
          <div className="flex gap-4 mt-5 mb-3 ml-3">
            <img
              className="w-23 h-20 rounded-2xl"
              src={item.imageUrl || "skeleton.png"}
            />
            <img
              className="w-23 h-20 rounded-2xl"
              src={item.imageUrl || "skeleton.png"}
            />
            <img
              className="w-23 h-20 rounded-2xl"
              src={item.imageUrl || "skeleton.png"}
            />
          </div>
        </div>
        <div>
          <div className="flex gap-4 flex-col w-80 rounded-md border p-6 h-fit shadow-ls">
            <h1 className="text-xl font-semibold">Key Details</h1>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <ChartBarStacked className="text-gray-600" />
                <span className="font-medium text-gray-600">Category:</span>
              </div>
              <span className="font-medium text-gray-800">{item.category}</span>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <ClipboardMinus className="text-gray-600" />
                <span className="font-medium text-gray-600">Reported:</span>
              </div>
              <span className="font-medium text-gray-800">2 days ago</span>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Wallet className="text-gray-600" />
                <span className="font-medium text-gray-600">Value:</span>
              </div>
              <span className="font-medium text-gray-800">$150</span>
            </div>
            <div className="flex justify-between">
              <Star className="text-gray-600" />
              <span className="font-medium text-gray-600">Condition:</span>
              <span className="font-medium text-gray-800">
                Good with minor wear
              </span>
            </div>
          </div>
          <div className="flex gap-4 flex-col w-80 rounded-md border p-6 h-fit shadow-ls mt-5">
            <h1 className="text-xl font-semibold">Actions</h1>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
              <Mail className="inline-block mr-2" />
              Contact Finder
            </button>

            <button className="w-full border border-gray-400 py-3 rounded-lg text-gray-800 hover:bg-gray-100 font-medium">
              <Phone className="inline-block mr-2" />
              Report Item Match
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mt-10 shadow-ls p-6 rounded-lg border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p className="text-gray-700 leading-relaxed">{item.desc}</p>
      </div>
      <div className="max-w-4xl mt-10 shadow-ls p-6 rounded-lg border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4">Location</h2>
        <p className="text-gray-700 leading-relaxed">{item.location}</p>
      </div>
      <h6 className="flex justify-center items-center mt-5 text-gray-500">
        Approximate location where the item was last seen.
      </h6>
      <h1 className="text-3xl mt-20 font-semibold">Related Items</h1>
      <div className="flex gap-4 mt-10 mb-10">
        {items
          .filter((itm: itemType) => item.category == itm.category)
          .map((itm: itemType) => (
            <Link key={itm._id} href={`/item-detail/${itm._id}`}>
              <div className="border rounded-2xl shadow-md">
                <div className="relative h-40 w-full">
                  <Badge
                    className="absolute flex m-2 flex-end "
                    variant="destructive"
                  >
                    {itm.type}
                  </Badge>
                  <Badge className="absolute bg-white text-black mt-21 mr-2 top-10 right-0">
                    <MapPin className="w-4 h-4" /> {itm.location}
                  </Badge>
                  <img
                    src={itm.imageUrl || "skeleton.png"}
                    alt={itm.title}
                    className="w-full h-40 object-cover rounded-t-2xl"
                  ></img>
                </div>
                <h2 className="text-xl font-bold m-2">{itm.title}</h2>
                <p className="text-gray-600 m-2 mb-10">{itm.category}</p>
              </div>
            </Link>
          ))
          .slice(0, 4)}
      </div>
    </div>
  );
}
