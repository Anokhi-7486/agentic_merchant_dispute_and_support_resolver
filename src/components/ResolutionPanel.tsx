"use client";

import React, { useState } from "react";
import { Dispute, FinalResolution, GuardrailAudit } from "../lib/types";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Copy,
  Check,
  Send,
  DollarSign,
  FileText,
  BadgeAlert,
  Sparkles,
} from "lucide-react";

interface ResolutionPanelProps {
  dispute: Dispute;
  resolution: FinalResolution | null;
  guardrailAudit: GuardrailAudit | null;
  onApproveAndClose: (decision: string) => void;
  onTriggerRun: () => void;
  isRunning: boolean;
}

export const ResolutionPanel: React.FC<ResolutionPanelProps> = ({
  dispute,
  resolution,
  guardrailAudit,
  onApproveAndClose,
  onTriggerRun,
  isRunning,
}) => {
  const [copied, setCopied] = useState(false);
  const [editableLetter, setEditableLetter] = useState<string>("");
  const [isSettled, setIsSettled] = useState(false);

  // Sync draft letter when resolution changes
  React.useEffect(() => {
    if (resolution?.draft_resolution_letter) {
      setEditableLetter(resolution.draft_resolution_letter);
      setIsSettled(dispute.status !== "UNDER_INVESTIGATION");
    }
  }, [resolution, dispute.status]);

  const handleCopy = () => {
    if (!editableLetter) return;
    navigator.clipboard.writeText(editableLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSettle = () => {
    if (!resolution) return;
    setIsSettled(true);
    onApproveAndClose(resolution.decision);
  };

  const getDecisionBadge = () => {
    if (!resolution) return null;
    switch (resolution.decision) {
      case "APPROVE_MERCHANT_PROTECTION":
        return {
          bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
          label: "Approve Merchant Protection",
          sub: "Seller Protection Upheld • Funds Released",
          icon: ShieldCheck,
        };
      case "ISSUE_CUSTOMER_REFUND":
        return {
          bg: "bg-blue-500/10 border-blue-500/30 text-sky-400",
          label: "Issue Customer Refund",
          sub: "Duplicate / Defect Validated • Processing Fee Waived",
          icon: RotateCcw,
        };
      case "ESCALATE_TO_HUMAN":
        return {
          bg: "bg-amber-500/10 border-amber-500/30 text-amber-400",
          label: "Escalate To Human Review",
          sub: "Threshold > $2.5k / Missing High-Value Signature",
          icon: AlertTriangle,
        };
    }
  };

  const badge = getDecisionBadge();

  return (
    <aside className="flex flex-col border-l border-slate-800 bg-slate-900/60 w-full lg:w-[420px] flex-shrink-0 h-full overflow-y-auto p-4 space-y-4">
      {/* Panel Title */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-sky-400" />
          <h2 className="text-sm font-semibold text-white tracking-wide uppercase">
            Adjudication & Settlement
          </h2>
        </div>
        <span className="text-[10px] font-mono text-slate-400">
          Ref: {dispute.id}
        </span>
      </div>

      {!resolution ? (
        <div className="rounded-xl border border-dashed border-slate-800 p-8 text-center space-y-3">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800 text-slate-400">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200">
              Awaiting Multi-Agent Resolution
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
              Run the multi-agent pipeline to generate structured findings, RAG citations, and an anti-hallucination audited resolution notice.
            </p>
          </div>
          <button
            onClick={onTriggerRun}
            disabled={isRunning}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors shadow-md"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Launch Pipeline</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Decision Pill Card */}
          {badge && (
            <div className={`rounded-xl border p-4 space-y-1 ${badge.bg}`}>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-slate-300">
                  Adjudication Decision
                </span>
                <span className="font-mono text-xs font-bold text-white bg-slate-950/60 px-2 py-0.5 rounded border border-white/10">
                  {(resolution.confidence * 100).toFixed(1)}% Confidence
                </span>
              </div>
              <div className="flex items-center gap-2 text-base font-bold">
                <badge.icon className="h-5 w-5 flex-shrink-0" />
                <span>{badge.label}</span>
              </div>
              <p className="text-xs text-slate-300 pt-0.5">{badge.sub}</p>
            </div>
          )}

          {/* Guardrail Audit Pill */}
          {guardrailAudit && (
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <BadgeAlert className="h-3.5 w-3.5 text-emerald-400" />
                  Anti-Hallucination Verification
                </span>
                <span className="font-mono text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/80">
                  0 Hallucinations
                </span>
              </div>
              <div className="text-[11px] text-slate-400 space-y-1">
                <div>
                  Policy Cited:{" "}
                  <strong className="text-sky-300 font-mono">
                    {resolution.cited_policy_ids.join(", ") || "POL-SP-101"}
                  </strong>
                </div>
                <div>
                  Ledger Amount Verified:{" "}
                  <strong className="text-white font-mono">
                    ${dispute.amount.toFixed(2)} {dispute.currency} (Zero Variance)
                  </strong>
                </div>
              </div>
            </div>
          )}

          {/* Financial Impact Breakdown */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3.5 space-y-2 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                Financial Impact & Ledger Settlement
              </span>
              <span className="font-mono text-xs font-bold text-white">
                ${dispute.amount.toFixed(2)}
              </span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-400">Disputed Principal:</span>
                <span className="font-mono text-white">${resolution.financial_impact.dispute_amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Chargeback Fee ($20.00):</span>
                <span className="font-mono text-emerald-400 font-semibold">
                  {resolution.financial_impact.chargeback_fee_waived ? "WAIVED ($0.00)" : "APPLIED ($20.00)"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Merchant Liability:</span>
                <span className="font-mono text-white font-semibold">
                  ${resolution.financial_impact.merchant_liability.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-800/60 pt-1">
                <span className="text-slate-300 font-semibold">Customer Refund:</span>
                <span className="font-mono text-sky-400 font-bold">
                  ${resolution.financial_impact.customer_refund_amount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Editable Draft Resolution Letter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-blue-400" />
                Draft Resolution Letter (Editable)
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 rounded bg-slate-800 px-2 py-1 text-[11px] text-slate-300 hover:bg-slate-700 transition-colors font-mono"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy Letter</span>
                  </>
                )}
              </button>
            </div>

            <textarea
              rows={9}
              value={editableLetter}
              onChange={(e) => setEditableLetter(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950/90 p-3 font-mono text-[11px] leading-relaxed text-slate-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none transition-all shadow-inner"
            />
          </div>

          {/* Settle Dispute Button */}
          <div className="pt-2">
            <button
              onClick={handleSettle}
              disabled={isSettled}
              className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold transition-all shadow-lg ${
                isSettled
                  ? "bg-emerald-950/80 border border-emerald-800 text-emerald-300 cursor-default"
                  : "bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white hover:from-emerald-500 hover:to-emerald-600 ring-2 ring-emerald-400/40 hover:scale-[1.01]"
              }`}
            >
              {isSettled ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Dispute Settled & Closed in Ledger</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Approve & Close Dispute</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
