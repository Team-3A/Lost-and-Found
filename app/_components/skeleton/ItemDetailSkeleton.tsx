import React from "react";

export default function ItemDetailSkeleton({ loading }: { loading: boolean }) {
  if (!loading) return null;

  return (
    <div className="p-8 max-w-6xl mx-auto font-sans animate-pulse">
      <div className="h-12 bg-gray-200 rounded w-1/2 mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="rounded-2xl border shadow-ls overflow-hidden">
          <div className="w-180 h-100 rounded-t-2xl bg-gray-200" />
          <div className="flex gap-4 mt-5 mb-3 ml-3 pb-4">
            <div className="w-20 h-20 bg-gray-200 rounded-2xl" />
            <div className="w-20 h-20 bg-gray-200 rounded-2xl" />
            <div className="w-20 h-20 bg-gray-200 rounded-2xl" />
          </div>
        </div>

        <div>
          <div className="flex gap-4 flex-col w-80 rounded-md border p-6 h-fit shadow-ls">
            <div className="h-6 bg-gray-200 rounded w-1/3" />
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
              </div>
            ))}
          </div>

          <div className="flex gap-5 flex-col w-80 rounded-md border p-6 h-fit shadow-ls mt-9">
            <div className="h-6 bg-gray-200 rounded w-1/3 mt-4" />
            <div className="h-12 bg-gray-200 rounded-lg" />
            <div className="h-12 bg-gray-200 rounded-lg" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mt-10 shadow-ls p-6 rounded-lg border border-gray-200">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4" />
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-4/5" />
        </div>
      </div>

      <div className="max-w-4xl mt-10 shadow-ls p-6 rounded-lg border border-gray-200">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>

      <div className="h-4 bg-gray-200 rounded w-1/2 mt-5 mx-auto" />

      <div className="h-8 bg-gray-200 rounded w-1/4 mt-20 mb-6" />
      <div className="gap-4 grid grid-cols-1 md:grid-cols-4 mb-10">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="border rounded-2xl shadow-md overflow-hidden">
            <div className="h-40 bg-gray-200 rounded-t-2xl" />
            <div className="p-4 space-y-3">
              <div className="h-5 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
