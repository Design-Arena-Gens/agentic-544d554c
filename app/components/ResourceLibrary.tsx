const resources = [
  {
    title: "Telegram Bot API Basics",
    description: "Understand updates, commands, webhooks, and keyboards with official documentation.",
    href: "https://core.telegram.org/bots/api",
    type: "Docs"
  },
  {
    title: "Supabase Edge Functions",
    description: "Deploy resilient webhook handlers close to Telegram with Deno runtime.",
    href: "https://supabase.com/docs/guides/functions",
    type: "Guide"
  },
  {
    title: "OpenAI Responses API",
    description: "Power conversational bots with GPT-4o and function calling patterns.",
    href: "https://platform.openai.com/docs/guides/responses",
    type: "Guide"
  },
  {
    title: "Telegram Payments",
    description: "Sell products with secure payment flows, provider selection, and receipts.",
    href: "https://core.telegram.org/bots/payments",
    type: "Docs"
  },
  {
    title: "Inline Keyboard UX Patterns",
    description: "Best practices for creating multi-step flows without overwhelming the chat.",
    href: "https://core.telegram.org/bots/features#inline-keyboards-and-on-the-fly-updating",
    type: "Patterns"
  },
  {
    title: "Testing Telegram Bots",
    description: "Mock updates, orchestrate synthetic users, and enforce contract tests.",
    href: "https://github.com/grammyjs/runner",
    type: "Open Source"
  }
];

export function ResourceLibrary() {
  return (
    <section>
      <span className="badge">Resources</span>
      <h2>Curated learning vault</h2>
      <div className="card-grid">
        {resources.map((resource) => (
          <a key={resource.href} className="card guide-card" href={resource.href} target="_blank" rel="noreferrer">
            <span style={{ color: "var(--accent)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {resource.type}
            </span>
            <strong style={{ fontSize: "1.1rem" }}>{resource.title}</strong>
            <p>{resource.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
