import { Badge } from "@/components/ui/badge";
import { itemType } from "@/lib/types";
import { MapPin } from "lucide-react";

import Link from "next/link";
export default async function Card() {
  async function getItems() {
    const res = await fetch("http://localhost:3000/api/lost", {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("API error:", res.status);
      return [];
    }

    const json = await res.json().catch(() => null);

    if (!json || !json.data) {
      console.error("Invalid JSON returned");
      return [];
    }

    return json.data;
  }

  const items = await getItems();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mx-auto max-w-5xl gap-5 bg-white mt-16 ">
      {items
        .filter((item: itemType) => item.type === "lost")
        .map((item: itemType) => (
          <Link key={item._id} href={`/item-detail/${item._id}`}>
            <div className="border rounded-2xl shadow-md">
              <div className="relative h-40 w-full">
                <Badge
                  className="absolute flex m-2 flex-end "
                  variant="destructive">
                  {item.type}
                </Badge>
                <Badge className="absolute bg-white text-black mt-21 mr-2 top-10 right-0">
                  <MapPin className="w-4 h-4" /> {item.location}
                </Badge>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-t-2xl"></img>
              </div>

              <h2 className="text-xl font-bold m-2">{item.title}</h2>
              <p className="text-gray-600 m-2 mb-10">{item.category}</p>
            </div>
          </Link>
        ))
        .slice(0, 4)}
      {items
        .filter((item: itemType) => item.type === "found")
        .map((item: itemType) => (
          <Link key={item._id} href={`/item-detail/${item._id}`}>
            <div className="border rounded-2xl shadow-md">
              <div className="relative h-40 w-full">
                <Badge
                  className="absolute flex m-2 flex-end bg-green-400"
                  variant="default">
                  {item.type}
                </Badge>
                <Badge className="absolute bg-white text-black mt-21 mr-2 top-10 right-0">
                  <MapPin className="w-4 h-4" /> {item.location}
                </Badge>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-t-2xl"></img>
              </div>

              <h2 className="text-xl font-bold m-2">{item.title}</h2>
              <p className="text-gray-600 m-2 mb-10">{item.category}</p>
            </div>
          </Link>
        ))
        .slice(0, 4)}
    </div>
  );
}
