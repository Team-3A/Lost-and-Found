"use client";
import { SignUp } from "@clerk/nextjs";
import React from "react";

const SignUpPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <SignUp routing={"hash"} />
    </div>
  );
};
export default SignUpPage;
