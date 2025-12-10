// /app/api/items/[id]/route.ts
import Item from "@/lib/models/Item";
import { connectDB } from "@/lib/mongodb";
import { uploadImageToCloudinary } from "@/lib/uploadImage";
import { verifyToken } from "@clerk/backend";
import { NextRequest, NextResponse } from "next/server";

async function setCors(res: NextResponse) {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return res;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  try {
    const { id } = params;
    if (!id) {
      const res = NextResponse.json(
        { error: "Item ID required" },
        { status: 400 }
      );
      return setCors(res);
    }

    const item = await Item.findById(id);
    if (!item) {
      const res = NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
      return setCors(res);
    }

    const res = NextResponse.json({ data: item }, { status: 200 });
    return setCors(res);
  } catch (error) {
    console.error("GET /api/items/[id] error:", error);
    const res = NextResponse.json({ error: "Server error" }, { status: 500 });
    return setCors(res);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  try {
    const { id } = params;
    if (!id) {
      const res = NextResponse.json(
        { error: "Item ID required" },
        { status: 400 }
      );
      return setCors(res);
    }

    // auth
    const authHeader = request.headers.get("authorization") ?? "";
    const authToken = authHeader.split(" ")[1];
    if (!authToken) {
      return NextResponse.json(
        { error: "Unauthorized: missing token" },
        { status: 401 }
      );
    }
    const { sub } = await verifyToken(authToken, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });
    const clerkId = sub;

    const formData = await request.formData();
    const title = (formData.get("title") as string) || undefined;
    const desc = (formData.get("desc") as string) || undefined;
    const category = (formData.get("category") as string) || undefined;
    const location = (formData.get("location") as string) || undefined;
    const email = (formData.get("email") as string) || undefined;
    const phoneRaw = (formData.get("phone") as string) || undefined;
    const image = formData.get("image") as File | null;

    const existing = await Item.findById(id);
    if (!existing) {
      const res = NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
      return setCors(res);
    }

    // ensure the actor is the owner (optional but recommended)
    if (existing.clerkId && existing.clerkId !== clerkId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    let uploadedUrl = existing.imageUrl || "";
    if (image && typeof image === "object") {
      uploadedUrl = await uploadImageToCloudinary(image);
    }

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (desc !== undefined) updateData.desc = desc;
    if (category !== undefined) updateData.category = category;
    if (location !== undefined) updateData.location = location;
    if (email !== undefined) updateData.email = email;
    if (phoneRaw !== undefined) updateData.phone = parseFloat(phoneRaw);
    if (uploadedUrl) updateData.imageUrl = uploadedUrl;

    updateData.updatedAt = new Date();

    const updated = await Item.findByIdAndUpdate(id, updateData, { new: true });
    const res = NextResponse.json(
      { message: "Item updated", data: updated },
      { status: 200 }
    );
    return setCors(res);
  } catch (error) {
    console.error("PATCH /api/items/[id] error:", error);
    const res = NextResponse.json({ error: "Server error" }, { status: 500 });
    return setCors(res);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();

  try {
    const { id } = params;
    if (!id) {
      const res = NextResponse.json(
        { error: "Item ID required" },
        { status: 400 }
      );
      return setCors(res);
    }

    // auth
    const authHeader = req.headers.get("authorization") ?? "";
    const authToken = authHeader.split(" ")[1];
    if (!authToken) {
      return NextResponse.json(
        { error: "Unauthorized: missing token" },
        { status: 401 }
      );
    }
    const { sub } = await verifyToken(authToken, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });
    const clerkId = sub;

    const existing = await Item.findById(id);
    if (!existing) {
      const res = NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
      return setCors(res);
    }

    if (existing.clerkId && existing.clerkId !== clerkId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await Item.findByIdAndDelete(id);
    const res = NextResponse.json({ message: "Item deleted" }, { status: 200 });
    return setCors(res);
  } catch (error) {
    console.error("DELETE /api/items/[id] error:", error);
    const res = NextResponse.json({ error: "Server error" }, { status: 500 });
    return setCors(res);
  }
}
