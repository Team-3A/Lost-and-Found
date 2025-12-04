// "use client";

// import { Input } from "@/components/ui/input";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";

// export const SearchBar = () => {
//   const searchParams = useSearchParams();
//   const pathName = usePathname();
//   const router = useRouter();

//   const handleChange = (query: string) => {
//     const params = new URLSearchParams(searchParams);
//     if (query) params.set("query", query);
//     else params.delete("query");

//     router.replace(`${pathName}?${params.toString()}`);
//   };
//   return (
//     <div>
//       <Input
//         onChange={(e) => handleChange(e.target.value)}
//         className="pl-8 w-[150px] bg-white border"
//         placeholder="Search..."
//       />
//     </div>
//   );
// };"use client";

// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function SearchBar() {
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
//     <div>
//       {items.map((item: any) => (
//         <div key={item._id}>{item.title}</div>
//       ))}
//     </div>
//   );
// }
"use client";

import { Input } from "@/components/ui/input";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set("q", value);
    else params.delete("q");

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Input
      defaultValue={searchParams.get("q") || ""}
      onChange={(e) => handleChange(e.target.value)}
      className="pl-9 w-[200px] bg-gray-50 border-gray-200 focus:bg-white transition-all rounded-full h-9 text-sm"
      placeholder="Search..."
    />
  );
}
