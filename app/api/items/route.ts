import Item from "@/lib/models/Item";
import { connectDB } from "@/lib/mongodb";
import { createItem } from "@/lib/services/item-service";
import { uploadImageToCloudinary } from "@/lib/uploadImage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();

  const q = req.nextUrl.searchParams.get("q") || "";

  // hailt hooson bol buh datag avah
  if (!q) {
    const allItems = await Item.find();
    return NextResponse.json({ data: allItems }, { status: 200 });
  }

  // hailt-regez
  const items = await Item.find({
    $or: [
      { title: { $regex: q, $options: "i" } },
      { desc: { $regex: q, $options: "i" } },
      { category: { $regex: q, $options: "i" } },
      { location: { $regex: q, $options: "i" } },
    ],
  });

  const response = NextResponse.json({ data: items }, { status: 200 });

  // cors-n  aldaag zasah
  response.headers.set("Access-Control-Allow-Origin", "*");
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

  const type = formData.get("type") as string;
  const title = formData.get("title") as string;
  const desc = formData.get("desc") as string;
  const category = formData.get("category") as string;
  const location = formData.get("location") as string;
  const image = formData.get("image") as File;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  if (!title || !desc || !category || !location || !email || !phone || !type) {
    return NextResponse.json({ error: "All fields are required!" });
  }

  const uploadedUrl = await uploadImageToCloudinary(image);

  const result = await createItem({
    type,
    title,
    desc,
    category,
    location,
    imageUrl: uploadedUrl,
    email,
    phone: parseFloat(phone),
  });

  if (result) {
    return NextResponse.json(
      { message: "Item created successfully" },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { message: "Item creation failed" },
      { status: 400 }
    );
  }
}
