import Item, { ItemSchemaType } from "@/lib/models/Item";

import connectDB from "@/lib/mongodb";
import { createItem } from "@/lib/services/item-service";
import { uploadImageToCloudinary } from "@/lib/uploadImage";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const getAllItem = async () => {
    await connectDB();
    Item;
    const allNewItem: ItemSchemaType[] = await Item.find().populate("itemId");
    return allNewItem;
  };
  const itemData = await getAllItem();
  const response = NextResponse.json({ data: itemData }, { status: 200 });
  response.headers.set("Access-Control-Allow-Origin", "*"); // Or '*' for all origins
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return response;
}

export async function POST(request: NextRequest) {
  const payload = await request.formData();
  const title = payload.get("title") as string;
  const desc = payload.get("desc") as string;
  const category = payload.get("category") as string;
  const location = payload.get("location") as string;
  const image = payload.get("image") as File;
  const email = payload.get("email") as string;
  const phone = payload.get("phone") as string;

  const uploadedUrl = await uploadImageToCloudinary(image);

  const result = await createItem({
    title,
    desc,
    category,
    location,
    image: uploadedUrl,
    email,
    phone: parseFloat(phone),
  });

  if (result) {
    return NextResponse.json(
      { message: "Food item received successfully" },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { message: "Food Failed to create" },
      { status: 400 }
    );
  }
}
