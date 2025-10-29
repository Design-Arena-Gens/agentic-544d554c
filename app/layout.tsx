import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Telegram Bot Architect",
  description: "Interactive guide for designing and launching production-ready Telegram bots.",
  metadataBase: new URL("https://agentic-544d554c.vercel.app")
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
