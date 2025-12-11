"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

export default function MailButton({ email }: { email: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
      >
        <Mail className="inline-block mr-2" />
        Contact Finder
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-sm shadow-xl">
            <h2 className="text-xl font-semibold mb-3">Contact Finder</h2>

            <p className="mb-2">
              <strong>Email:</strong> {email || "Not provided"}
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
