export interface Model {
  id: string;
  name: string;
  color: string;
  emoji: string;
  provider: "groq";
  description?: string;
}

export type ConversationMode = "chat" | "debate" | "collab" | "roast";

export interface Message {
  id: string;
  speaker: "A" | "B";
  model: Model;
  text: string;
  timestamp: Date;
}

export interface ConversationConfig {
  modelA: Model;
  modelB: Model;
  mode: ConversationMode;
  topic: string;
  apiKey: string;
}

export interface ChatRequest {
  modelId: string;
  systemPrompt: string;
  history: { role: "user" | "assistant"; content: string }[];
  apiKey: string;
}

export interface ChatResponse {
  reply?: string;
  error?: string;
}
