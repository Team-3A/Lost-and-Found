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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
  const isMobile = useIsMobile();

  return (
    <header className="w-full border-b bg-white/70 backdrop-blur-md sticky top-0 z-50 -ml-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
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
            <IoSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
            <Input
              className="pl-8 w-[150px] bg-white border"
              placeholder="Search..."
            />
          </div>

          <Button className="w-[115px] bg-white text-black font-semibold text-[16px] hover:bg-gray-100">
            Login
          </Button>
          <Button className="bg-blue-600 font-semibold w-[115px] text-[16px] hover:bg-blue-700">
            Signup
          </Button>
        </div>
      </div>
    </header>
  );
}
