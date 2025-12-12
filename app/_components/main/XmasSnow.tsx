"use client";

export default function XmasSnow() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(150)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white opacity-80 rounded-full animate-snowfall"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * -100}%`,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}
