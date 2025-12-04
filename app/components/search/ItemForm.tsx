// "use client";

// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

// export const ItemsList = () => {
//   const searchParams = useSearchParams();
//   const query = searchParams.get("query") || "";
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     const fetchItems = async () => {
//       const res = await fetch(`/api/items?query=${query}`);
//       const data = await res.json();
//       setItems(data.data);
//     };

//     fetchItems();
//   }, [query]);

//   return (
//     <div className="mt-4 space-y-3">
//       {items.length === 0 && <p>No items found</p>}

//       {items.map((item: any) => (
//         <div key={item._id} className="border p-3 rounded">
//           <p className="font-semibold">{item.title}</p>
//           <p className="text-sm">{item.desc}</p>
//           <p className="text-xs text-gray-500">{item.location}</p>
//         </div>
//       ))}
//     </div>
//   );
// };
import { useState } from "react";

export default function ItemForm() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("lost");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    const fd = new FormData();
    fd.append("type", type);
    fd.append("title", title);
    fd.append("desc", desc);
    fd.append("category", category);
    fd.append("location", location);
    if (imageFile) fd.append("image", imageFile);
    fd.append("email", email);
    fd.append("phone", phone);

    const res = await fetch("/api/items", {
      method: "POST",
      body: fd,
    });

    const json = await res.json();
    if (res.ok) {
      alert(json.message || "Амжилттай");
    } else {
      alert(json.message || "Алдаа");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="lost">Lost</option>
        <option value="found">Found</option>
      </select>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Description"
        required
      />
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        required
      />
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
      />

      <button type="submit">Send</button>
    </form>
  );
}
