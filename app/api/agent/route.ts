import { NextResponse } from "next/server";

type AgentRequest = {
  message?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AgentRequest;

    if (!body.message || body.message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY environment variable." },
        { status: 500 }
      );
    }

    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
    const systemPrompt =
      "You are a coding AI agent. Provide clear, actionable steps, " +
      "include code blocks when helpful, and verify assumptions. " +
      "If a request is ambiguous, ask clarifying questions.";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: body.message }
        ]
      })
    });

    if (!response.ok) {
      const errorPayload = await response.json();
      return NextResponse.json(
        { error: errorPayload?.error?.message || "OpenAI request failed." },
        { status: response.status }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json(
        { error: "No response received from the model." },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
