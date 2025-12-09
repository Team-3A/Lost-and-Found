import { getItemsByCategory } from "@/lib/services/filterItem-service";
import { itemType } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import Link from "next/link";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const items = await getItemsByCategory(slug);

  const lostItems = items.filter((i: itemType) => i.type === "lost");
  const foundItems = items.filter((i: itemType) => i.type === "found");

  return (
    <div className="ml-5">
      <h1 className="text-4xl font-bold text-center capitalize mb-10">
        {slug}
      </h1>

      {lostItems.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-6 text-red-600">
            Lost Items
          </h2>
          <div className="flex gap-4">
            {lostItems.map((item: itemType) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        </>
      )}

      {foundItems.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-6 mt-12 text-green-600">
            Found Items
          </h2>
          <div className="flex gap-4">
            {foundItems.map((item: itemType) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        </>
      )}

      {items.length === 0 && (
        <p className="text-center text-gray-500 text-xl py-20">
          No items in this category yet.
        </p>
      )}
    </div>
  );
}

function ItemCard({ item }: { item: itemType }) {
  return (
    <Link href={`/item-detail/${item._id}`} className="flex flex-wrap">
      <div className="border rounded-2xl shadow-md w-80 bg-white hover:shadow-2xl transition-all overflow-hidden">
        <div className="relative h-56">
          <Badge
            variant={item.type === "lost" ? "destructive" : "default"}
            className={`absolute top-4 left-4 z-10 text-sm px-3 py-1 ${
              item.type === "found" ? "bg-green-600 hover:bg-green-700" : ""
            }`}
          >
            {item.type === "lost" ? "Lost" : "Found"}
          </Badge>

          <Badge
            variant="secondary"
            className="absolute bottom-4 right-4 z-10 text-xs flex items-center gap-1"
          >
            <MapPin className="w-4 h-4" />
            {item.location}
          </Badge>

          <img
            src={
              item.imageUrl ||
              "https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=No+Image"
            }
            alt={item.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="p-5">
          <h3 className="font-bold text-lg line-clamp-2">{item.title}</h3>
          <p className="text-sm text-gray-600 mt-1">
            {item.type === "lost"
              ? "Someone is looking for this"
              : "This was found!"}
          </p>
        </div>
      </div>
    </Link>
  );
}
