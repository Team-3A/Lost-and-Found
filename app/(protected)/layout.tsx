"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { UserResource } from "@clerk/types";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { UserType } from "@/lib/types";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const [appUser, setAppUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { getToken } = useAuth();

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/auth/signup");
    }

    if (isLoaded && user) {
      createOrSyncUser(user);
    }
  }, [isLoaded, user]);

  const createOrSyncUser = async (user: UserResource) => {
    const token = await getToken();
    console.log({ token });

    if (!user) {
      toast.warning("Missing required user data!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-App-Client": "sentinel-trace",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          clerkId: user.id,
          email: user.emailAddresses[0]?.emailAddress,
          name: user.fullName,
          profileImage: user.imageUrl,
          phoneNumber: user.phoneNumbers[0]?.phoneNumber || null,
        }),
      });

      const { data } = await response.json();

      if (response.ok) {
        setAppUser(data);
      } else {
        toast.error(data?.message || "Failed to sync user!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="w-screen h-screen flex">
        <div className="w-full h-full flex items-center justify-center gap-1.5">
          <AiOutlineLoading className="animate-spin" size={24} />
          <div className="text-2xl leading-8 font-semibold text-foreground">
            Loading
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex flex-col">
      <>
        {children}
        <Toaster position="top-center" />
      </>
    </div>
  );
}
