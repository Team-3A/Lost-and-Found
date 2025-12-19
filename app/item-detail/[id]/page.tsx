"use client";

import { Badge } from "@/components/ui/badge";
import { itemType } from "@/lib/types";

import { ChartBarStacked, ClipboardMinus, Star, Wallet } from "lucide-react";

import { MapPin } from "lucide-react";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PhoneButton from "@/app/_components/detail-contact/PhoneButton";
import MailButton from "@/app/_components/detail-contact/MailButton";
import ItemDetailSkeleton from "@/app/_components/skeleton/ItemDetailSkeleton";

export default function LostItemDetail() {
  const params = useParams();
  const id = params.id as string;
  const [item, setItem] = useState<itemType | null>(null);
  const [items, setItems] = useState<itemType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch("/api/items");
        const resData = await response.json();
        setItems(resData.data);
        const foundItem = resData.data.find((itm: itemType) => itm._id === id);
        setItem(foundItem || null);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, [id]);

  if (loading) {
    return <ItemDetailSkeleton loading={true} />;
  }

  if (!item) {
    return <div className="p-8">Тийм эд зүйл олдсонгүй</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto font-sans">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold">{item.title}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-2xl border  h-fit shadow-ls">
          <img
            className="w-180 rounded-t-2xl"
            src={item.imageUrl || "skeleton.png"}
          />
          <div className="flex gap-4 mt-5 mb-3 ml-3">
            <img
              className="w-23 h-20 rounded-2xl"
              src={item.imageUrl || "skeleton.png"}
            />
            <img
              className="w-23 h-20 rounded-2xl"
              src={item.imageUrl || "skeleton.png"}
            />
            <img
              className="w-23 h-20 rounded-2xl"
              src={item.imageUrl || "skeleton.png"}
            />
          </div>
        </div>
        <div>
          <div className="flex gap-4 flex-col w-80 rounded-md border p-6 h-fit shadow-ls">
            <h1 className="text-xl font-semibold">Онцлох зүйлс</h1>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <ChartBarStacked className="text-gray-600" />
                <span className="font-medium text-gray-600">Ангилал:</span>
              </div>
              <span className="font-medium text-gray-800">{item.category}</span>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <ClipboardMinus className="text-gray-600" />
                <span className="font-medium text-gray-600">Илгээсэн:</span>
              </div>
              <span className="font-medium text-gray-800">2 өдрийн өмнө</span>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Wallet className="text-gray-600" />
                <span className="font-medium text-gray-600">Шагнал:</span>
              </div>
              <span className="font-medium text-gray-800">150,000 төгрөг</span>
            </div>
          </div>

          <div className="flex gap-4 flex-col w-80 rounded-md border p-6 h-fit shadow-ls mt-5">
            <h1 className="text-xl font-semibold">Холбогдох мэдээлэл</h1>

            <MailButton email={item.email} />
            <PhoneButton phone={item.phone} />
          </div>
        </div>
      </div>
      <div className="max-w-4xl mt-10 shadow-ls p-6 rounded-lg border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4">Дэлгэрэнгүй</h2>
        <p className="text-gray-700 leading-relaxed">{item.desc}</p>
      </div>
      <div className="max-w-4xl mt-10 shadow-ls p-6 rounded-lg border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4">Байршил</h2>
        <p className="text-gray-700 leading-relaxed">{item.location}</p>
      </div>

      <h1 className="text-3xl mt-20 font-semibold">Холбоотой зүйлс</h1>
      <div className="gap-4 mt-10 mb-10 grid grid-cols-1 md:grid-cols-4">
        {items
          .filter((itm: itemType) => item.category == itm.category)
          .map((itm: itemType) => (
            <Link key={itm._id} href={`/item-detail/${itm._id}`}>
              <div className="border rounded-2xl shadow-md">
                <div className="relative h-40 w-full">
                  <Badge
                    className="absolute flex m-2 flex-end "
                    variant="destructive"
                  >
                    {itm.type}
                  </Badge>
                  <Badge className="absolute bg-white text-black mt-21 mr-2 top-10 right-0">
                    <MapPin className="w-4 h-4" /> {itm.location}
                  </Badge>
                  <img
                    src={itm.imageUrl || "skeleton.png"}
                    alt={itm.title}
                    className="w-full h-40 object-cover rounded-t-2xl"
                  ></img>
                </div>
                <h2 className="text-xl font-bold m-2">{itm.title}</h2>
                <p className="text-gray-600 m-2 mb-10">{itm.category}</p>
              </div>
            </Link>
          ))
          .slice(0, 4)}
      </div>
    </div>
  );
}
