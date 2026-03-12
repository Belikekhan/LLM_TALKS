"use client";

import React, { useState, useEffect, useRef } from "react";

interface SpeechBubbleProps {
  text: string;
  color: string;
  side: "left" | "right";
  isLoading: boolean;
  animate?: boolean;
}

export default function SpeechBubble({
  text,
  color,
  side,
  isLoading,
  animate = true,
}: SpeechBubbleProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const prevTextRef = useRef("");

  useEffect(() => {
    if (isLoading || !text) {
      setDisplayedText("");
      setIsTyping(false);
      return;
    }

    if (!animate) {
      setDisplayedText(text);
      setIsTyping(false);
      return;
    }

    if (text === prevTextRef.current) return;
    prevTextRef.current = text;

    setIsTyping(true);
    setDisplayedText("");
    let index = 0;

    const intervalTime = 28; // Decent readable speed

    const interval = setInterval(() => {
      index++;
      setDisplayedText(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [text, isLoading, animate]);

  return (
    <>
      <style jsx>{`
        @keyframes messageAppear {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
      <div
        style={{
          alignSelf: side === "left" ? "flex-start" : "flex-end",
          marginBottom: "12px",
          width: "480px",
          maxWidth: "85vw",
          animation: animate ? "messageAppear 0.3s ease-out" : "none",
        }}
      >
        <div
          style={{
            background: "#1e1e3a",
            border: `2px solid ${color}`,
            borderRadius: "8px",
            borderBottomLeftRadius: side === "left" ? "0" : "8px",
            borderBottomRightRadius: side === "right" ? "0" : "8px",
            padding: "10px 14px",
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "var(--fs-md)",
            lineHeight: "1.8",
            textAlign: "left",
            overflowWrap: "anywhere",
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
      </div>
    </>
  );
}
