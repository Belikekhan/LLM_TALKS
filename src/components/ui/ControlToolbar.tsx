"use client";

import React from "react";

interface ControlToolbarProps {
  running: boolean;
  speed: number;
  viewIndex: number;
  maxIndex: number;
  onPause: () => void;
  onResume: () => void;
  onSpeedChange: (speed: number) => void;
  onViewIndexChange: (index: number) => void;
}

export default function ControlToolbar({
  running,
  onPause,
  onResume,
}: Omit<ControlToolbarProps, "speed" | "viewIndex" | "maxIndex" | "onSpeedChange" | "onViewIndexChange">) {
  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        display: "flex",
        padding: "8px",
        background: "rgba(15,15,46,0.6)",
        border: "2px solid #4a4a8a",
        borderRadius: "8px",
        fontFamily: "'Press Start 2P', monospace",
        zIndex: 50,
        backdropFilter: "blur(4px)",
      }}
    >
      <button
        onClick={running ? onPause : onResume}
        style={{
          padding: "10px 16px",
          fontSize: "10px",
          background: running ? "rgba(244,67,54,0.15)" : "rgba(76,175,80,0.15)",
          border: `1px solid ${running ? "#f44336" : "#4caf50"}`,
          color: running ? "#ffcdd2" : "#c8e6c9",
          cursor: "pointer",
          fontFamily: "'Press Start 2P', monospace",
          borderRadius: "4px",
          transition: "all 0.2s",
        }}
      >
        {running ? "⏸ PAUSE" : "▶ RESUME"}
      </button>
    </div>
  );
}
