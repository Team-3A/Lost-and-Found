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
import { useIsMobile } from "../../hooks/use-mobile";

import { Input } from "@/components/ui/input";

import {
  ClerkProvider,
  SignIn,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export function Header() {
  const isMobile = useIsMobile();

  return (
    <header className="w-full border-b bg-white/70 backdrop-blur-md sticky top-0 z-50 ">
      <div className="mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Image src="/location.png" alt="logo" width={28} height={28} />
          <h2 className="text-2xl font-semibold text-blue-600">
            Sentinel Trace
          </h2>
        </div>

        {!isMobile && (
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-6">
              <div></div>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className="hover:text-blue-600 transition text-[16px] font-medium"
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-[16px]">
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[250px] gap-3 p-3">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/categories/electronics">Electronics</Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/categories/bags">Bags</Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/categories/pets">Pets</Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-[16px]">
                  Submit Item
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-2 p-3">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/report-lost">Submit Lost Item</Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/report-found">Submit Found Item</Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}
        <div className="flex gap-3">
          <div className="relative">
            <IoSearch className="absolute left-2 mt-2.5 text-gray-500" />
            <Input
              className="pl-8 w-[150px] bg-white border"
              placeholder="Search..."
            />
          </div>
          <div className="flex-1"></div>
          <div className="flex gap-4 items-center">
            <ClerkProvider>
              <SignedOut>
                <SignInButton />
                <SignUpButton>
                  <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </ClerkProvider>
          </div>
        </div>
      </div>
    </header>
  );
}
