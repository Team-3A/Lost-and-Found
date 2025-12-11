import React from "react";

export default function SkeletonCards({ loading }: any) {
  if (!loading) return null;

  return (
    <div className="w-[400px] sm:w-5xl mx-auto flex flex-col gap-6 overflow-hidden">
      <div className="flex gap-10 justify-center items-center flex-col md:hidden">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="border rounded-3xl shadow-md w-60 p-4 bg-white animate-pulse"
          >
            <div className="relative h-40 bg-gray-200 rounded-2xl" />
            <div className="mt-4 h-6 bg-gray-200 rounded w-3/4" />
            <div className="mt-2 h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>

      <div className="hidden md:flex flex-col gap-6">
        {[...Array(2)].map((_, r) => (
          <div key={r} className="w-full flex gap-5 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="border rounded-2xl shadow-md w-60 p-2 bg-white animate-pulse"
              >
                <div className="relative h-40 bg-gray-200 rounded-xl" />
                <div className="mt-3 h-5 bg-gray-200 rounded w-3/4" />
                <div className="mt-2 h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
