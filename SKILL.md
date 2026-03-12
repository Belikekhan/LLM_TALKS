# LLM Talks — Project Skill File

## Project Overview
LLM Talks is a spectator experience where two AI models engage in automated conversations set against a cozy pixel-art campfire scene. Built with Next.js and powered by the Groq API, it allows users to choose models, specific conversation modes (chat, debate, roast, etc.), and topics. The app focuses on high-fidelity pixel aesthetics, smooth CSS-driven animations, and a real-time turn-based "orchestrator" that manages the conversation flow.

## Tech Stack
- **Framework**: Next.js 14.2.35 (App Router)
- **State Management**: Zustand 5.0.11
- **AI SDK**: Groq SDK 1.1.1
- **Styling**: Tailwind CSS 3.4.1 (Utility classes + inline styles for precise pixel control)
- **Language**: TypeScript 5
- **Fonts**: Next.js Google Fonts (Press Start 2P for the pixel aesthetic)

## File Map
- `src/app/page.tsx`                  ← Root redirector, sends users to `/setup`.
- `src/app/setup/page.tsx`            ← Entry point for the setup configuration.
- `src/app/arena/page.tsx`            ← Main campfire scene page; initializes the orchestrator.
- `src/app/api/chat/route.ts`         ← Serverless API route to proxy Groq completions.
- `src/store/conversation.ts`         ← Zustand store for global configuration (models, topic, apiKey).
- `src/lib/orchestrator.ts`           ← Core turn-manager hook; handles the A→B loop and state.
- `src/lib/prompts.ts`                ← System prompt registry and generator.
- `src/lib/models.ts`                 ← Registry of available Groq models with metadata (color, emoji).
- `src/lib/types.ts`                  ← Shared TypeScript interfaces for the entire project.
- `src/components/layout/PixelContainer.tsx` ← Global wrapper for the pixelated viewport.
- `src/components/scene/CampfireScene.tsx` ← Orchestrates all visual elements (Stars, Moon, Sprites).
- `src/components/scene/Campfire.tsx`      ← CSS-animated pixel campfire with layers and embers.
- `src/components/scene/Moon.tsx`          ← Static pixel moon with glow effects.
- `src/components/scene/Stars.tsx`         ← Procedurally generated twinkling star field.
- `src/components/scene/Trees.tsx`         ← Procedurally generated background forest silhouettes.
- `src/components/characters/LLMSprite.tsx` ← Dynamic SVG bot that idles and shakes when talking.
- `src/components/characters/SpeechBubble.tsx` ← Pixel-style bubble with typewriter animation.
- `src/components/ui/HUD.tsx`              ← Top-bar overlay with status and playback controls.
- `src/components/ui/SetupPanel.tsx`       ← Configuration dashboard for selecting models and mode.
- `src/components/ui/Transcript.tsx`       ← Bottom-floating log of the conversation history.

## Data Flow
1. **Selection**: User configures models, mode, and topic in `SetupPanel` → Result is saved to `useConversationStore`.
2. **Navigation**: User clicks "Ignite," routing them to `/arena`.
3. **Initialization**: `ArenaPage` reads config from Zustand and initializes `useOrchestrator(config)`.
4. **Execution Loop**:
    - `useOrchestrator` calls `doTurn("A")`.
    - It fetches `POST /api/chat` with current `modelId`, `systemPrompt`, and `historyRef.current`.
    - `api/chat` calls Groq (or uses Demo Mode mock) and returns a text reply.
    - Orchestrator adds message to `messages` state and updates `historyRef`.
    - Turn persists for a calculated delay (text length * 22ms + 1.5s).
    - `doTurn("B")` is triggered, and the cycle repeats.
5. **Rendering**: `CampfireScene` re-renders based on `messages` and `currentSpeaker`. `LLMSprite` and `SpeechBubble` react to these props with visual states.

## State Management
### Zustand Store (`useConversationStore`)
- `config: ConversationConfig | null` (Default: `null`)
  - `modelA: Model`
  - `modelB: Model`
  - `mode: ConversationMode`
  - `topic: string`
  - `apiKey: string`
- `setConfig(config: ConversationConfig)`: Updates the full config.
- `clearConfig()`: Resets to `null`.

### Orchestrator State (`useOrchestrator`)
- `messages: Message[]`: Array of all turns in the current session.
- `currentSpeaker: "A" | "B" | null`: Who is currently thinking/typing.
- `isLoading: boolean`: Tracks if an API request is pending.
- `turn: number`: Counter for the current turn number.
- `running: boolean`: Flag for pause/resume state.

## API Routes
### `POST /api/chat`
- **Request Body (`ChatRequest`)**:
  - `modelId: string` (e.g., "llama-3.3-70b-versatile")
  - `systemPrompt: string` (Generated via `lib/prompts.ts`)
  - `history: { role, content }[]` (Chat history for context)
  - `apiKey: string` (User's Groq key)
- **Response Shape (`ChatResponse`)**:
  - `reply?: string`: The AI response text.
  - `error?: string`: Error message if it fails.
- **Logic**: If `apiKey` is empty, returns a `[Demo Mode]` mock response to keep the UI functional without environment variables.

## Component Tree
- **CampfireScene**: Main orchestrator component.
  - **Stars**: Randomly generated twinkling dots.
  - **Moon**: Crescent moon with CSS drop-shadow.
  - **Trees**: Forest cluster silhouettes using `clipPath`.
  - **Ground**: CSS gradient with a border top.
  - **LLMSprite (x2)**: Custom SVG robot.
    - Props: `color`, `isTalking`, `side`.
    - State: Internal `filter` and `animation` based on `isTalking`.
  - **SpeechBubble**: Positioned above `LLMSprite`.
    - Props: `text`, `color`, `side`, `isLoading`.
    - Logic: Typewriter effect using `setInterval`.
  - **Campfire**: SVG/CSS multi-layer fire.
  - **HUD**: Play/Pause/Reset buttons + Topic readout.
  - **Transcript**: Autoscrolling list of recent messages.

## Models Registry
Located in `src/lib/models.ts`:
- `llama-3.1-8b-instant`: Fast, blue emoji (🦙).
- `llama-3.3-70b-versatile`: Smart, pink emoji (🚀).
- `meta-llama/llama-4-scout-17b-16e-instruct`: Latest preview, green emoji (🔭).
- `qwen/qwen3-32b`: Reasoning focused, purple emoji (🐉).

## Conversation Modes
Defined in `src/lib/prompts.ts`:
- **chat**: Warm, cozy, 2-3 sentences.
- **debate**: Sharp, confrontational, counters arguments.
- **collab**: Brainstorming, builds on ideas enthusiastically.
- **roast**: Witty, playful, 1-2 punchy jokes.

## Animation System
Stored within components using `<style jsx>`:
- `flickerOuter / flickerMid / flickerInner`: Flame scaling/translation in `Campfire.tsx`.
- `ember`: Rising particles in `Campfire.tsx`.
- `glowPulse`: Fire ground glow in `Campfire.tsx`.
- `twinkle`: Star opacity cycle in `Stars.tsx`.
- `idleBob`: Subtle vertical movement for idling bots in `LLMSprite.tsx`.
- `talkShake`: Aggressive jitter while speaking in `LLMSprite.tsx`.
- `bubbleAppear`: Pop-in scale animation in `SpeechBubble.tsx`.
- `dotBounce`: Loading ellipsis for active speaker in `SpeechBubble.tsx`.
- `titleGlow`: Pulsing text shadow in `SetupPanel.tsx`.

## Known Issues & Gotchas
- **Stale Closures**: The `useOrchestrator` uses `runningRef` and `historyRef` because `useEffect` and `useCallback` captures stale state during long async loops. **DO NOT** convert these to pure `useState`.
- **Next.js Font Loading**: `Press Start 2P` is loaded via `next/font/google` and injected as a CSS variable `--font-pixel`.
- **Groq Supports**: The models in the registry must match the IDs in `src/app/api/chat/route.ts` or the API will return a 400.

## Common Tasks (How-To)
### Adding a New Model
1. Open `src/lib/models.ts`.
2. Add a new object to the `MODELS` array with a unique `id`, `color`, and `emoji`.
3. Open `src/app/api/chat/route.ts` and add the model ID to `VALID_MODEL_IDS`.

### Adding a New Mode
1. Open `src/lib/types.ts` and add the mode name to the `ConversationMode` union.
2. Open `src/lib/prompts.ts` and add its specific system instructions to `MODE_INSTRUCTIONS`.
3. Open `src/components/ui/SetupPanel.tsx` and add it to the `MODES` array for it to appear in UI.

### Changing Timing/Pacing
1. Open `src/lib/orchestrator.ts`.
2. Modify the `delay` calculation (Line 84). The current formula is `replyText.length * 22 + 1500`.

### Modifying the Speech Bubble
1. Open `src/components/characters/SpeechBubble.tsx`.
2. Change the typewriter speed in the `setInterval` (currently `22ms`).
3. Edit the pixel border or background color in the styled `div`.

## Environment & Setup
1. Clone the repo.
2. Run `npm install`.
3. (Optional) Create a `.env.local` with `GROQ_API_KEY`, or paste your key directly into the UI at runtime.
4. Run `npm run dev`.
5. Navigate to `http://localhost:3000`.

## What NOT to change
- **`historyRef` and `runningRef`**: These must remain `useRef` to avoid re-rendering loops and stale closure bugs in the orchestrator.
- **Client-side API Key**: The app allows passing the API key from the UI to the API route to support a "bring your own key" experience — do not hard-rely on process environment variables.
- **CSS-only visuals**: The campfire and scene are intentionally built with CSS animations and simple SVGs to maintain a lightweight, pixel-perfect 60FPS feel without canvas overhead.
