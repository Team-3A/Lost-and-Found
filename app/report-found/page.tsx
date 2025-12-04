"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CloudUpload, Calendar, MapPin, Sun, Moon } from "lucide-react";

const THEMES = [
  { id: "default", label: "Sky (default)" },
  { id: "purple", label: "Purple" },
  { id: "green", label: "Green" },
  { id: "orange", label: "Orange" },
  { id: "glass", label: "Glassmorphism" },
  { id: "apple", label: "Apple-clean" },
  { id: "dark", label: "Dark" },
  { id: "mobile", label: "Mobile-optimized" },
];

export default function ReportFoundThemes() {
  const [theme, setTheme] = useState("default");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<number | string>("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("type", "lost");
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("category", category);
    formData.append("location", location);
    formData.append("email", email);
    formData.append("phone", String(phone));
    if (image) formData.append("image", image);

    const res = await fetch("/api/items", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert(data.message || "Saved!");
  };

  const themeClass = {
    default: "bg-gradient-to-b from-sky-50 to-white",
    purple: "bg-gradient-to-b from-violet-50 via-white to-rose-50",
    green: "bg-gradient-to-b from-emerald-50 via-white to-emerald-100",
    orange: "bg-gradient-to-b from-amber-50 via-white to-orange-50",
    glass: "bg-[linear-gradient(180deg,#f8fbfd,rgba(255,255,255,0.6))]",
    apple: "bg-white",
    dark: "bg-gray-900",
    mobile: "bg-gradient-to-b from-sky-50 to-white",
  }[theme];

  const textColor = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const muted = theme === "dark" ? "text-gray-300" : "text-gray-500";

  return (
    <div
      className={`${themeClass} min-h-screen py-10`}
      style={{ fontFamily: "Plus Jakarta Sans, Inter, system-ui" }}
    >
      <div className="max-w-4xl mx-auto px-4">
        {/* theme switch */}
        <div className="flex items-center justify-end mb-6 gap-3">
          <div className="hidden sm:flex items-center gap-3 text-sm">
            <Sun className="w-4 h-4 text-yellow-400" />
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="rounded-md border px-3 py-2 bg-white/80"
            >
              {THEMES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:hidden text-sm">
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="rounded-md border px-3 py-2 bg-white/80"
            >
              {THEMES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <header className={`mb-8 text-center ${textColor}`}>
          <p
            className={`text-sm font-medium uppercase tracking-wide ${
              theme === "purple" ? "text-violet-600" : "text-sky-600"
            }`}
          >
            Lost & Found
          </p>
          <h1
            className={`mt-2 text-4xl font-extrabold leading-tight ${textColor}`}
          >
            Report a Found Item
          </h1>
          <p className={`mt-2 ${muted} max-w-2xl mx-auto`}>
            Clear titles, photos and contact info help others find your item
            faster.
          </p>
        </header>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className={`${theme === "mobile" ? "space-y-5" : "space-y-6"}`}>
            {/* item detail */}
            <section
              className={`p-6 rounded-2xl border ${
                theme === "dark"
                  ? "border-gray-800 bg-gray-850"
                  : "border-gray-100 bg-white/80"
              } ${
                theme === "glass"
                  ? "backdrop-blur-md bg-white/40 border-transparent shadow-none"
                  : "shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className={`text-lg font-semibold ${textColor}`}>
                    Item details
                  </h2>
                  <p className={`text-sm ${muted}`}>
                    Give a clear, short title and a precise description.
                  </p>
                </div>
              </div>

              <div
                className={`grid ${
                  theme === "mobile" ? "grid-cols-1 gap-4" : "grid-cols-1 gap-4"
                }`}
              >
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${textColor}`}
                  >
                    Title
                  </label>
                  <Input
                    placeholder="Black leather wallet — brand, color, distinguishing mark"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="rounded-lg"
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${textColor}`}
                  >
                    Description
                  </label>
                  <Textarea
                    placeholder="Where you last saw it, any stickers, cards, or unique marks..."
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="min-h-[120px] rounded-lg"
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${textColor}`}
                  >
                    Category
                  </label>
                  <Select onValueChange={setCategory}>
                    <SelectTrigger className="w-full rounded-lg">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wallet">Wallet</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="bag">Bag</SelectItem>
                      <SelectItem value="key">Keys</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="documents">Documents</SelectItem>
                      <SelectItem value="clothes">Clothes</SelectItem>
                      <SelectItem value="jewelry">Jewelry</SelectItem>
                      <SelectItem value="pet">Pet</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            <section
              className={`p-6 rounded-2xl border ${
                theme === "dark"
                  ? "border-gray-800 bg-gray-850"
                  : "border-gray-100 bg-white/80"
              } ${
                theme === "glass"
                  ? "backdrop-blur-md bg-white/40 border-transparent shadow-none"
                  : "shadow-sm"
              }`}
            >
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label
                    className={`flex items-center gap-2 text-sm font-medium mb-2 ${textColor}`}
                  >
                    <MapPin className="w-4 h-4 text-sky-500" /> Location
                  </label>
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Sukhbaatar Square, Blue Cafe (floor 2)"
                    className="rounded-lg"
                  />
                </div>

                <div>
                  <label
                    className={`flex items-center gap-2 text-sm font-medium mb-2 ${textColor}`}
                  >
                    <CloudUpload className="w-4 h-4 text-sky-500" /> Photo
                    (optional)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files?.[0] || null)}
                      className="block w-full text-sm text-gray-600 file:rounded-md file:border-0 file:px-4 file:py-2 file:bg-sky-50 file:text-sky-700 file:font-medium"
                    />
                    {image && (
                      <span className="text-sm text-gray-500">
                        {image.name}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    className={`flex items-center gap-2 text-sm font-medium mb-2 ${textColor}`}
                  >
                    <Calendar className="w-4 h-4 text-sky-500" /> Date lost
                  </label>
                  <input
                    type="date"
                    className="w-full rounded-lg border border-gray-200 p-2"
                  />
                </div>
              </div>
            </section>

            <section
              className={`p-6 rounded-2xl border ${
                theme === "dark"
                  ? "border-gray-800 bg-gray-850"
                  : "border-gray-100 bg-white/80"
              } ${
                theme === "glass"
                  ? "backdrop-blur-md bg-white/40 border-transparent shadow-none"
                  : "shadow-sm"
              }`}
            >
              <h3 className={`text-lg font-semibold mb-2 ${textColor}`}>
                Contact information
              </h3>
              <p className={`text-sm mb-4 ${muted}`}>
                Provide at least one way to reach you. We recommend email +
                phone.
              </p>

              <div
                className={`grid ${
                  theme === "mobile"
                    ? "grid-cols-1 gap-3"
                    : "grid-cols-1 md:grid-cols-2 gap-4"
                }`}
              >
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${textColor}`}
                  >
                    Email
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="rounded-lg"
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${textColor}`}
                  >
                    Phone
                  </label>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+976 99 123456"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </section>

            <div className="flex items-center justify-between gap-4">
              <div className={`text-sm ${muted}`}>
                By submitting you agree to our guidelines.
              </div>
              <Button
                type="submit"
                className={`ml-auto rounded-lg px-6 py-3 font-semibold ${
                  theme === "purple"
                    ? "bg-gradient-to-r from-violet-600 to-pink-600 text-white"
                    : theme === "green"
                    ? "bg-gradient-to-r from-emerald-600 to-green-500 text-white"
                    : theme === "orange"
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                    : theme === "dark"
                    ? "bg-sky-500 text-white"
                    : "bg-gradient-to-r from-sky-600 to-indigo-600 text-white"
                }`}
              >
                Submit Report
              </Button>
            </div>
          </div>
        </form>
      </div>

      <style jsx>{`
        :root {
          --glass-border: rgba(255, 255, 255, 0.6);
        }
        @media (prefers-color-scheme: dark) {
          .bg-gray-850 {
            background-color: #0b1220;
          }
        }
      `}</style>
    </div>
  );
}
