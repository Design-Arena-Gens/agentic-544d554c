import { BotPlanner } from "./components/BotPlanner";
import { CodeSamples } from "./components/CodeSamples";
import { LaunchChecklist } from "./components/LaunchChecklist";
import { ResourceLibrary } from "./components/ResourceLibrary";

export default function Page() {
  return (
    <main>
      <header style={{ display: "grid", gap: "1.5rem" }}>
        <div className="badge">Telegram Bots · Supabase · OpenAI</div>
        <h1 style={{ fontSize: "3.1rem", maxWidth: "820px" }}>
          Launch Telegram bots that feel handcrafted and scale like your SaaS backend
        </h1>
        <p style={{ maxWidth: "720px" }}>
          Mix deterministic workflows with AI copilots, secure integrations, and a production-grade launch
          checklist. Built for teams that want reliable chat automation from day one.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <a
            className="cta"
            style={{ textAlign: "center", textDecoration: "none" }}
            href="https://core.telegram.org/bots"
            target="_blank"
            rel="noreferrer"
          >
            Explore Telegram docs
          </a>
          <a
            className="cta"
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              color: "var(--text-muted)",
              textAlign: "center",
              textDecoration: "none"
            }}
            href="https://supabase.com/docs"
            target="_blank"
            rel="noreferrer"
          >
            Supabase playbooks
          </a>
        </div>
      </header>

      <BotPlanner />
      <CodeSamples />
      <LaunchChecklist />
      <ResourceLibrary />
    </main>
  );
}
