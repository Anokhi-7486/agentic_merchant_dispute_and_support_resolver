"use client";

import React, { useState } from "react";
import { Dispute, DisputeCategory } from "../lib/types";
import { X, PlusCircle, ShieldAlert, Sparkles } from "lucide-react";

interface CreateDisputeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (dispute: Dispute) => void;
}

export const CreateDisputeModal: React.FC<CreateDisputeModalProps> = ({
  isOpen,
  onClose,
  onCreated,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    case_title: "Custom High-Risk Transaction Dispute",
    dispute_category: "ITEM_NOT_RECEIVED" as DisputeCategory,
    amount: "450.00",
    currency: "USD",
    customer_name: "Gregory House",
    customer_email: "g.house@princeton.edu",
    buyer_address: "100 Mercer St, Princeton, NJ 08540",
    merchant_name: "Precision Instruments Labs",
    merchant_rating: "4.85",
    dispute_rate_percentage: "0.35",
    item_description: "Precision Digital Diagnostic Microscope",
    carrier: "FedEx Express",
    tracking_number: "794820194012",
    delivery_status: "DELIVERED",
    signature_present: true,
    signed_by: "G. HOUSE",
    avs_result: "Y",
    cvv_result: "M",
    ip_matches: true,
    buyer_claim_notes: "Customer states package was delivered to incorrect neighbor address.",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/disputes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success && json.data) {
        onCreated(json.data);
        onClose();
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl space-y-4 my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600/20 text-sky-400 border border-blue-500/30">
              <PlusCircle className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Create Custom Dispute Scenario
              </h3>
              <p className="text-xs text-slate-400">
                Construct an edge-case transaction to live-test multi-agent reasoning & guardrails
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Case Title</label>
              <input
                type="text"
                required
                value={formData.case_title}
                onChange={(e) => setFormData({ ...formData, case_title: e.target.value })}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Dispute Category</label>
              <select
                value={formData.dispute_category}
                onChange={(e) =>
                  setFormData({ ...formData, dispute_category: e.target.value as DisputeCategory })
                }
                className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2 text-white focus:border-blue-500 focus:outline-none font-mono"
              >
                <option value="ITEM_NOT_RECEIVED">ITEM_NOT_RECEIVED (INR)</option>
                <option value="UNAUTHORIZED_TRANSACTION">UNAUTHORIZED_TRANSACTION (ATO)</option>
                <option value="DUPLICATE_CHARGE">DUPLICATE_CHARGE</option>
                <option value="REFUND_ALREADY_PROCESSED">REFUND_ALREADY_PROCESSED</option>
                <option value="HIGH_VALUE_CHARGEBACK">HIGH_VALUE_CHARGEBACK (&gt; $750 / $2.5k)</option>
                <option value="SIGNIFICANTLY_NOT_AS_DESCRIBED">SIGNIFICANTLY_NOT_AS_DESCRIBED (SNAD)</option>
                <option value="RECURRING_BILLING">RECURRING_BILLING (SaaS)</option>
                <option value="DIGITAL_GOODS">DIGITAL_GOODS (License Key)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Dispute Amount (USD)</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2 text-white font-mono focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Item Description</label>
              <input
                type="text"
                required
                value={formData.item_description}
                onChange={(e) => setFormData({ ...formData, item_description: e.target.value })}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Customer Name</label>
              <input
                type="text"
                required
                value={formData.customer_name}
                onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Merchant Name</label>
              <input
                type="text"
                required
                value={formData.merchant_name}
                onChange={(e) => setFormData({ ...formData, merchant_name: e.target.value })}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Carrier</label>
              <input
                type="text"
                required
                value={formData.carrier}
                onChange={(e) => setFormData({ ...formData, carrier: e.target.value })}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Carrier Delivery Status</label>
              <select
                value={formData.delivery_status}
                onChange={(e) => setFormData({ ...formData, delivery_status: e.target.value })}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2 text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="DELIVERED">DELIVERED</option>
                <option value="IN_TRANSIT">IN_TRANSIT</option>
                <option value="RETURNED_TO_SENDER">RETURNED_TO_SENDER</option>
              </select>
            </div>
          </div>

          {/* Telemetry Checkboxes */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-2">
            <span className="font-semibold text-slate-300 block mb-1">
              Gateway & Security Telemetry Toggles:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.signature_present}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      signature_present: e.target.checked,
                      signed_by: e.target.checked ? "CONFIRMED SIGNATURE" : "",
                    })
                  }
                  className="rounded border-slate-700 text-blue-600 focus:ring-0"
                />
                <span>Delivery Signed</span>
              </label>

              <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.avs_result === "Y"}
                  onChange={(e) =>
                    setFormData({ ...formData, avs_result: e.target.checked ? "Y" : "N" })
                  }
                  className="rounded border-slate-700 text-blue-600 focus:ring-0"
                />
                <span>AVS Full Match (Y)</span>
              </label>

              <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.ip_matches}
                  onChange={(e) => setFormData({ ...formData, ip_matches: e.target.checked })}
                  className="rounded border-slate-700 text-blue-600 focus:ring-0"
                />
                <span>Buyer IP Matches Home</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Buyer Claim Notes</label>
            <textarea
              rows={2}
              value={formData.buyer_claim_notes}
              onChange={(e) => setFormData({ ...formData, buyer_claim_notes: e.target.value })}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2 text-white focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 font-semibold text-white hover:bg-blue-500 transition-colors shadow-md"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{loading ? "Creating..." : "Save & Add to Queue"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
