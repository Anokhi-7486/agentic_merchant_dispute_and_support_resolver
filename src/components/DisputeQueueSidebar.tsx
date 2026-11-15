"use client";

import React, { useState } from "react";
import { Dispute, DisputeStatus } from "../lib/types";
import { PlusCircle, Search, AlertTriangle, CheckCircle2, Clock, ShieldAlert, ArrowUpRight } from "lucide-react";

interface DisputeQueueSidebarProps {
  disputes: Dispute[];
  selectedDisputeId: string | null;
  onSelectDispute: (dispute: Dispute) => void;
  onOpenCreateModal: () => void;
}

export const DisputeQueueSidebar: React.FC<DisputeQueueSidebarProps> = ({
  disputes,
  selectedDisputeId,
  onSelectDispute,
  onOpenCreateModal,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const filtered = disputes.filter((disp) => {
    const matchesSearch =
      disp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disp.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disp.merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disp.dispute_category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disp.case_title.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter === "ALL") return true;
    if (statusFilter === "UNDER_INVESTIGATION") return disp.status === "UNDER_INVESTIGATION";
    if (statusFilter === "RESOLVED")
      return disp.status === "RESOLVED_MERCHANT_WIN" || disp.status === "RESOLVED_CUSTOMER_REFUND";
    if (statusFilter === "ESCALATED") return disp.status === "ESCALATED_TO_HUMAN";
    return true;
  });

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "ITEM_NOT_RECEIVED":
        return { label: "INR", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" };
      case "UNAUTHORIZED_TRANSACTION":
        return { label: "ATO / Unauth", color: "bg-red-500/10 text-red-400 border-red-500/20" };
      case "DUPLICATE_CHARGE":
        return { label: "Duplicate", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" };
      case "REFUND_ALREADY_PROCESSED":
        return { label: "Prior Refund", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" };
      case "HIGH_VALUE_CHARGEBACK":
        return { label: "High Value", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" };
      case "SIGNIFICANTLY_NOT_AS_DESCRIBED":
        return { label: "SNAD", color: "bg-orange-500/10 text-orange-400 border-orange-500/20" };
      case "RECURRING_BILLING":
        return { label: "Recurring", color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" };
      case "DIGITAL_GOODS":
        return { label: "Digital", color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" };
      default:
        return { label: category, color: "bg-slate-700/20 text-slate-300 border-slate-700" };
    }
  };

  const getStatusBadge = (status: DisputeStatus) => {
    switch (status) {
      case "RESOLVED_MERCHANT_WIN":
        return (
          <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
            <CheckCircle2 className="h-3 w-3" /> Merchant Win
          </span>
        );
      case "RESOLVED_CUSTOMER_REFUND":
        return (
          <span className="flex items-center gap-1 text-[10px] font-semibold text-blue-400">
            <CheckCircle2 className="h-3 w-3" /> Refund Issued
          </span>
        );
      case "ESCALATED_TO_HUMAN":
        return (
          <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-400">
            <AlertTriangle className="h-3 w-3" /> Escalated
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-[10px] font-medium text-slate-400">
            <Clock className="h-3 w-3" /> Under Review
          </span>
        );
    }
  };

  return (
    <aside className="flex flex-col border-r border-slate-800 bg-slate-900/60 w-full lg:w-96 flex-shrink-0 h-full">
      {/* Sidebar Header & Action */}
      <div className="p-3 border-b border-slate-800 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-white tracking-wide uppercase">
              Dispute Queue
            </h2>
            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-300 border border-slate-700">
              {filtered.length}
            </span>
          </div>
          <button
            onClick={onOpenCreateModal}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#0070BA] to-[#003087] px-2.5 py-1.5 text-xs font-medium text-white shadow-md hover:from-blue-500 hover:to-blue-700 transition-all ring-1 ring-blue-400/40"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span>Create Custom</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by ID, buyer, merchant, or reason..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-950/80 py-1.5 pl-8 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex gap-1 overflow-x-auto text-[11px] pb-1">
          {["ALL", "UNDER_INVESTIGATION", "RESOLVED", "ESCALATED"].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`rounded-md px-2 py-1 font-medium transition-colors whitespace-nowrap ${
                statusFilter === tab
                  ? "bg-blue-600/20 text-sky-300 border border-blue-500/40"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              {tab === "UNDER_INVESTIGATION" ? "Review" : tab === "ALL" ? "All" : tab.charAt(0) + tab.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Dispute List Items */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">
            No dispute cases match the current filter.
          </div>
        ) : (
          filtered.map((disp) => {
            const isSelected = disp.id === selectedDisputeId;
            const cat = getCategoryLabel(disp.dispute_category);

            return (
              <div
                key={disp.id}
                onClick={() => onSelectDispute(disp)}
                className={`p-3.5 cursor-pointer transition-all border-l-2 text-left ${
                  isSelected
                    ? "bg-slate-800/90 border-blue-500 shadow-inner"
                    : "border-transparent hover:bg-slate-800/40 hover:border-slate-600"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold text-white tracking-wide">
                      {disp.id}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono border ${cat.color}`}>
                      {cat.label}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-emerald-400">
                    ${disp.amount.toFixed(2)}
                  </span>
                </div>

                <p className="text-xs font-medium text-slate-200 line-clamp-1 mb-1.5">
                  {disp.case_title}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="truncate max-w-[140px] text-slate-300">
                    {disp.customer.name}
                  </span>
                  <div>{getStatusBadge(disp.status)}</div>
                </div>

                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>Merchant: {disp.merchant.name}</span>
                  <span className="flex items-center gap-0.5 text-blue-400">
                    Details <ArrowUpRight className="h-2.5 w-2.5" />
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};
