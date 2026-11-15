import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PayPal ResolvAI™ | Enterprise Agentic Dispute & Chargeback Resolver",
  description:
    "Autonomous Multi-Agent Dispute Resolution & Risk Decisioning Platform with In-Memory Vector RAG and Zero-Hallucination Guardrails.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-sky-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
