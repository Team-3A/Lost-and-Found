"use client";

import { IoSearch } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { useIsMobile } from "../../_hooks/use-mobile";

import {
  Wallet,
  Smartphone,
  Briefcase,
  Key,
  Laptop,
  FileText,
  Shirt,
  Gem,
  PawPrint,
  Box,
  Menu,
} from "lucide-react";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import { SearchBar } from "../search/SearchBar";
import React from "react";
import { ResponsiveMenu } from "./ResponsiveMenu";

export function Header() {
  const isMobile = useIsMobile();

  const categories = [
    {
      name: "Wallet",
      href: "/categories/wallet",
      icon: Wallet,
      description: "Lost wallets & purses",
    },
    {
      name: "Phone",
      href: "/categories/phone",
      icon: Smartphone,
      description: "Mobiles & tablets",
    },
    {
      name: "Bag",
      href: "/categories/bag",
      icon: Briefcase,
      description: "Backpacks & luggage",
    },
    {
      name: "Keys",
      href: "/categories/keys",
      icon: Key,
      description: "House & car keys",
    },
    {
      name: "Electronics",
      href: "/categories/electronics",
      icon: Laptop,
      description: "Gadgets & devices",
    },
    {
      name: "Documents",
      href: "/categories/documents",
      icon: FileText,
      description: "IDs & papers",
    },
    {
      name: "Clothes",
      href: "/categories/clothes",
      icon: Shirt,
      description: "Apparel & accessories",
    },
    {
      name: "Jewelry",
      href: "/categories/jewelry",
      icon: Gem,
      description: "Watches & rings",
    },
    {
      name: "Pet",
      href: "/categories/pet",
      icon: PawPrint,
      description: "Lost pets",
    },
    {
      name: "Others",
      href: "/categories/others",
      icon: Box,
      description: "Miscellaneous items",
    },
  ];
  const [open, setOpen] = React.useState(false);

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
                    className="hover:text-blue-600 transition text-[15px] font-medium text-gray-700"
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-[15px] font-medium text-gray-700 bg-transparent hover:bg-gray-100/50">
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {categories.map((item, index) => (
                      <li key={index}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="flex items-start gap-3 select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700 group"
                          >
                            <div className="mt-1 p-1 bg-gray-100 rounded-md group-hover:bg-white group-hover:text-blue-600 transition">
                              <item.icon className="h-5 w-5 text-gray-500 group-hover:text-blue-600" />
                            </div>
                            <div className="flex flex-col gap-1">
                              <div className="text-sm font-semibold leading-none">
                                {item.name}
                              </div>
                              <p className="line-clamp-2 text-xs leading-snug text-muted-foreground group-hover:text-blue-600/70">
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
                <NavigationMenuTrigger className="text-[15px] font-medium text-gray-700 bg-transparent hover:bg-gray-100/50">
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
          <div className="relative hidden md:block">
            <IoSearch className="absolute left-2.5 top-2.5 text-gray-400" />
            {/* <Input
              className="pl-9 w-[200px] bg-gray-50 border-gray-200 focus:bg-white transition-all rounded-full h-9 text-sm"
              placeholder="Search..."
            /> */}
            <SearchBar />
          </div>

          <div className="relative block sm:hidden">
            <IoSearch className="absolute left-2.5 top-2.5 text-gray-400" />

            <SearchBar />
          </div>

          <div className="flex gap-3 items-center">
            <ClerkProvider>
              <SignedOut>
                <SignInButton />
                <SignUpButton>
                  <button className="from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full font-medium text-sm h-9 px-5 transition shadow-sm hover:shadow-md">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </ClerkProvider>
          </div>
          <div className="md:hidden ">
            <Menu className="text-4xl" onClick={() => setOpen(!open)} />
          </div>
          <ResponsiveMenu open={open} />
        </div>
      </div>
    </header>
  );
}
