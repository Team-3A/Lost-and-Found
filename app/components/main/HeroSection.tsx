// "use client";

import { Input } from "@/components/ui/input";

import { UserButton } from "@clerk/nextjs";

import Link from "next/link";
import Card from "./Card";

export default async function HeroSection() {
  return (
    <div>
      <section className="w-full py-20 bg-linear-to-b from-[#CDE4FF] to-white">
        <div className="absolute top-2 right-4">
          <UserButton />
        </div>
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Find What's Lost, Return What's Found
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Connect with your community to recover valuable items and bring
            peace of mind.
          </p>

          <div>
            <Input
              placeholder="Search lost items..."
              className="w-[570px] text-[14px] pl-10 border-[#E1E1FF] border-solid rounded-md mt-30 bg-white h-10"
            ></Input>
          </div>

          <div className="flex items-center gap-3 mt-10 ml-60 ">
            <Link
              href="/report-lost"
              className="flex items-center w-[200px] h-11 pl-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow"
            >
              <img
                src="add.png"
                alt="Lost Item"
                className="object-cover rounded w-5 h-5"
              />

              <span className="ml-3 font-semibold text-sm ">
                Report Lost Item
              </span>
            </Link>

            <Link
              href="/report-found"
              className="px-4 py-2 w-[200px] h-11 pt-3  rounded-lg border border-blue-600 text-blue-600 text-sm font-medium hover:bg-blue-50 transition bg-white"
            >
              Report Found Item
            </Link>
          </div>
        </div>
      </section>
      <h1 className="text-4xl flex justify-center items-center font-semibold">
        Recently Found & Lost Items
      </h1>
      <Card />
    </div>
  );
}
