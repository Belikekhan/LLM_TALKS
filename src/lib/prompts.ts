import { Model, ConversationMode } from "./types";

const MODE_INSTRUCTIONS: Record<ConversationMode, string> = {
  chat: `You are having a cozy, casual conversation. Use a warm, friendly tone. Keep your responses to 2-3 sentences. Be genuine and relatable.`,
  debate: `You are in a debate. Take a clear position and directly counter the other speaker's arguments. Be sharp but respectful. Keep responses to 2-3 punchy sentences.`,
  collab: `You are brainstorming together. Build enthusiastically on what the other speaker said. Add new angles and ideas. Keep it to 2-3 excited sentences.`,
  roast: `You are in a playful roast battle. Be witty and deliver 1-2 punchy, funny sentences. Keep it lighthearted and fun — no mean-spirited jabs.`,
};

export function getSystemPrompt(
  model: Model,
  otherModel: Model,
  mode: ConversationMode,
  topic: string
): string {
  return `You are ${model.name} (${model.emoji}), an AI having a conversation with ${otherModel.name} (${otherModel.emoji}).

The topic is: "${topic}"

${MODE_INSTRUCTIONS[mode]}

IMPORTANT RULES:
- You are ${model.name}. Never pretend to be ${otherModel.name}.
- Respond directly to the last thing said.
- Keep responses SHORT — 2-3 sentences maximum at a conversational pace.
- Do NOT use labels like "${model.name}:" or any prefix before your response.
- Be natural, opinionated, and engaging. No generic filler.`;
}
