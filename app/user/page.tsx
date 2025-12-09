"use client";

import { itemType } from "@/lib/types";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

export default function UserPage() {
  const [items, setItems] = useState<itemType[]>([]);
  const { user } = useUser();
  const clerkId = user?.id;
  useEffect(() => {
    getItems().then((data) => setItems(data));
  }, []);

  async function getItems() {
    const response = await fetch("/api/items");
    if (!response.ok) throw new Error("Failed to load items");
    return (await response.json()).data;
  }

  const yourItems = items.filter((i: itemType) => i.clerkId === clerkId);

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div>{yourItems.length}</div>
      {yourItems.map((item: itemType) => item.title)}
    </div>
  );
}
