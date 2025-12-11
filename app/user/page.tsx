"use client";

import { itemType } from "@/lib/types";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import React, { useEffect, useMemo, useState } from "react";
import { IoIosHelpBuoy, IoMdNotificationsOutline } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { GoSignOut } from "react-icons/go";
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
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { EditUserDialog } from "../_components/main/EditUserDialog";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { CardContent } from "@/components/ui/card";

const ITEMS_PER_PAGE = 6;

type TabValue = "all" | "lost" | "found" | "drafts";
type SortOrder = "newest" | "oldest";

function ItemCard({
  item,
  refetchItems,
}: {
  item: itemType;
  refetchItems: () => Promise<void>;
}) {
  return (
    <div className="border rounded-2xl shadow-md w-full bg-white hover:shadow-2xl transition-all overflow-hidden">
      <Link href={`/item-detail/${item._id}`} className="block relative h-56">
        <Badge
          variant={item.type === "lost" ? "destructive" : "default"}
          className={`absolute top-4 left-4 z-10 text-sm px-3 py-1 ${
            item.type === "found" ? "bg-green-600 hover:bg-green-700" : ""
          }`}>
          {item.type === "lost" ? "Lost" : "Found"}
        </Badge>

        <Badge
          variant="secondary"
          className="absolute bottom-4 right-4 z-10 text-xs flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {item.location}
        </Badge>

        <img
          src={
            item.imageUrl ||
            "https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=No+Image"
          }
          alt={item.title}
          className="h-full w-full object-cover"
        />
      </Link>

      <div className="p-5">
        <Link href={`/item-detail/${item._id}`}>
          <h3 className="font-bold text-lg line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
            {item.title}
          </h3>
        </Link>

        <CardContent className="p-0">
          <p className="text-sm text-gray-500">
            {new Date(item.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}{" "}
            — {item.location}
          </p>
          <p className="text-sm text-gray-700 line-clamp-2">{item.desc}</p>
        </CardContent>

        <div className="mt-4">
          <EditUserDialog id={item._id} refetchItems={refetchItems} />
        </div>
      </div>
    </div>
  );
}

export default function UserPage() {
  const { user } = useUser();
  const router = useRouter();

  const [items, setItems] = useState<itemType[]>([]);
  const [activeTab, setActiveTab] = useState<TabValue>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const clerkId = user?.id;

  const getItems = async () => {
    const response = await fetch("/api/items");
    if (!response.ok) throw new Error("Failed to load items");
    return (await response.json()).data;
  };

  useEffect(() => {
    getItems()
      .then((data) => setItems(data))
      .catch(console.error);
  }, []);

  const refetchItems = async () => {
    try {
      const data = await getItems();
      setItems(data);
    } catch (err) {
      console.error("Failed to refetch items:", err);
    }
  };

  const userItems = useMemo(() => {
    return items.filter((item) => item.clerkId === clerkId);
  }, [items, clerkId]);

  const filteredAndSortedItems = useMemo(() => {
    let filtered = userItems;

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

    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [userItems, activeTab, searchTerm, sortOrder]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAndSortedItems.length / ITEMS_PER_PAGE)
  );
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSortedItems, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm, sortOrder]);

  const handleNewPost = () => {
    router.push("/report-found");
  };

  const handleSignOut = () => {
    if (confirm("Are you sure you want to sign out?")) {
      document
        .querySelector("[data-signout-button]")
        ?.closest("button")
        ?.click();
    }
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
          <p
            className="flex items-center gap-2 text-red-600 font-medium cursor-pointer"
            onClick={handleSignOut}>
            <span className="flex gap-2 items-center">
              <GoSignOut />
              <SignOutButton />
            </span>
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
        <div className="bg-white border rounded-lg shadow-sm p-6 flex items-center gap-6">
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
        </div>

        {/* New Post Button & Tabs */}
        <div className="flex-col justify-between items-start">
          <Button
            onClick={handleNewPost}
            className="bg-blue-600 hover:bg-blue-700">
            New Post
          </Button>

          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as TabValue)}>
            <TabsList className="mt-4 min-w-250">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="lost">Lost</TabsTrigger>
              <TabsTrigger value="found">Found</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Search & Sort */}
        <div className="flex justify-between items-center gap-4">
          <div className="relative w-250 max-w-xs">
            <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search your posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="w-50">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedItems.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                refetchItems={refetchItems}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
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

              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(i + 1);
                    }}
                    isActive={currentPage === i + 1}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
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
