"use client";

import React, { useState, useEffect } from "react";
import initialDisputes from "../../data/transactions.json";
import { Dispute, DisputeResolutionResponse } from "../lib/types";
import { Header } from "../components/Header";
import { DisputeQueueSidebar } from "../components/DisputeQueueSidebar";
import { EvidenceDossier } from "../components/EvidenceDossier";
import { AgentTraceViewer } from "../components/AgentTraceViewer";
import { ResolutionPanel } from "../components/ResolutionPanel";
import { CreateDisputeModal } from "../components/CreateDisputeModal";
import { RagSearchModal } from "../components/RagSearchModal";
import { SystemMetricsBar } from "../components/SystemMetricsBar";
import { Layers, FileText, Cpu, CheckCircle2, Info, ExternalLink } from "lucide-react";

export default function ResolvAIPage() {
  const [disputes, setDisputes] = useState<Dispute[]>(initialDisputes as Dispute[]);
  const [selectedDispute, setSelectedDispute] = useState<Dispute>(disputes[0]);
  const [resolutionResult, setResolutionResult] = useState<DisputeResolutionResponse | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(0); // 0: idle, 1: investigator, 2: rag, 3: verifier, 4: complete
  const [centerTab, setCenterTab] = useState<"ALL" | "DOSSIER" | "TRACES">("ALL");

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isRagModalOpen, setIsRagModalOpen] = useState(false);
  const [engineName, setEngineName] = useState("DETERMINISTIC_FINTECH_ENGINE");

  // Load disputes from API on mount
  useEffect(() => {
    async function loadDisputes() {
      try {
        const res = await fetch("/api/disputes");
        const json = await res.json();
        if (json.success && json.data) {
          setDisputes(json.data);
          if (!selectedDispute && json.data.length > 0) {
            setSelectedDispute(json.data[0]);
          }
        }
      } catch {
        // Fall back to initial static data
      }
    }
    loadDisputes();
  }, []);

  // When selected dispute changes, reset resolution result or auto-prepare
  const handleSelectDispute = (dispute: Dispute) => {
    setSelectedDispute(dispute);
    setResolutionResult(null);
    setActiveStep(0);
  };

  // Run the Multi-Agent Pipeline
  const handleRunPipeline = async () => {
    if (!selectedDispute || isRunning) return;

    setIsRunning(true);
    setActiveStep(1);

    try {
      // Step 1 animation pulse
      await new Promise((r) => setTimeout(r, 250));
      setActiveStep(2);

      // Step 2 animation pulse
      await new Promise((r) => setTimeout(r, 250));
      setActiveStep(3);

      const res = await fetch("/api/resolve-dispute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dispute: selectedDispute }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setResolutionResult(json.data);
        setEngineName(json.data.telemetry?.engine || "DETERMINISTIC_FINTECH_ENGINE");
        setActiveStep(4);
      }
    } catch (err) {
      console.error("Pipeline execution error:", err);
    } finally {
      setIsRunning(false);
    }
  };

  // Approve and close dispute in ledger
  const handleApproveAndClose = (decision: string) => {
    if (!selectedDispute) return;

    let newStatus: Dispute["status"] = "RESOLVED_MERCHANT_WIN";
    if (decision === "ISSUE_CUSTOMER_REFUND") {
      newStatus = "RESOLVED_CUSTOMER_REFUND";
    } else if (decision === "ESCALATE_TO_HUMAN") {
      newStatus = "ESCALATED_TO_HUMAN";
    }

    const updated = disputes.map((d) =>
      d.id === selectedDispute.id ? { ...d, status: newStatus } : d
    );
    setDisputes(updated);
    setSelectedDispute({ ...selectedDispute, status: newStatus });
  };

  const handleCustomDisputeCreated = (newDispute: Dispute) => {
    setDisputes([newDispute, ...disputes]);
    setSelectedDispute(newDispute);
    setResolutionResult(null);
    setActiveStep(0);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <Header
        engineName={engineName}
        onOpenRagModal={() => setIsRagModalOpen(true)}
        disputeCount={disputes.length}
      />

      {/* Recruiter & Demo Mode Notice Banner */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-sky-400 flex-shrink-0" />
            <span>
              <strong>Recruiter Demo Guaranteed Uptime:</strong> Running self-contained with 0 external API key dependencies so Vercel deployments NEVER crash.
            </span>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center gap-3">
            <span>
              Plug in <code className="text-sky-300 bg-slate-800 px-1 py-0.5 rounded font-mono">GEMINI_API_KEY</code> in <code className="text-slate-300 font-mono">.env.local</code> for live LLM mode.
            </span>
          </div>
        </div>
      </div>

      {/* Main Workspace Layout (3-Column Fintech Command Center) */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden max-w-[1920px] w-full mx-auto">
        {/* Left Column: Dispute Queue Sidebar */}
        <DisputeQueueSidebar
          disputes={disputes}
          selectedDisputeId={selectedDispute?.id || null}
          onSelectDispute={handleSelectDispute}
          onOpenCreateModal={() => setIsCreateModalOpen(true)}
        />

        {/* Center Column: Evidence Dossier & Agent Traces */}
        <section className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-slate-950/40">
          {/* Center Tabs Navigation */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-1 text-xs">
              <button
                onClick={() => setCenterTab("ALL")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                  centerTab === "ALL"
                    ? "bg-blue-600/20 text-sky-300 border border-blue-500/40"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                <span>Unified Workspace</span>
              </button>
              <button
                onClick={() => setCenterTab("DOSSIER")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                  centerTab === "DOSSIER"
                    ? "bg-blue-600/20 text-sky-300 border border-blue-500/40"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                }`}
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Evidence Dossier</span>
              </button>
              <button
                onClick={() => setCenterTab("TRACES")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                  centerTab === "TRACES"
                    ? "bg-blue-600/20 text-sky-300 border border-blue-500/40"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                }`}
              >
                <Cpu className="h-3.5 w-3.5" />
                <span>Multi-Agent Traces</span>
              </button>
            </div>

            <div className="text-[11px] font-mono text-slate-400 hidden sm:block">
              Case Ref: <strong className="text-white">{selectedDispute?.id}</strong>
            </div>
          </div>

          {selectedDispute ? (
            <div className="space-y-6">
              {/* Evidence Dossier View */}
              {(centerTab === "ALL" || centerTab === "DOSSIER") && (
                <div>
                  <EvidenceDossier dispute={selectedDispute} />
                </div>
              )}

              {/* Agent Execution Trace Viewer */}
              {(centerTab === "ALL" || centerTab === "TRACES") && (
                <div className="pt-2 border-t border-slate-800/80">
                  <AgentTraceViewer
                    resolutionResult={resolutionResult}
                    isRunning={isRunning}
                    onRunResolution={handleRunPipeline}
                    activeStep={activeStep}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 text-center text-slate-500">
              Select a dispute from the left queue to begin adjudication.
            </div>
          )}
        </section>

        {/* Right Column: Resolution Panel & Draft Settlement */}
        {selectedDispute && (
          <ResolutionPanel
            dispute={selectedDispute}
            resolution={resolutionResult?.resolution || null}
            guardrailAudit={resolutionResult?.guardrail_audit || null}
            onApproveAndClose={handleApproveAndClose}
            onTriggerRun={handleRunPipeline}
            isRunning={isRunning}
          />
        )}
      </main>

      {/* Bottom Operational Telemetry Footer Bar */}
      <SystemMetricsBar resolutionResult={resolutionResult} />

      {/* Modals */}
      <CreateDisputeModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreated={handleCustomDisputeCreated}
      />

      <RagSearchModal
        isOpen={isRagModalOpen}
        onClose={() => setIsRagModalOpen(false)}
      />
    </div>
  );
}
