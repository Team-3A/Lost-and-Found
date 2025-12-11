"use client";

import { useState } from "react";
import { Phone } from "lucide-react";

export default function PhoneButton({ phone }: { phone: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
      >
        <Phone className="inline-block mr-2" />
        Report Item Match
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-sm shadow-xl">
            <h2 className="text-xl font-semibold mb-3">Report Item Match</h2>

            <p className="mb-4">
              <strong>Phone:</strong> {phone || "Not provided"}
            </p>

            <button
              onClick={() => setOpen(false)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
