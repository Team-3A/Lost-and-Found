"use client";

import { itemType } from "@/lib/types";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useMemo, useState } from "react";
import { IoIosHelpBuoy, IoMdNotificationsOutline } from "react-icons/io";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { IoSearch, IoSettingsOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 6;

type TabValue = "all" | "lost" | "found" | "drafts";
type SortOrder = "newest" | "oldest";

export default function UserPage() {
  const { user } = useUser();
  const router = useRouter();

  const [items, setItems] = useState<itemType[]>([]);
  const [activeTab, setActiveTab] = useState<TabValue>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const clerkId = user?.id;

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch("/api/items");
        if (!response.ok) throw new Error("Failed to load items");
        const data = await response.json();
        setItems(data.data || []);
      } catch (err) {
        console.error(err);
      }
    }
    fetchItems();
  }, []);

  const userItems = useMemo(() => {
    return items.filter((item) => item.clerkId === clerkId);
  }, [items, clerkId]);

  const filteredAndSortedItems = useMemo(() => {
    let filtered = userItems;

    // Filter by tab
    if (activeTab === "lost")
      filtered = filtered.filter((i) => i.type === "lost" && !i.resolved);
    else if (activeTab === "found")
      filtered = filtered.filter((i) => i.type === "found" && !i.resolved);
    else if (activeTab === "drafts")
      filtered = filtered.filter((i) => i.isDraft);

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (i) =>
          i.title.toLowerCase().includes(term) ||
          i.desc.toLowerCase().includes(term)
      );
    }

    // Sort by date
    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [userItems, activeTab, searchTerm, sortOrder]);

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSortedItems.length / ITEMS_PER_PAGE)
  );
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredAndSortedItems.slice(start, end);
  }, [filteredAndSortedItems, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm, sortOrder]);

  const handleNewPost = () => {
    router.push("/report-lost");
  };

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 space-y-8">
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2 ml-5">
            Account
          </p>
          <p className="flex items-center gap-2 text-blue-600 font-medium cursor-pointer">
            <IoSettingsOutline /> Profile Settings
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2 ml-5">Other</p>
          <div className="space-y-2">
            <p className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-gray-800">
              <IoMdNotificationsOutline /> Notifications
            </p>
            <p className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-gray-800">
              <IoIosHelpBuoy /> Help & Support
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 space-y-8">
        {/* Profile Card */}
        <Card className="shadow-sm border">
          <CardContent className="flex items-center gap-6 py-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback>{user?.firstName?.[0] || "U"}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h2 className="text-2xl font-bold">{user?.fullName}</h2>
              <div className="mt-3 text-sm text-gray-600 space-y-1">
                <p>Email: {user?.primaryEmailAddress?.emailAddress}</p>
                <p>
                  Phone: {user?.primaryPhoneNumber?.phoneNumber || "Not added"}
                </p>
              </div>

              <div className="flex gap-6 mt-4 text-sm">
                <span className="text-green-600 font-medium">
                  {userItems.length} Total Posts
                </span>
                <span className="text-blue-600 font-medium">
                  {userItems.filter((i) => !i.resolved && !i.isDraft).length}{" "}
                  Active
                </span>
                <span className="text-purple-600 font-medium">
                  {userItems.filter((i) => i.resolved).length} Resolved
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New Post Button & Tabs */}
        <div className="flex-col justify-between items-start">
          <Button
            onClick={handleNewPost}
            className="bg-blue-600 hover:bg-blue-700"
          >
            New Post
          </Button>

          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as TabValue)}
          >
            <TabsList className="min-w-250 mt-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="lost">Lost</TabsTrigger>
              <TabsTrigger value="found">Found</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Search & Sort */}
        <div className="flex justify-between items-center gap-4">
          <div className="relative w-full max-w-xs">
            <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search your posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Sort: {sortOrder === "newest" ? "Newest" : "Oldest"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortOrder("newest")}>
                Newest
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOrder("oldest")}>
                Oldest
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Separator />

        {paginatedItems.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {searchTerm || activeTab !== "all"
              ? "No posts match your search."
              : "You haven't posted anything yet."}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedItems.map((item) => (
              <Card key={item._id} className="overflow-hidden shadow-sm">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-50 object-cover"
                  />
                ) : (
                  <div className="bg-gray-200 border-2 border-dashed rounded-t-xl w-full h-48" />
                )}

                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg line-clamp-1">
                      {item.title}
                    </CardTitle>
                    <Badge
                      variant="default"
                      className={
                        item.type === "lost"
                          ? "bg-red-500"
                          : item.type === "found"
                          ? "bg-blue-500"
                          : "bg-gray-500"
                      }
                    >
                      {item.isDraft ? "Draft" : item.type}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    — {item.location}
                  </p>
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {item.desc}
                  </p>

                  <div className="flex gap-4 pt-2">
                    <Button
                      variant="link"
                      className="text-blue-600 px-0 h-auto font-medium"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="link"
                      className="text-red-600 px-0 h-auto font-medium"
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage((p) => p - 1);
                  }}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(i + 1);
                    }}
                    isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {totalPages > 5 && <PaginationEllipsis />}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
                  }}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </main>
    </div>
  );
}
