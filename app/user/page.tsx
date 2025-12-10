"use client";

import { itemType } from "@/lib/types";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { EditUserDialog } from "../_components/main/EditUserDialog";

export default function UserPage() {
  const { user } = useUser();

  const [items, setItems] = useState<itemType[]>([]);
  const [search, setSearch] = useState("");

  const clerkId = user?.id;

  // DO NOT CHANGE — your API request
  useEffect(() => {
    getItems().then((data) => setItems(data));
  }, []);

  async function getItems() {
    const response = await fetch("/api/items");
    if (!response.ok) throw new Error("Failed to load items");
    return (await response.json()).data;
  }

  // Filter user items
  const yourItems = items.filter((i) => i.clerkId === clerkId);

  const filtered = yourItems.filter((i) =>
    i.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 space-y-8">
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">Account</p>
          <p className="text-blue-600 font-medium cursor-pointer">
            Profile Settings
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">Other</p>
          <div className="space-y-2">
            <p className="cursor-pointer text-gray-600 hover:text-gray-800">
              Notifications
            </p>
            <p className="cursor-pointer text-gray-600 hover:text-gray-800">
              Help & Support
            </p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10 space-y-8">
        {/* Profile Card */}
        <Card className="shadow-sm border">
          <CardContent className="flex items-center gap-6 py-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>

            <div>
              <h2 className="text-2xl font-bold">{user?.fullName}</h2>

              <div className="mt-3 text-sm text-gray-600 space-y-1">
                <p>Email: {user?.primaryEmailAddress?.emailAddress}</p>
                <p>
                  Phone: {user?.primaryPhoneNumber?.phoneNumber || "Not added"}
                </p>
              </div>

              <div className="flex gap-6 mt-4 text-sm">
                <span className="text-green-600 font-medium">
                  {yourItems.length} Total Posts
                </span>
                {/* <span className="text-blue-600 font-medium">{yourItems.filter(i => !i.resolved).length} Active</span>
                <span className="text-purple-600 font-medium">{yourItems.filter(i => i.resolved).length} Resolved</span> */}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New post + Filters */}
        <div className="flex justify-between items-center">
          <Button className="bg-blue-600 text-white">New Post</Button>

          <Tabs defaultValue="all" className="w-auto">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="lost">Lost</TabsTrigger>
              <TabsTrigger value="found">Found</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Search + Sort */}
        <div className="flex justify-between items-center">
          <Input
            placeholder="Search posts..."
            className="w-72"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Sort: Newest</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Button variant="ghost" className="w-full justify-start">
                Newest
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Oldest
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Separator />

        {/* Items grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <Card key={item._id} className="overflow-hidden shadow-sm">
              <img
                src={item.imageUrl}
                className="w-full h-44 object-cover"
                alt={item.title}
              />

              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{item.title}</CardTitle>

                  <Badge
                    variant="default"
                    className={
                      item.type === "lost" ? "bg-red-500" : "bg-blue-500"
                    }
                  >
                    {item.type}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-2 text-sm">
                <p className="text-gray-500">
                  {new Date(item.createdAt).toISOString().slice(0, 10)} —{" "}
                  {item.location}
                </p>

                <p className="text-gray-700">{item.desc}</p>

                <div className="flex gap-4 pt-3">
                  <EditUserDialog id={item._id} />

                  <Button variant="link" className="text-red-600 px-0">
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-6 pt-4">
          <Button variant="ghost">‹ Previous</Button>
          <span className="font-medium">1</span>
          <Button variant="ghost">Next ›</Button>
        </div>
      </main>
    </div>
  );
}
