"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useConversationStore } from "@/store/conversation";
import { useOrchestrator } from "@/lib/orchestrator";
import CampfireScene from "@/components/scene/CampfireScene";

export default function ArenaPage() {
  const router = useRouter();
  const config = useConversationStore((s) => s.config);
  const clearConfig = useConversationStore((s) => s.clearConfig);
  const { messages, currentSpeaker, isLoading, turn, running, start, pause, resume, reset } =
    useOrchestrator(config);

  // Redirect if no config
  useEffect(() => {
    if (!config) {
      router.push("/setup");
    }
  }, [config, router]);

  // Auto-start on mount
  useEffect(() => {
    if (config && !running && messages.length === 0) {
      start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  const handleReset = () => {
    reset();
    clearConfig();
    router.push("/setup");
  };

  if (!config) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a1a",
          color: "#8a7a6a",
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "10px",
        }}
      >
        Redirecting to setup...
      </div>
    );
  }

  return (
    <CampfireScene
      config={config}
      messages={messages}
      currentSpeaker={currentSpeaker}
      isLoading={isLoading}
      turn={turn}
      running={running}
      onPause={pause}
      onResume={resume}
      onReset={handleReset}
    />
  );
}
