"use client";

import React, { useState, useEffect, useRef } from "react";

interface SpeechBubbleProps {
  text: string;
  color: string;
  side: "left" | "right";
  isLoading: boolean;
}

export default function SpeechBubble({ text, color, side, isLoading }: SpeechBubbleProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const prevTextRef = useRef("");

  useEffect(() => {
    if (isLoading || !text) {
      setDisplayedText("");
      setIsTyping(false);
      return;
    }

    if (text === prevTextRef.current) return;
    prevTextRef.current = text;

    setIsTyping(true);
    setDisplayedText("");
    let index = 0;

    const interval = setInterval(() => {
      index++;
      setDisplayedText(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 22);

    return () => clearInterval(interval);
  }, [text, isLoading]);

  return (
    <>
      <style jsx>{`
        @keyframes bubbleAppear {
          from { opacity: 0; transform: scale(0.7); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
      <div
        style={{
          position: "absolute",
          bottom: "100%",
          [side === "left" ? "left" : "right"]: "-10px",
          marginBottom: "12px",
          maxWidth: "280px",
          minWidth: "60px",
          animation: "bubbleAppear 0.25s ease-out",
        }}
      >
        {/* Bubble */}
        <div
          style={{
            background: "#1e1e3a",
            border: `2px solid ${color}`,
            borderRadius: "8px",
            padding: "10px 14px",
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "11px",
            lineHeight: "1.7",
            color: "#e8dcc8",
            position: "relative",
            boxShadow: `0 0 10px ${color}33`,
          }}
        >
          {isLoading ? (
            <div style={{ display: "flex", gap: "6px", padding: "4px 8px" }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: color,
                    animation: `dotBounce 1.2s ease-in-out ${i * 0.15}s infinite`,
                  }}
                />
              ))}
            </div>
          ) : (
            <span>
              {displayedText}
              {isTyping && (
                <span
                  style={{
                    animation: "blink 0.8s step-start infinite",
                    color,
                  }}
                >
                  ▌
                </span>
              )}
            </span>
          )}
        </div>
        {/* Tail */}
        <div
          style={{
            position: "absolute",
            bottom: "-8px",
            [side === "left" ? "left" : "right"]: "20px",
            width: 0,
            height: 0,
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: `8px solid ${color}`,
          }}
        />
      </div>
    </>
  );
}
