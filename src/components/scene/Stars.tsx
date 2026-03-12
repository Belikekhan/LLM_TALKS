"use client";

import React, { useMemo } from "react";

export default function Stars() {
  const stars = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 55,
      size: 1 + Math.random(),
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
      `}</style>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {stars.map((star) => (
          <div
            key={star.id}
            style={{
              position: "absolute",
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: "#fffde7",
              borderRadius: "50%",
              animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
              boxShadow: "0 0 2px #fffde7",
            }}
          />
        ))}
      </div>
    </>
  );
}
