import { Badge } from "@/components/ui/badge";
import { Marquee } from "@/components/ui/marquee";

import { itemType } from "@/lib/types";
import { MapPin } from "lucide-react";
import Link from "next/link";

export default async function Card() {
  async function getItems() {
    const response = await fetch("http://localhost:3000/api/items");
    if (!response.ok) throw new Error("Failed to load items");
    return (await response.json()).data;
  }

  const items = await getItems();
  const lostItems = items.filter((i: itemType) => i.type === "lost");
  const foundItems = items.filter((i: itemType) => i.type === "found");

  return (
    <div className="w-5xl mx-auto flex flex-col gap-10 mb-20 overflow-hidden">
      <Marquee pauseOnHover className="gap-5 [--duration:20s]">
        {lostItems.map((item: itemType) => (
          <Link key={item._id} href={`/item-detail/${item._id}`}>
            <div className="border rounded-2xl shadow-md w-60 p-2 bg-white hover:shadow-lg transition">
              <div className="relative h-40">
                <Badge variant="destructive" className="absolute m-2">
                  lost
                </Badge>

                <Badge className="absolute bottom-2 right-2 opacity-75 bg-white text-black whitespace-normal h-auto flex gap-1">
                  <MapPin className="w-4 h-4" />
                  {item.location}
                </Badge>

                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-40 w-full object-cover rounded-xl"
                />
              </div>

              <h2 className="text-lg font-bold mt-2">{item.title}</h2>
              <p className="text-gray-600">{item.category}</p>
            </div>
          </Link>
        ))}
      </Marquee>

      <Marquee pauseOnHover reverse className="gap-5 [--duration:20s]">
        {foundItems.map((item: itemType) => (
          <Link key={item._id} href={`/item-detail/${item._id}`}>
            <div className="border rounded-2xl shadow-md w-60 p-2 bg-white hover:shadow-lg transition">
              <div className="relative h-40">
                <Badge variant="default" className="absolute m-2 bg-green-500">
                  found
                </Badge>

                <Badge className="absolute bottom-2 right-2 whitespace-normal h-auto opacity-75 bg-white text-black flex gap-1">
                  <MapPin className="w-4 h-4" />
                  {item.location}
                </Badge>

                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-40 w-full object-cover rounded-xl"
                />
              </div>

              <h2 className="text-lg font-bold mt-2">{item.title}</h2>
              <p className="text-gray-600">{item.category}</p>
            </div>
          </Link>
        ))}
      </Marquee>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
    </div>
  );
}
