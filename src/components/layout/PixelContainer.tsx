"use client";

import React from "react";

export default function PixelContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "#0a0a1a",
        overflow: "hidden",
        imageRendering: "pixelated",
      }}
    >
      {children}
    </div>
  );
}
