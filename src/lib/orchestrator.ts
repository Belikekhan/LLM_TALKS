"use client";

import { useState, useRef, useCallback } from "react";
import { ConversationConfig, Message, Model, ChatResponse } from "./types";
import { getSystemPrompt } from "./prompts";

function generateId(): string {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
}

export function useOrchestrator(config: ConversationConfig | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentSpeaker, setCurrentSpeaker] = useState<"A" | "B" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [turn, setTurn] = useState(0);
  const [running, setRunning] = useState(false);

  const runningRef = useRef(false);
  const historyRef = useRef<{ role: "user" | "assistant"; content: string }[]>([]);
  const turnRef = useRef(0);

  const doTurn = useCallback(
    async (speaker: "A" | "B") => {
      if (!config || !runningRef.current) return;

      const model: Model = speaker === "A" ? config.modelA : config.modelB;
      const otherModel: Model = speaker === "A" ? config.modelB : config.modelA;
      const systemPrompt = getSystemPrompt(model, otherModel, config.mode, config.topic);

      setCurrentSpeaker(speaker);
      setIsLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            modelId: model.id,
            systemPrompt,
            history: historyRef.current,
            apiKey: config.apiKey,
          }),
        });

        const data: ChatResponse = await res.json();

        if (data.error) {
          console.error("API error:", data.error);
          setIsLoading(false);
          setCurrentSpeaker(null);
          return;
        }

        const replyText = data.reply || "...";

        // Add to display messages
        const msg: Message = {
          id: generateId(),
          speaker,
          model,
          text: replyText,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, msg]);

        // Add to history - alternate roles so the next model sees the conversation correctly
        // For model A, its own messages are "assistant" and B's are "user"
        // For model B, its own messages are "assistant" and A's are "user"
        // We keep a unified history where A's turns are "assistant" and B's turns are "user"
        // Then we swap when calling B
        historyRef.current = [
          ...historyRef.current,
          { role: speaker === "A" ? "assistant" : "user", content: replyText },
        ];

        turnRef.current += 1;
        setTurn(turnRef.current);
        setIsLoading(false);
        setCurrentSpeaker(null);

        if (!runningRef.current) return;

        // Wait before next turn
        const delay = replyText.length * 22 + 1500;
        await new Promise((resolve) => setTimeout(resolve, delay));

        if (!runningRef.current) return;

        // Next speaker
        const nextSpeaker = speaker === "A" ? "B" : "A";
        doTurn(nextSpeaker);
      } catch (err) {
        console.error("Orchestrator error:", err);
        setIsLoading(false);
        setCurrentSpeaker(null);
      }
    },
    [config]
  );

  const start = useCallback(() => {
    if (!config) return;

    runningRef.current = true;
    setRunning(true);
    setMessages([]);
    historyRef.current = [{ role: "user", content: config.topic }];
    turnRef.current = 0;
    setTurn(0);

    doTurn("A");
  }, [config, doTurn]);

  const pause = useCallback(() => {
    runningRef.current = false;
    setRunning(false);
  }, []);

  const resume = useCallback(() => {
    if (!config) return;
    runningRef.current = true;
    setRunning(true);

    // Determine next speaker based on last message
    const lastMsg = messages[messages.length - 1];
    const nextSpeaker = lastMsg?.speaker === "A" ? "B" : "A";
    doTurn(nextSpeaker);
  }, [config, messages, doTurn]);

  const reset = useCallback(() => {
    runningRef.current = false;
    setRunning(false);
    setMessages([]);
    setCurrentSpeaker(null);
    setIsLoading(false);
    setTurn(0);
    historyRef.current = [];
    turnRef.current = 0;
  }, []);

  return {
    messages,
    currentSpeaker,
    isLoading,
    turn,
    running,
    start,
    pause,
    resume,
    reset,
  };
}
