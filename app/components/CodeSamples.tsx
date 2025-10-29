const handlerSnippet = `import { createClient } from "@supabase/supabase-js";
import { TelegramClient } from "grammy";

const telegram = new TelegramClient(process.env.BOT_TOKEN!);
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export const config = { runtime: "edge" } as const;

export default async function handler(request: Request) {
  const update = await request.json();

  if (update.message?.text === "/start") {
    await telegram.sendMessage(update.message.chat.id, "Welcome aboard! 🚀");
  }

  if (update.message?.voice) {
    await telegram.sendMessage(update.message.chat.id, "Voice note received. Processing transcription…");
  }

  await supabase.from("events").insert({
    chat_id: update.message?.chat.id,
    payload: update
  });

  return new Response(null, { status: 200 });
}`;

const functionSnippet = `const assistant = await openai.responses.create({
  model: "gpt-4o-mini",
  input: [
    {
      role: "user",
      content: update.message?.text ?? ""
    }
  ],
  tools: [
    {
      type: "function",
      function: {
        name: "create_support_ticket",
        description: "Log a ticket in Linear",
        parameters: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" }
          },
          required: ["title"]
        }
      }
    }
  ]
});

if (assistant.output[0]?.type === "tool_calls") {
  // Execute function call, then reply with result
}`;

export function CodeSamples() {
  return (
    <section>
      <span className="badge">Reference</span>
      <h2>Production-ready snippets</h2>
      <p>
        Wire these fragments into a Vercel Edge Function to receive Telegram updates, orchestrate GPT-4o responses,
        and push telemetry into Supabase.
      </p>
      <div className="card" style={{ marginTop: "1.5rem", display: "grid", gap: "1.4rem" }}>
        <div>
          <strong>Edge webhook handler</strong>
          <pre>
            <code>{handlerSnippet}</code>
          </pre>
        </div>
        <div>
          <strong>Assistant function calling</strong>
          <pre>
            <code>{functionSnippet}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
