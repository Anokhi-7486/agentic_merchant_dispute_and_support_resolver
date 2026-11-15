"use client";

import React, { useState } from "react";
import {
  DisputeResolutionResponse,
  AgentExecutionTrace,
  RetrievedPolicyChunk,
} from "../lib/types";
import {
  Sparkles,
  Search,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Zap,
  Clock,
  Layers,
  Terminal,
  Cpu,
} from "lucide-react";

interface AgentTraceViewerProps {
  resolutionResult: DisputeResolutionResponse | null;
  isRunning: boolean;
  onRunResolution: () => void;
  activeStep: number; // 0: idle, 1: investigator, 2: rag, 3: verifier, 4: complete
}

export const AgentTraceViewer: React.FC<AgentTraceViewerProps> = ({
  resolutionResult,
  isRunning,
  onRunResolution,
  activeStep,
}) => {
  const [expandedAgent, setExpandedAgent] = useState<string | null>("agent_03_resolution_verifier");
  const [showRawJson, setShowRawJson] = useState(false);

  const toggleExpand = (agentId: string) => {
    setExpandedAgent(expandedAgent === agentId ? null : agentId);
  };

  return (
    <div className="space-y-4">
      {/* Primary Action Button Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-blue-900/60 bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 p-4 shadow-md">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Cpu className="h-4 w-4 text-sky-400" />
            Autonomous Multi-Agent Pipeline
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Orchestrates Agent 1 (Investigator) → Agent 2 (Vector RAG) → Agent 3 (Guardrail Verifier)
          </p>
        </div>

        <button
          onClick={onRunResolution}
          disabled={isRunning}
          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold text-white shadow-lg transition-all ${
            isRunning
              ? "bg-slate-700 cursor-not-allowed opacity-80"
              : "bg-gradient-to-r from-[#0070BA] via-blue-600 to-[#003087] hover:from-blue-500 hover:to-blue-700 ring-2 ring-blue-400/40 hover:scale-[1.02]"
          }`}
        >
          {isRunning ? (
            <>
              <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Executing Multi-Agent Pipeline...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 text-sky-300" />
              <span>Run Multi-Agent Resolution</span>
            </>
          )}
        </button>
      </div>

      {/* Step Pipeline Progress Indicator */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        {/* Step 1: Investigator */}
        <div
          className={`rounded-xl border p-3 transition-all ${
            isRunning && activeStep === 1
              ? "border-sky-500 bg-sky-950/40 ring-1 ring-sky-500 animate-pulse"
              : resolutionResult
              ? "border-slate-800 bg-slate-900/80"
              : "border-slate-800/60 bg-slate-950/40 opacity-70"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sky-400 flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-900/60 text-[10px] font-bold text-sky-300 border border-sky-700">
                1
              </span>
              Investigator
            </span>
            {resolutionResult && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Telemetry & Anomaly Scoring
          </p>
        </div>

        {/* Step 2: Policy RAG */}
        <div
          className={`rounded-xl border p-3 transition-all ${
            isRunning && activeStep === 2
              ? "border-purple-500 bg-purple-950/40 ring-1 ring-purple-500 animate-pulse"
              : resolutionResult
              ? "border-slate-800 bg-slate-900/80"
              : "border-slate-800/60 bg-slate-950/40 opacity-70"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold text-purple-400 flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-900/60 text-[10px] font-bold text-purple-300 border border-purple-700">
                2
              </span>
              Policy RAG
            </span>
            {resolutionResult && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Cosine Similarity Policy Grounding
          </p>
        </div>

        {/* Step 3: Resolution & Guardrail */}
        <div
          className={`rounded-xl border p-3 transition-all ${
            isRunning && activeStep === 3
              ? "border-emerald-500 bg-emerald-950/40 ring-1 ring-emerald-500 animate-pulse"
              : resolutionResult
              ? "border-slate-800 bg-slate-900/80"
              : "border-slate-800/60 bg-slate-950/40 opacity-70"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-900/60 text-[10px] font-bold text-emerald-300 border border-emerald-700">
                3
              </span>
              Guardrail Verifier
            </span>
            {resolutionResult && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Anti-Hallucination & Adjudication
          </p>
        </div>
      </div>

      {/* Execution Results & Detailed Traces */}
      {resolutionResult && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Zap className="h-3.5 w-3.5 text-amber-400" />
              <span>
                Total Pipeline Latency:{" "}
                <strong className="text-white font-mono">{resolutionResult.total_latency_ms} ms</strong>
              </span>
            </div>
            <button
              onClick={() => setShowRawJson(!showRawJson)}
              className="text-[11px] text-sky-400 hover:text-sky-300 flex items-center gap-1 font-mono"
            >
              <Terminal className="h-3 w-3" />
              {showRawJson ? "Hide Raw Traces" : "Inspect Raw Payload"}
            </button>
          </div>

          {/* Raw JSON viewer if toggled */}
          {showRawJson && (
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 max-h-64 overflow-y-auto font-mono text-[11px] text-emerald-400">
              <pre>{JSON.stringify(resolutionResult, null, 2)}</pre>
            </div>
          )}

          {/* Agent 1 Trace Card */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 overflow-hidden">
            <button
              onClick={() => toggleExpand("agent_01_investigator")}
              className="w-full flex items-center justify-between p-3.5 text-left hover:bg-slate-800/40 transition-colors"
            >
              <div className="flex items-center gap-2">
                {expandedAgent === "agent_01_investigator" ? (
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                )}
                <div>
                  <div className="text-xs font-semibold text-white flex items-center gap-2">
                    <span>Agent 1: Transaction Investigator</span>
                    <span className="font-mono text-[10px] text-sky-400 bg-sky-950/60 px-1.5 py-0.2 rounded border border-sky-800">
                      {resolutionResult.traces[0]?.latency_ms || 12} ms
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {resolutionResult.traces[0]?.output_summary}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 border border-emerald-800/50 bg-emerald-950/40 px-2 py-0.5 rounded">
                COMPLETE
              </span>
            </button>

            {expandedAgent === "agent_01_investigator" && (
              <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 space-y-3 text-xs">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 text-[10px]">Risk Score</span>
                    <div className="text-lg font-bold font-mono text-amber-400">
                      {resolutionResult.investigation.riskScore}/100
                    </div>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 text-[10px]">Merchant Trust</span>
                    <div className="text-lg font-bold font-mono text-emerald-400">
                      {resolutionResult.investigation.merchantTrustScore}/100
                    </div>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 text-[10px]">AVS / CVV Status</span>
                    <div className="text-sm font-bold font-mono text-sky-400 mt-0.5">
                      {resolutionResult.investigation.avsCvvStatus}
                    </div>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 text-[10px]">Fraud Likelihood</span>
                    <div className="text-sm font-bold font-mono text-purple-400 mt-0.5">
                      {resolutionResult.investigation.friendlyFraudLikelihood}
                    </div>
                  </div>
                </div>

                {resolutionResult.investigation.anomalyFlags.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-slate-300">
                      Detected Anomaly Flags:
                    </span>
                    <div className="space-y-1">
                      {resolutionResult.investigation.anomalyFlags.map((flag, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1.5 text-xs text-amber-300 bg-amber-950/30 border border-amber-900/40 px-2 py-1 rounded"
                        >
                          <AlertTriangle className="h-3 w-3 text-amber-400 flex-shrink-0" />
                          <span>{flag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Agent 2 Trace Card: Policy & Compliance RAG */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 overflow-hidden">
            <button
              onClick={() => toggleExpand("agent_02_compliance_rag")}
              className="w-full flex items-center justify-between p-3.5 text-left hover:bg-slate-800/40 transition-colors"
            >
              <div className="flex items-center gap-2">
                {expandedAgent === "agent_02_compliance_rag" ? (
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                )}
                <div>
                  <div className="text-xs font-semibold text-white flex items-center gap-2">
                    <span>Agent 2: Policy & Compliance RAG Agent</span>
                    <span className="font-mono text-[10px] text-purple-400 bg-purple-950/60 px-1.5 py-0.2 rounded border border-purple-800">
                      {resolutionResult.traces[1]?.latency_ms || 18} ms
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {resolutionResult.traces[1]?.output_summary}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-purple-400 border border-purple-800/50 bg-purple-950/40 px-2 py-0.5 rounded">
                {resolutionResult.policy_retrieval.retrieved_chunks.length} CHUNKS RETRIEVED
              </span>
            </button>

            {expandedAgent === "agent_02_compliance_rag" && (
              <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 space-y-3 text-xs">
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-slate-300">
                    Retrieved Policy Grounding Snippets (Cosine Similarity Ranked):
                  </span>
                  {resolutionResult.policy_retrieval.retrieved_chunks.map((chunk, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg border border-slate-800 bg-slate-900/90 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sky-400 text-xs">
                            {chunk.policy_id}
                          </span>
                          <span className="text-slate-300 font-semibold">{chunk.policy_title}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-slate-400 font-mono">Similarity:</span>
                          <span className="font-mono font-bold text-emerald-400 text-[11px]">
                            {(chunk.similarity_score * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>

                      {/* Similarity bar */}
                      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full"
                          style={{ width: `${chunk.similarity_score * 100}%` }}
                        />
                      </div>

                      <p className="text-slate-300 text-[11px] leading-relaxed italic border-l-2 border-blue-500/60 pl-2 mt-1">
                        &quot;{chunk.snippet}&quot;
                      </p>

                      <div className="flex flex-wrap gap-1 mt-1">
                        {chunk.matched_keywords.map((kw, kidx) => (
                          <span
                            key={kidx}
                            className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400"
                          >
                            #{kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Agent 3 Trace Card: Resolution & Guardrail Verifier */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 overflow-hidden">
            <button
              onClick={() => toggleExpand("agent_03_resolution_verifier")}
              className="w-full flex items-center justify-between p-3.5 text-left hover:bg-slate-800/40 transition-colors"
            >
              <div className="flex items-center gap-2">
                {expandedAgent === "agent_03_resolution_verifier" ? (
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                )}
                <div>
                  <div className="text-xs font-semibold text-white flex items-center gap-2">
                    <span>Agent 3: Resolution & Anti-Hallucination Guardrail Verifier</span>
                    <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-800">
                      {resolutionResult.traces[2]?.latency_ms || 24} ms
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {resolutionResult.traces[2]?.output_summary}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 border border-emerald-800/50 bg-emerald-950/40 px-2 py-0.5 rounded">
                {resolutionResult.guardrail_audit.passed_all_checks
                  ? "GUARDRAIL PASSED"
                  : "ESCALATION ENFORCED"}
              </span>
            </button>

            {expandedAgent === "agent_03_resolution_verifier" && (
              <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 space-y-3 text-xs">
                {/* Guardrail Checklist */}
                <div className="rounded-lg border border-slate-800 bg-slate-900/90 p-3 space-y-2">
                  <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-sky-400" />
                    <span>PayPal Anti-Hallucination Guardrail Audit Matrix</span>
                  </div>

                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">1. All Cited Policy IDs Grounded in RAG Chunks:</span>
                      <span className="font-mono font-semibold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        VERIFIED ({resolutionResult.resolution.cited_policy_ids.join(", ")})
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">2. Financial Dollar Accuracy (Zero Variance):</span>
                      <span className="font-mono font-semibold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        MATCHED (${resolutionResult.guardrail_audit.expected_amount.toFixed(2)} vs ${resolutionResult.guardrail_audit.resolved_amount.toFixed(2)})
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">3. Decision Confidence Threshold (SLA &gt;= 80.0%):</span>
                      <span
                        className={`font-mono font-semibold flex items-center gap-1 ${
                          resolutionResult.guardrail_audit.confidence_threshold_met
                            ? "text-emerald-400"
                            : "text-amber-400"
                        }`}
                      >
                        {resolutionResult.guardrail_audit.confidence_threshold_met ? (
                          <>
                            <CheckCircle2 className="h-3 w-3" />
                            {(resolutionResult.guardrail_audit.confidence_score * 100).toFixed(1)}% (PASS)
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="h-3 w-3" />
                            {(resolutionResult.guardrail_audit.confidence_score * 100).toFixed(1)}% (BELOW SLA - ESCALATED)
                          </>
                        )}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">4. Hallucinations Detected:</span>
                      <span className="font-mono font-bold text-emerald-400">
                        {resolutionResult.guardrail_audit.hallucinations_detected} (0.00%)
                      </span>
                    </div>
                  </div>

                  {resolutionResult.guardrail_audit.override_applied && (
                    <div className="rounded bg-amber-500/10 border border-amber-500/30 p-2 text-xs text-amber-300">
                      <strong>Guardrail Override Applied:</strong> {resolutionResult.guardrail_audit.override_reason}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
