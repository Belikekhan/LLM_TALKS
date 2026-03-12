import { Model } from "./types";

export const MODELS: Model[] = [
  {
    id: "llama-3.1-8b-instant",
    name: "Llama 3.1",
    color: "#4fc3f7",
    emoji: "🦙",
    provider: "groq",
    description: "Fast & efficient"
  },
  {
    id: "llama-3.3-70b-versatile",
    name: "Llama 3.3",
    color: "#f48fb1",
    emoji: "🚀",
    provider: "groq",
    description: "Smart & capable"
  },
  {
    id: "meta-llama/llama-4-scout-17b-16e-instruct",
    name: "Llama 4 Scout",
    color: "#a5d6a7",
    emoji: "🔭",
    provider: "groq",
    description: "Latest & fastest"
  },
  {
    id: "qwen/qwen3-32b",
    name: "Qwen 3",
    color: "#ce93d8",
    emoji: "🐉",
    provider: "groq",
    description: "Reasoning focused"
  },
];
