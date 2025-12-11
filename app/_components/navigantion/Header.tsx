"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import { Input } from "@/components/ui/input";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { useIsMobile } from "../../_hooks/use-mobile";

import React from "react";
import { itemType } from "@/lib/types";
import { categories } from "@/lib/data/data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useUser } from "@clerk/nextjs";
import { ResponsiveMenu } from "./ResponsiveMenu";
import { Menu } from "lucide-react";

export function Header() {
  const { user } = useUser();
  const router = useRouter();
  const isMobile = useIsMobile();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<itemType[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim().length > 0) {
        fetch(`/api/items?q=${query}`)
          .then((res) => res.json())
          .then((data) => {
            setResults(data.data || []);
            setIsOpen(true);
          });
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  const handleSelect = (id: string) => {
    setIsOpen(false);
    router.push(`/item-detail/${id}`);
    // detail page ruu shiljih
  };

  return (
    <header className="w-full border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="mx-auto flex items-center justify-between px-4 py-3 max-w-7xl">
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition">
          <Image src="/location.png" alt="logo" width={32} height={32} />
          <h2 className="text-2xl font-bold from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Sentinel Trace
          </h2>
        </div>

        {!isMobile && (
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-6">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className="hover:text-blue-600 transition text-[18px] font-medium text-gray-700 "
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-[18px] font-medium text-gray-700 bg-transparent hover:bg-gray-100/50">
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {categories.map((item, index) => (
                      <li key={index}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="flex items-start gap-3 select-none rounded-md p-3 transition-colors hover:bg-blue-50 group"
                          >
                            <item.icon className="h-5 w-5 text-gray-500 group-hover:text-blue-700" />
                            <div>
                              <div className="text-sm font-semibold">
                                {item.name}
                              </div>
                              <p className="text-xs text-gray-500 group-hover:text-blue-600">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-[18px] font-medium text-gray-700 bg-transparent hover:bg-gray-100/50">
                  Submit Item
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[250px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <div className="flex h-full w-full select-none flex-col justify-end rounded-md from-blue-500 to-indigo-600 p-6 no-underline outline-none focus:shadow-md">
                          <div className="mb-2 mt-4 text-lg font-medium text-white">
                            Lost something?
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            Report it immediately to help our community find it.
                          </p>
                        </div>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/report-lost"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            Submit Lost Item
                          </div>
                          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                            I lost an item
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/report-found"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            Submit Found Item
                          </div>
                          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                            I found an item
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}

        <div className="flex gap-4 items-center">
          <div className="relative hidden md:block w-[220px]">
            <IoSearch className="absolute left-2.5 top-2.5 text-gray-400" />
            <Input
              className="pl-9 bg-gray-50 border-gray-200 focus:bg-white rounded-full h-9 text-sm"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query.length > 0 && setIsOpen(true)}
            />

            {isOpen && results.length > 0 && (
              <div className="absolute w-full mt-2 bg-white shadow-lg border rounded-xl py-2 max-h-64 overflow-auto z-50">
                {results.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => handleSelect(item._id)}
                    className="flex gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        width={40}
                        height={40}
                        className="object-cover rounded-md"
                      />
                    )}
                    <div className="flex flex-col">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-gray-500 line-clamp-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="md:hidden ">
            <Menu className="text-4xl" onClick={() => setOpen(!open)} />
          </div>
          <ResponsiveMenu open={open} />
          <Link href="/user">
            <Avatar>
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  );
}
