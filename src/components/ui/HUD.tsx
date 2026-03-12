"use client";

import React from "react";
import { ConversationMode } from "@/lib/types";

interface HUDProps {
  mode: ConversationMode;
  topic: string;
  turn: number;
  running: boolean;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
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
  running,
  onPause,
  onResume,
  onReset,
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
        fontSize: "8px",
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

      {/* Right: turn + controls */}
      <div style={{ display: "flex", gap: "12px", alignItems: "center", flexShrink: 0 }}>
        <span style={{ color: "#7c6cd4" }}>TURN {turn}</span>
        <button
          onClick={running ? onPause : onResume}
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "7px",
            background: "rgba(124,108,212,0.2)",
            border: "1px solid #7c6cd4",
            color: "#9d8fff",
            padding: "4px 10px",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.background = "rgba(124,108,212,0.4)";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.background = "rgba(124,108,212,0.2)";
          }}
        >
          {running ? "⏸ PAUSE" : "▶ RESUME"}
        </button>
        <button
          onClick={onReset}
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "7px",
            background: "rgba(244,67,54,0.15)",
            border: "1px solid #66333a",
            color: "#f48fb1",
            padding: "4px 10px",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.background = "rgba(244,67,54,0.3)";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.background = "rgba(244,67,54,0.15)";
          }}
        >
          ✕ RESET
        </button>
      </div>
    </div>
  );
}
