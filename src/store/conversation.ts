import { create } from "zustand";
import { ConversationConfig } from "@/lib/types";

interface ConversationStore {
  config: ConversationConfig | null;
  setConfig: (config: ConversationConfig) => void;
  clearConfig: () => void;
}

export const useConversationStore = create<ConversationStore>((set) => ({
  config: null,
  setConfig: (config) => set({ config }),
  clearConfig: () => set({ config: null }),
}));
