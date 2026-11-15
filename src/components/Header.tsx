"use client";

import React from "react";
import { ShieldCheck, Cpu, Database, Activity, Sparkles, BookOpen } from "lucide-react";

interface HeaderProps {
  engineName: string;
  onOpenRagModal: () => void;
  disputeCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  engineName,
  onOpenRagModal,
  disputeCount,
}) => {
  const isLive = engineName.includes("GEMINI") || engineName.includes("OPENAI");

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
      {/* Top Engineering Alert Banner */}
      <div className="bg-gradient-to-r from-blue-900/80 via-slate-900 to-indigo-900/80 px-4 py-1.5 text-xs text-slate-300 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-white tracking-wide">
            FINTECH SWE ARCHITECTURE SPEC:
          </span>
          <span className="text-slate-300 hidden sm:inline">
            Zero-Cold-Start In-Memory Vector RAG • Anti-Hallucination Policy Grounding • PayPal Merchant Protection Standard
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-slate-400">Queue: <strong className="text-white">{disputeCount} Active Cases</strong></span>
          <span className="bg-blue-950 text-blue-300 border border-blue-700/50 px-2 py-0.5 rounded font-mono">
            SLA: &lt; 250ms
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0070BA] to-[#003087] shadow-lg shadow-blue-900/30 ring-1 ring-blue-400/30">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-white tracking-tight">PayPal</span>
              <span className="text-xs font-mono font-semibold px-1.5 py-0.5 rounded bg-blue-500/20 text-sky-400 border border-blue-500/30">
                ResolvAI™
              </span>
              <span className="text-[11px] text-slate-400 font-mono hidden md:inline">
                v2.4-agentic
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Autonomous Merchant Dispute & Chargeback Defense Ops
            </p>
          </div>
        </div>

        {/* Engine Status & Knowledge Base Button */}
        <div className="flex items-center gap-3">
          {/* RAG Knowledge Base Inspector Button */}
          <button
            onClick={onOpenRagModal}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-slate-600 hover:bg-slate-700/80 transition-all shadow-sm"
          >
            <BookOpen className="h-3.5 w-3.5 text-sky-400" />
            <span className="hidden sm:inline">Inspect</span> RAG Policies
          </button>

          {/* Engine Mode Pill */}
          <div className="flex items-center gap-2 rounded-lg border border-slate-700/70 bg-slate-800/60 px-3 py-1.5 text-xs">
            <Cpu className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-slate-400 hidden sm:inline">Engine:</span>
            {isLive ? (
              <span className="flex items-center gap-1 font-semibold text-emerald-400">
                <Sparkles className="h-3 w-3" /> Gemini 2.5 Flash
              </span>
            ) : (
              <span className="flex items-center gap-1 font-semibold text-sky-300" title="Deterministic rule-based + reasoning engine guarantees 100% uptime for recruiter demos">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400"></span>
                Deterministic Fintech Engine
              </span>
            )}
          </div>

          {/* In-Memory Vector DB Status */}
          <div className="hidden lg:flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-400 font-mono">
            <Database className="h-3.5 w-3.5 text-purple-400" />
            <span>Vector RAG: 10 Policies Pre-Seeded</span>
          </div>
        </div>
      </div>
    </header>
  );
};
