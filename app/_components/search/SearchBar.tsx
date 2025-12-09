"use client";
import { useState, useEffect } from "react";

export default function ServerBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return setResults([]);

    setLoading(true);
    const timer = setTimeout(() => {
      fetch(`/api/items?q=${query}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="border p-2 rounded w-full mb-4"
      />
      {loading && <p>Loading...</p>}
      <ul>
        {results.map((item: any) => (
          <li key={item._id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
