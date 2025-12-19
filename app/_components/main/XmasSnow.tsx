"use client";

import { Snowflake } from "lucide-react";

export default function XmasSnow() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(150)].map((_, i) => (
        <Snowflake
          key={i}
          className="absolute text-(--xmas-snow) opacity-80 rounded-full animate-snowfall "
          style={{
            width: `${Math.random() * 4 + 16}px`,
            height: `${Math.random() * 4 + 16}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * -100}%`,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}
