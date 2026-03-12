"use client";

import React from "react";
import { ConversationMode } from "@/lib/types";

interface HUDProps {
  mode: ConversationMode;
  topic: string;
  turn: number;
}

const MODE_ICONS: Record<ConversationMode, string> = {
  chat: "💬",
  debate: "⚔️",
  collab: "🤝",
  roast: "🔥",
};

export default function HUD({
  mode,
  topic,
  turn,
}: HUDProps) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 20px",
        background: "linear-gradient(rgba(10,10,26,0.9), transparent)",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: "var(--fs-sm)",
        color: "#e8dcc8",
        zIndex: 20,
      }}
    >
      {/* Left: mode + topic */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center", flex: 1, minWidth: 0 }}>
        <span>
          {MODE_ICONS[mode]} {mode.toUpperCase()}
        </span>
        <span
          style={{
            color: "#8a7a6a",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          &quot;{topic}&quot;
        </span>
      </div>

      {/* Right: turn status */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center", flexShrink: 0 }}>
        <span style={{ color: "#7c6cd4" }}>TURN {turn}</span>
      </div>
    </div>
  );
}
