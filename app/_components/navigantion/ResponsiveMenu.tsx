"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Briefcase,
  FileText,
  Gem,
  Key,
  Laptop,
  PawPrint,
  Shirt,
  Smartphone,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type ResponsiveMenuProps = {
  open: boolean;
};

export const ResponsiveMenu = ({ open }: ResponsiveMenuProps) => {
  const [showCategories, setShowCategories] = useState(false);

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

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          className="absolute top-20 left-0 w-100 rounded-2xl mt-10 m-4 bg-white z-30"
        >
          <div className="py-10 mx-6 rounded-3xl text-xl font-semibold">
            {!showCategories && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-10"
              >
                <Link
                  href="/"
                  className="text-gray-700 text-[18px] hover:text-blue-600"
                >
                  Home
                </Link>

                <button
                  onClick={() => setShowCategories(true)}
                  className="text-gray-700 text-[18px] hover:text-blue-600"
                >
                  Categories ▶
                </button>
              </motion.div>
            )}

            <AnimatePresence>
              {showCategories && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="flex flex-col gap-2 mt-3"
                >
                  <button
                    onClick={() => setShowCategories(false)}
                    className="text-left text-gray-700 text-[16px] hover:text-blue-600 mb-4"
                  >
                    ◀ Back
                  </button>

                  <ul className="flex flex-col gap-1">
                    {categories.map((item, i) => (
                      <li key={i}>
                        <Link
                          href={item.href}
                          className="flex items-center gap-2 p-3 rounded-lg hover:bg-blue-50 transition"
                        >
                          <item.icon className="w-5 h-5 text-gray-500" />

                          <div>
                            <p className="text-sm font-semibold">{item.name}</p>
                            <p className="text-xs text-gray-500">
                              {item.description}
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
