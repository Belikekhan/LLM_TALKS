"use client";

import React from "react";

interface LLMSpriteProps {
  color: string;
  isTalking: boolean;
  side: "left" | "right";
}

export default function LLMSprite({ color, isTalking, side }: LLMSpriteProps) {
  return (
    <>
      <style jsx>{`
        @keyframes idleBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes talkShake {
          0%, 100% { transform: translateX(0) rotate(0); }
          25% { transform: translateX(-1.5px) rotate(-1deg); }
          75% { transform: translateX(1.5px) rotate(1deg); }
        }
      `}</style>
      <div
        style={{
          animation: isTalking
            ? "talkShake 0.15s ease-in-out infinite"
            : "idleBob 3s ease-in-out infinite",
          filter: `drop-shadow(0 0 ${isTalking ? "12px" : "6px"} ${color})`,
          transform: side === "right" ? "scaleX(-1)" : "scaleX(1)",
          transition: "filter 0.3s ease",
        }}
      >
        <svg
          width="64"
          height="80"
          viewBox="0 0 64 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ imageRendering: "pixelated" }}
        >
          {/* Antenna */}
          <rect x="30" y="2" width="4" height="10" fill={color} />
          <circle
            cx="32"
            cy="2"
            r="3"
            fill={isTalking ? "#fff" : color}
            style={{
              filter: isTalking ? `drop-shadow(0 0 4px ${color})` : "none",
            }}
          />

          {/* Head */}
          <rect x="14" y="12" width="36" height="26" rx="4" fill={color} opacity={0.85} />

          {/* Eyes */}
          <rect
            x="22"
            y="20"
            width="7"
            height="7"
            fill={isTalking ? "#fff" : "#0a0a1a"}
            style={{
              filter: isTalking ? `drop-shadow(0 0 3px #fff)` : "none",
            }}
          />
          <rect
            x="35"
            y="20"
            width="7"
            height="7"
            fill={isTalking ? "#fff" : "#0a0a1a"}
            style={{
              filter: isTalking ? `drop-shadow(0 0 3px #fff)` : "none",
            }}
          />

          {/* Mouth */}
          <rect
            x="27"
            y="31"
            width="10"
            height={isTalking ? "5" : "2"}
            fill="#0a0a1a"
            rx="1"
          />

          {/* Ear bumps */}
          <rect x="10" y="20" width="4" height="8" rx="2" fill={color} opacity={0.7} />
          <rect x="50" y="20" width="4" height="8" rx="2" fill={color} opacity={0.7} />

          {/* Body */}
          <rect x="18" y="40" width="28" height="22" rx="3" fill={color} opacity={0.7} />

          {/* Screen on body */}
          <rect x="24" y="44" width="16" height="12" rx="1" fill="#0a0a1a" opacity={0.6} />
          <rect x="26" y="47" width="12" height="2" fill={color} opacity={0.5} />
          <rect x="26" y="51" width="8" height="2" fill={color} opacity={0.4} />

          {/* Arms */}
          <rect x="8" y="42" width="10" height="5" rx="2" fill={color} opacity={0.6} />
          <rect x="46" y="42" width="10" height="5" rx="2" fill={color} opacity={0.6} />

          {/* Legs */}
          <rect x="22" y="62" width="7" height="14" rx="2" fill={color} opacity={0.6} />
          <rect x="35" y="62" width="7" height="14" rx="2" fill={color} opacity={0.6} />

          {/* Feet */}
          <rect x="20" y="74" width="11" height="5" rx="2" fill={color} opacity={0.5} />
          <rect x="33" y="74" width="11" height="5" rx="2" fill={color} opacity={0.5} />
        </svg>
      </div>
    </>
  );
}
