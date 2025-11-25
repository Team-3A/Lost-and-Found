import Item, { ItemSchemaType } from "@/lib/models/Item";
import { connectDB } from "@/lib/mongodb";

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
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const desc = formData.get("desc") as string;
  const category = formData.get("category") as string;
  const location = formData.get("location") as string;
  const image = formData.get("image") as File;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  if (!title || !desc || !category || !location || !email || !phone) {
    return NextResponse.json({ error: "ALl fields are required!" });
  }

  const uploadedUrl = await uploadImageToCloudinary(image);

  const result = await createItem({
    type: "lost",
    title,
    desc,
    category,
    location,
    image: uploadedUrl,
    email,
    phone: parseFloat(phone),
  });
  console.log({ result });

  if (result) {
    return NextResponse.json(
      { message: "Lost/Found item received successfully" },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { message: "Lost/Found item failed to create" },
      { status: 400 }
    );
  }
}
