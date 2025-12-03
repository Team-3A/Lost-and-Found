import { NextResponse } from "next/server";
import { verifyToken } from "@clerk/backend";
import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const headersList = await headers();
  const authorization = headersList.get("Authorization");
  const authToken = authorization?.split(" ")[1];
  console.log({ authToken });

  if (!authToken) {
    return Response.json({});
  }
  const { sub } = await verifyToken(authToken, {
    secretKey: process.env.CLERK_SECRET_KEY,
  });
  const userId = sub;

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const { clerkId, email, name, profileImage, phoneNumber } =
      await req.json();

    if (!clerkId || !email) {
      return NextResponse.json(
        { message: "Missing clerkId or email" },
        { status: 400 }
      );
    }

    if (userId !== clerkId) {
      return NextResponse.json(
        { message: "Forbidden — user mismatch" },
        { status: 403 }
      );
    }

    let user = await User.findOne({ clerkId });

    if (!user) {
      user = await User.create({
        clerkId,
        email,
        name,
        profileImage,
        phoneNumber,
      });
    } else {
      user.email = email;
      user.name = name;
      user.profileImage = profileImage;
      user.phoneNumber = phoneNumber;
      await user.save();
    }

    return NextResponse.json({ data: user }, { status: 200 });
  } catch (err) {
    console.error("User API Error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
