"use client";

import React from "react";
import { Message } from "@/lib/types";

interface TranscriptProps {
  messages: Message[];
}

export default function Transcript({ messages }: TranscriptProps) {
  const lastMessages = messages.slice(-6);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        maxHeight: "22vh",
        background: "linear-gradient(transparent, rgba(10,10,26,0.95) 15%)",
        padding: "30px 20px 16px",
        overflow: "hidden",
      }}
    >
      <div
        ref={scrollRef}
        style={{
          maxHeight: "18vh",
          overflowY: "auto",
          scrollbarWidth: "none",
        }}
      >
        {lastMessages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "flex-start",
              marginBottom: "8px",
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "var(--fs-md)",
              lineHeight: "1.8",
            }}
          >
            <span
              style={{
                color: msg.model.color,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {msg.model.emoji} {msg.model.name}
            </span>
            <span style={{ color: "#8a7a6a" }}>{msg.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
