"use client";

import React, { useEffect, useRef } from "react";
import PixelContainer from "@/components/layout/PixelContainer";
import Stars from "@/components/scene/Stars";
import Moon from "@/components/scene/Moon";
import Trees from "@/components/scene/Trees";
import Campfire from "@/components/scene/Campfire";
import LLMSprite from "@/components/characters/LLMSprite";
import SpeechBubble from "@/components/characters/SpeechBubble";
import HUD from "@/components/ui/HUD";
import ControlToolbar from "@/components/ui/ControlToolbar";
import { Message, ConversationConfig } from "@/lib/types";

interface CampfireSceneProps {
  config: ConversationConfig;
  messages: Message[];
  currentSpeaker: "A" | "B" | null;
  isLoading: boolean;
  isThinking: "A" | "B" | null;
  turn: number;
  running: boolean;
  onPause: () => void;
  onResume: () => void;
}

export default function CampfireScene({
  config,
  messages,
  currentSpeaker,
  isLoading,
  isThinking,
  turn,
  running,
  onPause,
  onResume,
}: CampfireSceneProps) {
  const queueEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (queueEndRef.current) {
      queueEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, currentSpeaker]);

  return (
    <PixelContainer>
      {/* Sky gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 20%, #0f0f2e 0%, #0a0a1a 60%, #050510 100%)",
        }}
      />

      {/* Scene layers */}
      <Stars />
      <Moon />
      <Trees />

      {/* Dark fade at bottom for ground depth without hard edges */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "25%",
          background: "linear-gradient(to top, #08081a 0%, transparent 100%)",
          zIndex: 5,
          pointerEvents: "none",
        }}
      />

      {/* Message Queue (WhatsApp-style) */}
      <div
        style={{
          position: "absolute",
          top: "80px", // Below ControlToolbar
          bottom: "35%", // Above characters
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: "800px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          overflowY: "auto",
          padding: "20px",
          scrollbarWidth: "none",
          zIndex: 20,
        }}
      >
        {messages.map((msg, index) => (
          <SpeechBubble
            key={msg.id}
            text={msg.text}
            color={msg.model.color}
            side={msg.speaker === "A" ? "left" : "right"}
            isLoading={false}
            animate={index === messages.length - 1} // Only animate the newest
          />
        ))}
        {/* Active typing bubble */}
        {isLoading && currentSpeaker && (
          <SpeechBubble
            text=""
            color={currentSpeaker === "A" ? config.modelA.color : config.modelB.color}
            side={currentSpeaker === "A" ? "left" : "right"}
            isLoading={true}
            animate={true}
          />
        )}
        <div ref={queueEndRef} style={{ height: "20px", flexShrink: 0 }} />
      </div>

      {/* Characters + Campfire row */}
      <div
        style={{
          position: "absolute",
          bottom: "18%",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          gap: "60px",
          padding: "0 40px",
          transform: "translateY(20px)",
        }}
      >
        {/* Character A (left) */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", zIndex: 15 }}>
        <LLMSprite
          color={config.modelA.color}
          isThinking={isThinking === "A"}
          side="left"
        />
        <span
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "var(--fs-sm)",
            color: config.modelA.color,
            marginTop: "8px",
            textShadow: `0 0 8px ${config.modelA.color}66`,
          }}
        >
          {config.modelA.emoji} {config.modelA.name}
        </span>
        </div>

        {/* Campfire */}
        <div style={{ marginBottom: "10px" }}>
          <Campfire />
        </div>

        {/* Character B (right) */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", zIndex: 15 }}>
        <LLMSprite
          color={config.modelB.color}
          isThinking={isThinking === "B"}
          side="right"
        />
        <span
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "var(--fs-sm)",
            color: config.modelB.color,
            marginTop: "8px",
            textShadow: `0 0 8px ${config.modelB.color}66`,
          }}
        >
          {config.modelB.emoji} {config.modelB.name}
        </span>
        </div>
      </div>

      {/* HUD overlay */}
      <HUD
        mode={config.mode}
        topic={config.topic}
        turn={turn}
      />

      <ControlToolbar
        running={running}
        onPause={onPause}
        onResume={onResume}
      />
    </PixelContainer>
  );
}
