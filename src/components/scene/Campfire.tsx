"use client";

import React from "react";

export default function Campfire() {
  return (
    <>
      <style jsx>{`
        @keyframes flickerOuter {
          0%, 100% { transform: scaleY(1) scaleX(1) translateY(0); }
          25% { transform: scaleY(1.08) scaleX(0.95) translateY(-2px); }
          50% { transform: scaleY(0.92) scaleX(1.05) translateY(1px); }
          75% { transform: scaleY(1.05) scaleX(0.98) translateY(-1px); }
        }
        @keyframes flickerMid {
          0%, 100% { transform: scaleY(1) scaleX(1) translateY(0); }
          30% { transform: scaleY(1.1) scaleX(0.92) translateY(-3px); }
          60% { transform: scaleY(0.9) scaleX(1.08) translateY(1px); }
        }
        @keyframes flickerInner {
          0%, 100% { transform: scaleY(1) translateY(0); }
          50% { transform: scaleY(1.15) translateY(-2px); }
        }
        @keyframes ember {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-40px) scale(0.3); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
      `}</style>
      <div style={{ position: "relative", width: "80px", height: "100px" }}>
        {/* Ground glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-10px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "140px",
            height: "40px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(255,140,50,0.3) 0%, transparent 70%)",
            animation: "glowPulse 2s ease-in-out infinite",
          }}
        />
        {/* Logs */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "10px",
            width: "60px",
            height: "10px",
            backgroundColor: "#5d3a1a",
            borderRadius: "2px",
            transform: "rotate(-8deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "2px",
            left: "15px",
            width: "55px",
            height: "9px",
            backgroundColor: "#4a2e14",
            borderRadius: "2px",
            transform: "rotate(6deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "6px",
            left: "20px",
            width: "40px",
            height: "8px",
            backgroundColor: "#6b4226",
            borderRadius: "2px",
            transform: "rotate(-3deg)",
          }}
        />
        {/* Outer flame */}
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "36px",
            height: "50px",
            clipPath: "polygon(50% 0%, 10% 85%, 0% 100%, 100% 100%, 90% 85%)",
            backgroundColor: "#e65100",
            animation: "flickerOuter 0.6s ease-in-out infinite",
            transformOrigin: "bottom center",
          }}
        />
        {/* Mid flame */}
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "26px",
            height: "40px",
            clipPath: "polygon(50% 0%, 10% 80%, 0% 100%, 100% 100%, 90% 80%)",
            backgroundColor: "#ff9800",
            animation: "flickerMid 0.5s ease-in-out infinite",
            transformOrigin: "bottom center",
          }}
        />
        {/* Inner flame */}
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "14px",
            height: "28px",
            clipPath: "polygon(50% 0%, 15% 80%, 0% 100%, 100% 100%, 85% 80%)",
            backgroundColor: "#ffee58",
            animation: "flickerInner 0.35s ease-in-out infinite",
            transformOrigin: "bottom center",
          }}
        />
        {/* Embers */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              bottom: "40px",
              left: `${25 + i * 12}px`,
              width: "3px",
              height: "3px",
              backgroundColor: i % 2 === 0 ? "#ff6d00" : "#ffab40",
              borderRadius: "50%",
              animation: `ember ${1.5 + i * 0.4}s ease-out ${i * 0.3}s infinite`,
            }}
          />
        ))}
      </div>
    </>
  );
}
