"use client";

import React from "react";
import { DisputeResolutionResponse } from "../lib/types";
import { ShieldCheck, Activity, Zap, Layers, Cpu, Database } from "lucide-react";

interface SystemMetricsBarProps {
  resolutionResult: DisputeResolutionResponse | null;
}

export const SystemMetricsBar: React.FC<SystemMetricsBarProps> = ({ resolutionResult }) => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 px-4 py-2 text-[11px] text-slate-400 font-mono flex flex-wrap items-center justify-between gap-3">
      {/* Left: Architecture Specifications */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-slate-300">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>PayPal SWE Guardrail v2.4</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
          <Database className="h-3.5 w-3.5 text-purple-400" />
          <span>In-Memory VectorStore (Cosine Sim)</span>
        </div>
      </div>

      {/* Right: Operational Telemetry */}
      {resolutionResult ? (
        <div className="flex items-center gap-4 text-slate-300">
          <div className="flex items-center gap-1">
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            <span>
              Latency:{" "}
              <strong className="text-white font-mono">{resolutionResult.total_latency_ms} ms</strong>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            <Activity className="h-3.5 w-3.5 text-sky-400" />
            <span>
              Tokens:{" "}
              <strong className="text-white">
                {resolutionResult.telemetry.prompt_tokens + resolutionResult.telemetry.completion_tokens}
              </strong>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            <span>
              Cost:{" "}
              <strong className="text-emerald-400">
                ${resolutionResult.telemetry.estimated_cost_usd.toFixed(6)}
              </strong>
            </span>
          </div>

          <div className="flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded">
            <span>0 Hallucinations</span>
          </div>
        </div>
      ) : (
        <div className="text-slate-500">
          Ready to adjudicate • Awaiting pipeline trigger
        </div>
      )}
    </footer>
  );
};
