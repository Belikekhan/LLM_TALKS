"use client";

import React from "react";
import PixelContainer from "@/components/layout/PixelContainer";
import Stars from "@/components/scene/Stars";
import Moon from "@/components/scene/Moon";
import Trees from "@/components/scene/Trees";
import Campfire from "@/components/scene/Campfire";
import LLMSprite from "@/components/characters/LLMSprite";
import SpeechBubble from "@/components/characters/SpeechBubble";
import HUD from "@/components/ui/HUD";
import Transcript from "@/components/ui/Transcript";
import { Message, ConversationConfig, ConversationMode } from "@/lib/types";

interface CampfireSceneProps {
  config: ConversationConfig;
  messages: Message[];
  currentSpeaker: "A" | "B" | null;
  isLoading: boolean;
  turn: number;
  running: boolean;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
}

export default function CampfireScene({
  config,
  messages,
  currentSpeaker,
  isLoading,
  turn,
  running,
  onPause,
  onResume,
  onReset,
}: CampfireSceneProps) {
  const lastMessageA = [...messages].reverse().find((m) => m.speaker === "A");
  const lastMessageB = [...messages].reverse().find((m) => m.speaker === "B");

  const showBubbleA = currentSpeaker === "A" || (lastMessageA && messages[messages.length - 1]?.speaker === "A");
  const showBubbleB = currentSpeaker === "B" || (lastMessageB && messages[messages.length - 1]?.speaker === "B");

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

      {/* Ground */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "18%",
          background: "linear-gradient(#1a1a2e, #12122a)",
          borderTop: "2px solid #252540",
        }}
      />

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
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {showBubbleA && (
            <SpeechBubble
              text={lastMessageA?.text || ""}
              color={config.modelA.color}
              side="left"
              isLoading={currentSpeaker === "A" && isLoading}
            />
          )}
          <LLMSprite
            color={config.modelA.color}
            isTalking={currentSpeaker === "A"}
            side="left"
          />
          <span
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "8px",
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
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {showBubbleB && (
            <SpeechBubble
              text={lastMessageB?.text || ""}
              color={config.modelB.color}
              side="right"
              isLoading={currentSpeaker === "B" && isLoading}
            />
          )}
          <LLMSprite
            color={config.modelB.color}
            isTalking={currentSpeaker === "B"}
            side="right"
          />
          <span
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "8px",
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
        running={running}
        onPause={onPause}
        onResume={onResume}
        onReset={onReset}
      />

      {/* Transcript overlay */}
      <Transcript messages={messages} />
    </PixelContainer>
  );
}
