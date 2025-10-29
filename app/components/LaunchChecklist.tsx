const checklist = [
  {
    title: "Secure bot identity",
    items: [
      "Create bot via @BotFather with `/newbot` and store API token in Vercel environment variables.",
      "Add a high-res profile picture & description so users trust the bot.",
      "Enable privacy mode if you plan to operate inside groups."
    ]
  },
  {
    title: "Wire backend infrastructure",
    items: [
      "Create a Supabase project, enable RLS, and generate service role key.",
      "Deploy an Edge Function webhook to receive Telegram updates reliably.",
      "Implement retryable outbound calls to Telegram with exponential backoff."
    ]
  },
  {
    title: "Quality and safety",
    items: [
      "Write integration tests that mock Telegram updates and expected actions.",
      "Log structured events with correlation IDs for every request.",
      "Add content filters and maximum rate limits for untrusted commands."
    ]
  },
  {
    title: "Launch & iterate",
    items: [
      "Set up observability with Supabase Logs + Vercel Monitoring.",
      "Ship staged rollouts with feature flags backed by Supabase config tables.",
      "Collect user feedback inside Telegram using inline keyboards."
    ]
  }
];

export function LaunchChecklist() {
  return (
    <section>
      <span className="badge">Launch Checklist</span>
      <h2>Production readiness playbook</h2>
      <div className="card-grid">
        {checklist.map((block) => (
          <article key={block.title} className="card guide-card">
            <h3>{block.title}</h3>
            <ul style={{ marginTop: "0.8rem", display: "grid", gap: "0.6rem", paddingLeft: "1.1rem" }}>
              {block.items.map((item) => (
                <li key={item} style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
