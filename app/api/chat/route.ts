import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText, convertToModelMessages } from "ai";

export const maxDuration = 30;

const systemMessage = `test-1`;

export async function POST(req: Request) {
  const { messages, model } = await req.json();
  
  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY!,
  });

  const result = streamText({
    model: openrouter(model || "openai/gpt-4o"),
    messages: convertToModelMessages(messages),
    system: systemMessage,
  });

  return result.toTextStreamResponse();
}
