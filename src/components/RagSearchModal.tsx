"use client";

import React, { useState, useEffect } from "react";
import { Policy, RetrievedPolicyChunk } from "../lib/types";
import { X, Search, BookOpen, Database, Sparkles, ShieldCheck } from "lucide-react";

interface RagSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RagSearchModal: React.FC<RagSearchModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("high value 750 signature confirmation mandate");
  const [results, setResults] = useState<RetrievedPolicyChunk[]>([]);
  const [loading, setLoading] = useState(false);
  const [allPolicies, setAllPolicies] = useState<Policy[]>([]);

  useEffect(() => {
    if (isOpen) {
      handleSearch();
    }
  }, [isOpen]);

  const handleSearch = async (queryText?: string) => {
    const q = queryText || searchQuery;
    if (!q) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/rag-search?q=${encodeURIComponent(q)}&topK=5`);
      const json = await res.json();
      if (json.success && json.results) {
        setResults(json.results);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl space-y-4 my-8 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                PayPal Policy Vector RAG Inspector
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                  MemoryVectorStore
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                10 Authoritative Merchant Protection policies indexed with TF-IDF cosine embeddings
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Live Vector Search Input */}
        <div className="space-y-2 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search policies (e.g., 'signature over $750', 'friendly fraud GPS', 'duplicate charge', '3DS liability shift')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full rounded-xl border border-slate-800 bg-slate-950/90 py-2 pl-9 pr-24 text-xs text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all font-mono"
            />
            <button
              onClick={() => handleSearch()}
              disabled={loading}
              className="absolute right-1.5 top-1.5 rounded-lg bg-purple-600 px-3 py-1 text-xs font-semibold text-white hover:bg-purple-500 transition-colors shadow-sm"
            >
              {loading ? "Searching..." : "Vector Query"}
            </button>
          </div>

          {/* Quick preset query pills */}
          <div className="flex flex-wrap gap-1.5 text-[10px]">
            <span className="text-slate-400 py-0.5 font-medium">Try Presets:</span>
            {[
              "High value signature POL-SP-104",
              "Friendly fraud GPS coordinates POL-FF-501",
              "Duplicate billing race condition POL-DB-305",
              "3D Secure liability shift POL-UT-204",
              "Prior refund ARN offset POL-AR-402",
            ].map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSearchQuery(preset);
                  handleSearch(preset);
                }}
                className="rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-0.5 font-mono border border-slate-700 transition-colors"
              >
                {preset.split(" ")[0]} {preset.split(" ")[1]}
              </button>
            ))}
          </div>
        </div>

        {/* Retrieved Chunks List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>Retrieved Chunks ({results.length}):</span>
            <span className="text-[10px] text-slate-500 font-mono">
              Cosine Similarity Metric: [0.00 – 1.00]
            </span>
          </div>

          {results.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              No matching policy chunks retrieved.
            </div>
          ) : (
            results.map((chunk, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sky-400 bg-sky-950/80 border border-sky-800/80 px-2 py-0.5 rounded">
                      {chunk.policy_id}
                    </span>
                    <span className="font-semibold text-white">{chunk.policy_title}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-slate-400">Similarity:</span>
                    <span className="font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded text-[11px]">
                      {(chunk.similarity_score * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-purple-300">
                  Clause: {chunk.clause_name} ({chunk.clause_id})
                </div>

                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-emerald-400 rounded-full"
                    style={{ width: `${chunk.similarity_score * 100}%` }}
                  />
                </div>

                <p className="text-slate-300 text-xs leading-relaxed italic border-l-2 border-purple-500/60 pl-2.5">
                  &quot;{chunk.snippet}&quot;
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {chunk.matched_keywords.map((kw, kidx) => (
                    <span
                      key={kidx}
                      className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-purple-950/60 text-purple-300 border border-purple-800/50"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
