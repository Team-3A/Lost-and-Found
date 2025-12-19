// components/xmas-form.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Gift, Search, Snowflake, TreePine } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function XmasForm() {
  return (
    <>
      <aside className="w-64 bg-(--xmas-red)  text-white p-6 rounded-2xl shadow-lg space-y-6">
        <div className="text-2xl font-bold flex items-center gap-2">
          <Snowflake />
          Xmas Menu
        </div>

        <nav className="space-y-3">
          <Link
            href="/"
            className="flex items-center gap-2 hover:text-green-300"
          >
            <TreePine /> Dashboard
          </Link>
          <Link
            href="/gifts"
            className="flex items-center gap-2 hover:text-green-300"
          >
            <Gift /> Gifts
          </Link>
        </nav>
      </aside>
      <form className="p-6 bg-white shadow-md border border-green-300 rounded-2xl space-y-4">
        <Input placeholder="Your Christmas wish..." />

        <Input placeholder="Your Christmas wish..." />
        <Input placeholder="Your Christmas wish..." />
        <Input placeholder="Your Christmas wish..." />
        <Input placeholder="Your Christmas wish..." />

        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
          Submit Wish 🎁
        </Button>
      </form>
      <div className="p-10 text-center bg-white border border-red-300 rounded-2xl shadow">
        <p className="text-xl">🎁 No Christmas items found!</p>
        <p className="opacity-70 mt-2">Try searching or adding new items.</p>
      </div>
      <div className="flex items-center gap-2 p-2 bg-white border border-red-300 rounded-2xl shadow-sm">
        <Search className="text-red-600" />
        <Input placeholder="Search Christmas items..." className="border-0" />
      </div>

      <footer className="w-full text-center py-6 bg-red-700 text-white rounded-2xl mt-10 shadow-lg">
        <p>🎄 Made with love for Christmas UI — 2024</p>
      </footer>
    </>
  );
}
