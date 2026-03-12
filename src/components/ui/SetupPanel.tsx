"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MODELS } from "@/lib/models";
import { Model, ConversationMode } from "@/lib/types";
import { useConversationStore } from "@/store/conversation";

const MODES: { value: ConversationMode; label: string; icon: string }[] = [
  { value: "chat", label: "CHAT", icon: "💬" },
  { value: "debate", label: "DEBATE", icon: "⚔️" },
  { value: "collab", label: "COLLAB", icon: "🤝" },
  { value: "roast", label: "ROAST", icon: "🔥" },
];

const PRESET_TOPICS = [
  "Is consciousness just computation?",
  "Should AI have rights?",
  "What makes a life meaningful?",
  "Is free will an illusion?",
  "What would utopia look like?",
  "Are humans still evolving?",
];

export default function SetupPanel() {
  const router = useRouter();
  const setConfig = useConversationStore((s) => s.setConfig);

  const [modelA, setModelA] = useState<Model>(MODELS[0]);
  const [modelB, setModelB] = useState<Model>(MODELS[1]);
  const [mode, setMode] = useState<ConversationMode>("chat");
  const [topic, setTopic] = useState(PRESET_TOPICS[0]);
  const [customTopic, setCustomTopic] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isCustom, setIsCustom] = useState(false);

  const handleStart = () => {
    const finalTopic = isCustom ? customTopic : topic;
    if (!finalTopic) return;

    setConfig({
      modelA,
      modelB,
      mode,
      topic: finalTopic,
      apiKey,
    });

    router.push("/arena");
  };

  const isReady = isCustom ? customTopic.length > 0 : topic.length > 0;

  return (
    <>
      <style jsx>{`
        @keyframes titleGlow {
          0%, 100% { text-shadow: 0 0 10px #7c6cd4, 0 0 30px #7c6cd444; }
          50% { text-shadow: 0 0 20px #9d8fff, 0 0 50px #7c6cd488, 0 0 80px #7c6cd444; }
        }
        @keyframes btnGlow {
          0%, 100% { box-shadow: 0 0 10px #7c6cd4, 0 0 20px #7c6cd444; }
          50% { box-shadow: 0 0 20px #9d8fff, 0 0 40px #7c6cd488; }
        }
      `}</style>
      <div
        style={{
          minHeight: "100vh",
          background: "radial-gradient(ellipse at 50% 30%, #0f0f2e 0%, #0a0a1a 70%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          fontFamily: "'Press Start 2P', monospace",
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: "32px",
            color: "#9d8fff",
            animation: "titleGlow 3s ease-in-out infinite",
            marginBottom: "8px",
            textAlign: "center",
          }}
        >
          LLM TALKS
        </h1>
        <p
          style={{
            fontSize: "9px",
            color: "#8a7a6a",
            marginBottom: "40px",
            textAlign: "center",
            lineHeight: "1.8",
          }}
        >
          watch AI minds converse ✦ campfire edition
        </p>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            maxWidth: "680px",
            width: "100%",
          }}
        >
          {/* Model A */}
          <div>
            <label style={{ fontSize: "8px", color: "#e8dcc8", marginBottom: "10px", display: "block" }}>
              MODEL A
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {MODELS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setModelA(m)}
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "8px",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    border: modelA.id === m.id ? `2px solid ${m.color}` : "2px solid #2a2a4a",
                    background: modelA.id === m.id ? `${m.color}22` : "#1e1e3a",
                    color: modelA.id === m.id ? m.color : "#8a7a6a",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s",
                    boxShadow: modelA.id === m.id ? `0 0 10px ${m.color}33` : "none",
                  }}
                >
                  {m.emoji} {m.name}
                </button>
              ))}
            </div>
          </div>

          {/* Model B */}
          <div>
            <label style={{ fontSize: "8px", color: "#e8dcc8", marginBottom: "10px", display: "block" }}>
              MODEL B
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {MODELS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setModelB(m)}
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "8px",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    border: modelB.id === m.id ? `2px solid ${m.color}` : "2px solid #2a2a4a",
                    background: modelB.id === m.id ? `${m.color}22` : "#1e1e3a",
                    color: modelB.id === m.id ? m.color : "#8a7a6a",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s",
                    boxShadow: modelB.id === m.id ? `0 0 10px ${m.color}33` : "none",
                  }}
                >
                  {m.emoji} {m.name}
                </button>
              ))}
            </div>
          </div>

          {/* Mode selector */}
          <div>
            <label style={{ fontSize: "8px", color: "#e8dcc8", marginBottom: "10px", display: "block" }}>
              MODE
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
              {MODES.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setMode(m.value)}
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "8px",
                    padding: "10px 8px",
                    borderRadius: "6px",
                    border: mode === m.value ? "2px solid #7c6cd4" : "2px solid #2a2a4a",
                    background: mode === m.value ? "#7c6cd422" : "#1e1e3a",
                    color: mode === m.value ? "#9d8fff" : "#8a7a6a",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {m.icon} {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Topic selector */}
          <div>
            <label style={{ fontSize: "8px", color: "#e8dcc8", marginBottom: "10px", display: "block" }}>
              TOPIC
            </label>
            <select
              value={isCustom ? "__custom__" : topic}
              onChange={(e) => {
                if (e.target.value === "__custom__") {
                  setIsCustom(true);
                } else {
                  setIsCustom(false);
                  setTopic(e.target.value);
                }
              }}
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "7px",
                padding: "10px",
                borderRadius: "6px",
                border: "2px solid #2a2a4a",
                background: "#1e1e3a",
                color: "#e8dcc8",
                width: "100%",
                cursor: "pointer",
                marginBottom: "8px",
                lineHeight: "1.8",
              }}
            >
              {PRESET_TOPICS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
              <option value="__custom__">✏️ Custom topic...</option>
            </select>
            {isCustom && (
              <input
                type="text"
                placeholder="Enter your topic..."
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "7px",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "2px solid #7c6cd4",
                  background: "#1e1e3a",
                  color: "#e8dcc8",
                  width: "100%",
                  outline: "none",
                }}
              />
            )}
          </div>
        </div>

        {/* API Key */}
        <div style={{ maxWidth: "680px", width: "100%", marginTop: "24px" }}>
          <label style={{ fontSize: "8px", color: "#e8dcc8", marginBottom: "10px", display: "block" }}>
            GROQ API KEY (OPTIONAL FOR DEMO)
          </label>
          <input
            type="password"
            placeholder="gsk_..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "8px",
              padding: "12px",
              borderRadius: "6px",
              border: "2px solid #2a2a4a",
              background: "#1e1e3a",
              color: "#e8dcc8",
              width: "100%",
              outline: "none",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#7c6cd4";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#2a2a4a";
            }}
          />
          <p style={{ fontSize: "7px", color: "#8a7a6a", marginTop: "6px" }}>
            Get your key at{" "}
            <a
              href="https://console.groq.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#7c6cd4", textDecoration: "underline" }}
            >
              console.groq.com
            </a>
          </p>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          disabled={!isReady}
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "12px",
            padding: "16px 32px",
            borderRadius: "8px",
            border: isReady ? "2px solid #7c6cd4" : "2px solid #2a2a4a",
            background: isReady ? "#7c6cd433" : "#1e1e3a",
            color: isReady ? "#9d8fff" : "#4a4a6a",
            cursor: isReady ? "pointer" : "not-allowed",
            marginTop: "32px",
            transition: "all 0.3s",
            animation: isReady ? "btnGlow 2s ease-in-out infinite" : "none",
          }}
        >
          ▶ IGNITE THE CAMPFIRE
        </button>
      </div>
    </>
  );
}
