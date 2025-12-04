import { useEffect, useState } from "react";

type Item = {
  _id: string;
  title: string;
  location?: string;
};

export default function ItemsList() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/items");
      if (!res.ok) return;
      const json = await res.json();
      setItems(json.data || []);
    }
    load();
  }, []);

  return (
    <ul>
      {items.map((it) => (
        <li key={it._id}>
          {it.title} — {it.location}
        </li>
      ))}
    </ul>
  );
}
