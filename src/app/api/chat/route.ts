import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { ChatRequest } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json();
    const { modelId, systemPrompt, history, apiKey } = body;

    if (!apiKey) {
      // Return a mock response if no API key is provided so the user can see the UI working
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return NextResponse.json({ 
        reply: `[Demo Mode] I would normally share a brilliant thought about "${history[0]?.content.substring(0, 20)}..." but I need a Groq API key!` 
      });
    }

    const VALID_MODEL_IDS = [
      "llama-3.1-8b-instant",
      "llama-3.3-70b-versatile",
      "meta-llama/llama-4-scout-17b-16e-instruct",
      "qwen/qwen3-32b",
    ];

    if (!VALID_MODEL_IDS.includes(modelId)) {
      return NextResponse.json(
        { error: `Model "${modelId}" is not supported. Please select a valid model.` },
        { status: 400 }
      );
    }

    const groq = new Groq({ apiKey });

    const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
      { role: "system", content: systemPrompt },
      ...history,
    ];

    const completion = await groq.chat.completions.create({
      model: modelId,
      messages,
      max_tokens: 150,
      temperature: 0.85,
    });

    const reply = completion.choices?.[0]?.message?.content || "...";

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
