"use client";

import { useMemo, useState } from "react";

type GoalKey = "automation" | "support" | "commerce" | "community" | "ai";

type SelectionState = {
  goal: GoalKey;
  integrations: string[];
  features: string[];
  aiAssist: boolean;
};

const GOALS: Record<GoalKey, { title: string; description: string; stack: string[] }> = {
  automation: {
    title: "Workflow Automation",
    description: "Trigger actions inside internal tools or SaaS platforms from chat commands.",
    stack: ["Telegram Bot API", "Supabase Functions", "Zapier/Make", "Cron Jobs"]
  },
  support: {
    title: "Customer Support",
    description: "Route customer questions, surface knowledge base answers, and escalate to humans.",
    stack: ["Telegram Bot API", "OpenAI Assistants", "Supabase Auth", "Notion API"]
  },
  commerce: {
    title: "Commerce & Payments",
    description: "Sell products, take deposits, or gate digital content with native payments.",
    stack: ["Telegram Payments", "Stripe", "PostgreSQL", "Webhook Handlers"]
  },
  community: {
    title: "Community Management",
    description: "Moderate groups, onboard members, and broadcast updates automatically.",
    stack: ["Telegram Bot API", "Supabase Realtime", "Open Source Moderation Models", "KV Cache"]
  },
  ai: {
    title: "AI Copilot",
    description: "Conversational assistant with retrieval augmented generation and memory.",
    stack: ["OpenAI Responses API", "Vector Store", "Function Calling", "LangChain"]
  }
};

const INTEGRATIONS = [
  "Google Sheets",
  "Airtable",
  "HubSpot",
  "Slack",
  "Discord",
  "GitHub",
  "Linear",
  "Jira"
];

const FEATURE_PRESETS = [
  { id: "scheduler", label: "Cron scheduler", description: "Schedule proactive digests & check-ins." },
  { id: "analytics", label: "Analytics dashboard", description: "Track usage, retention, and command success." },
  { id: "multi-lang", label: "Multi-language", description: "Localize commands & replies." },
  { id: "rls", label: "Role-based access", description: "Different capabilities for admins vs members." },
  { id: "files", label: "File uploads", description: "Ingest PDFs, docs, or voice notes." }
];

const AI_STACK = [
  {
    title: "RAG Builder",
    description: "Use Supabase pgvector to store embeddings and LangChain to orchestrate retrieval.",
    stack: ["Supabase Database", "pgvector", "OpenAI Embeddings", "LangChain"]
  },
  {
    title: "Function Calling",
    description: "Expose deterministic actions to the assistant for structured operations.",
    stack: ["OpenAI Functions", "Supabase Edge Functions", "Zod Schemas"]
  },
  {
    title: "Memory",
    description: "Persist short and long-term context for each chat via Supabase tables.",
    stack: ["Temporal Table", "Trigger Functions", "TTL Policies"]
  }
];

const buildBlueprint = (state: SelectionState) => {
  const goal = GOALS[state.goal];
  const integrationText = state.integrations.length
    ? `Wire up ${state.integrations.join(", ")}`
    : "Start with native Telegram commands";

  return {
    hero: `${goal.title} bot blueprint`.
      concat(state.aiAssist ? " powered by GPT-4o." : "."),
    summary: goal.description,
    stack: goal.stack,
    integrationText,
    features: FEATURE_PRESETS.filter((preset) => state.features.includes(preset.id)),
    steps: [
      "Create bot token via @BotFather and store inside a secure secrets manager.",
      "Provision a Supabase project for persistence, webhooks, and auth.",
      state.aiAssist
        ? "Ship an Edge Function that proxies Telegram updates to an OpenAI assistant with safety filters."
        : "Implement webhook handlers that process commands and dispatch actions to your integrations.",
      state.integrations.length
        ? "Connect external SaaS APIs with robust retry logic and structured logging."
        : "Keep the scope focused on core conversational flows before expanding integrations.",
      "Instrument metrics (command latency, user retention) and set up CI with automated regression tests."
    ]
  };
};

export function BotPlanner() {
  const [state, setState] = useState<SelectionState>({
    goal: "automation",
    integrations: ["Google Sheets"],
    features: ["scheduler"],
    aiAssist: true
  });

  const blueprint = useMemo(() => buildBlueprint(state), [state]);

  const toggleIntegration = (name: string) => {
    setState((curr) => ({
      ...curr,
      integrations: curr.integrations.includes(name)
        ? curr.integrations.filter((item) => item !== name)
        : [...curr.integrations, name]
    }));
  };

  const toggleFeature = (id: string) => {
    setState((curr) => ({
      ...curr,
      features: curr.features.includes(id)
        ? curr.features.filter((item) => item !== id)
        : [...curr.features, id]
    }));
  };

  return (
    <section>
      <span className="badge">Blueprint Generator</span>
      <h2>Design your Telegram bot architecture</h2>
      <p>
        Dial in your use-case and instantly map the stack, integrations, and launch actions so you can move from
        idea to production fast.
      </p>

      <div className="card-grid" style={{ marginTop: "2.5rem" }}>
        <article className="card guide-card">
          <header>
            <h3>Primary mission</h3>
            <p>Select the business outcome that best matches your goals.</p>
          </header>
          <div className="card-grid" style={{ gap: "0.8rem", marginTop: "1.2rem" }}>
            {Object.entries(GOALS).map(([key, goal]) => (
              <button
                key={key}
                type="button"
                className="cta"
                style={{
                  background:
                    state.goal === key
                      ? "linear-gradient(135deg, var(--accent) 0%, var(--success) 100%)"
                      : "rgba(255, 255, 255, 0.04)",
                  border: state.goal === key ? "none" : "1px solid rgba(255, 255, 255, 0.08)",
                  color: state.goal === key ? "var(--foreground)" : "var(--text-muted)",
                  boxShadow: state.goal === key ? "0 10px 25px rgba(35, 166, 213, 0.25)" : "none",
                  padding: "0.7rem 1.4rem",
                  borderRadius: "12px",
                  width: "100%",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
                onClick={() => setState((curr) => ({ ...curr, goal: key as GoalKey }))}
              >
                <strong>{goal.title}</strong>
                <br />
                <span style={{ fontSize: "0.85rem" }}>{goal.description}</span>
              </button>
            ))}
          </div>
        </article>

        <article className="card guide-card">
          <header>
            <h3>Integrations</h3>
            <p>Pick the systems to orchestrate from Telegram. We will auto-generate binding guidance.</p>
          </header>
          <div className="card-grid" style={{ gap: "0.8rem", marginTop: "1.2rem" }}>
            {INTEGRATIONS.map((name) => {
              const active = state.integrations.includes(name);
              return (
                <button
                  key={name}
                  type="button"
                  className="cta"
                  style={{
                    background: active ? "var(--accent-soft)" : "rgba(255, 255, 255, 0.04)",
                    border: active ? "1px solid var(--accent)" : "1px solid rgba(255, 255, 255, 0.06)",
                    color: active ? "var(--accent)" : "var(--text-muted)",
                    padding: "0.6rem 1rem",
                    borderRadius: "999px",
                    width: "fit-content",
                    transition: "all 0.2s ease",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    boxShadow: active ? "0 8px 20px rgba(35, 166, 213, 0.15)" : "none"
                  }}
                  onClick={() => toggleIntegration(name)}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </article>

        <article className="card guide-card">
          <header>
            <h3>Advanced feature kit</h3>
            <p>Layer on capabilities that separate a hobby project from a production-ready bot.</p>
          </header>
          <div style={{ display: "grid", gap: "0.9rem", marginTop: "1.2rem" }}>
            {FEATURE_PRESETS.map((preset) => {
              const active = state.features.includes(preset.id);
              return (
                <label
                  key={preset.id}
                  style={{
                    display: "grid",
                    gap: "0.35rem",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: active ? "1px solid rgba(33, 193, 150, 0.65)" : "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "14px",
                    padding: "0.9rem 1.2rem"
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={() => toggleFeature(preset.id)}
                      style={{ width: "1.1rem", height: "1.1rem" }}
                    />
                    <strong>{preset.label}</strong>
                  </span>
                  <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>{preset.description}</span>
                </label>
              );
            })}
          </div>
        </article>

        <article className="card guide-card">
          <header>
            <h3>AI copilots</h3>
            <p>Decide if your bot should reason with GPT-4o, call functions, or remain deterministic.</p>
          </header>
          <label style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginTop: "1.2rem" }}>
            <input
              type="checkbox"
              checked={state.aiAssist}
              onChange={(event) => setState((curr) => ({ ...curr, aiAssist: event.target.checked }))}
              style={{ width: "1.1rem", height: "1.1rem" }}
            />
            <span style={{ fontSize: "0.95rem" }}>
              Enable GPT-4o automation with function calling, fallback flows, and safety filters.
            </span>
          </label>
          {state.aiAssist && (
            <div className="card" style={{ marginTop: "1.5rem" }}>
              <h4 style={{ fontSize: "1.1rem" }}>AI stack guidance</h4>
              <div style={{ display: "grid", gap: "0.8rem", marginTop: "0.9rem" }}>
                {AI_STACK.map((block) => (
                  <div key={block.title} style={{ display: "grid", gap: "0.4rem" }}>
                    <strong>{block.title}</strong>
                    <p style={{ fontSize: "0.9rem" }}>{block.description}</p>
                    <span style={{ fontSize: "0.85rem", color: "var(--accent)" }}>
                      {block.stack.join(" · ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>

      <article className="card" style={{ marginTop: "2.5rem", display: "grid", gap: "1rem" }}>
        <header>
          <span className="badge">Blueprint</span>
          <h3>{blueprint.hero}</h3>
        </header>
        <p>{blueprint.summary}</p>
        <div>
          <strong>Stack focus</strong>
          <p style={{ marginTop: "0.35rem" }}>{blueprint.stack.join(" · ")}</p>
        </div>
        <div>
          <strong>Integrations</strong>
          <p style={{ marginTop: "0.35rem" }}>{blueprint.integrationText}</p>
        </div>
        {blueprint.features.length > 0 && (
          <div>
            <strong>Differentiators</strong>
            <ul style={{ marginTop: "0.6rem", display: "grid", gap: "0.4rem", paddingLeft: "1.1rem" }}>
              {blueprint.features.map((feature) => (
                <li key={feature.id}>
                  <strong>{feature.label}:</strong> <span>{feature.description}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <strong>Execution roadmap</strong>
          <ol className="checklist">
            {blueprint.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </article>
    </section>
  );
}
