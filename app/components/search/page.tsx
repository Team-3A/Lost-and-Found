"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchBar } from "./SearchBar";

type Item = {
  _id: string;
  title: string;
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/items?q=${q}`);
      const data = (await res.json()) as { data: Item[] };
      setItems(data.data);
    };

    load();
  }, [q]);

  return (
    <div>
      <SearchBar />

      <div className="mt-4">
        {items.map((item) => (
          <div key={item._id} className="p-2 border mb-2 rounded">
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
}
