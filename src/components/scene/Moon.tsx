"use client";

import React from "react";

export default function Moon() {
  return (
    <div
      style={{
        position: "absolute",
        top: "8%",
        right: "12%",
        width: "60px",
        height: "60px",
        pointerEvents: "none",
      }}
    >
      {/* Outer circle (white moon) */}
      <div
        style={{
          position: "absolute",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#e8e0d0",
          boxShadow: "0 0 30px rgba(232, 224, 208, 0.4), 0 0 60px rgba(232, 224, 208, 0.15)",
        }}
      />
      {/* Inner cutout circle (crescent effect) */}
      <div
        style={{
          position: "absolute",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          backgroundColor: "#0a0a1a",
          top: "-5px",
          left: "15px",
        }}
      />
    </div>
  );
}
