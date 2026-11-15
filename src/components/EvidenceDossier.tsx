"use client";

import React from "react";
import { Dispute } from "../lib/types";
import {
  Truck,
  ShieldCheck,
  AlertCircle,
  MapPin,
  Smartphone,
  CreditCard,
  User,
  Store,
  ExternalLink,
  MessageSquare,
  FileText,
  Clock,
  Layers,
} from "lucide-react";

interface EvidenceDossierProps {
  dispute: Dispute;
}

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  timeZone: "UTC",
};

const timeFormatOptions: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  timeZone: "UTC",
};

export const EvidenceDossier: React.FC<EvidenceDossierProps> = ({ dispute }) => {
  const { customer, merchant, items, telemetry, shipping, prior_refund_record } = dispute;

  return (
    <div className="space-y-4">
      {/* Dossier Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-800 bg-slate-900/80 p-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-sky-400 bg-sky-950/60 border border-sky-800/60 px-2 py-0.5 rounded">
              Case Ref: {dispute.id}
            </span>
            <span className="text-xs font-mono text-slate-400">
              Txn: {dispute.transaction_id}
            </span>
          </div>
          <h2 className="text-base font-bold text-white mt-1">
            {dispute.case_title}
          </h2>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold font-mono text-white">
            ${dispute.amount.toFixed(2)}{" "}
            <span className="text-xs font-sans text-slate-400 font-normal">
              {dispute.currency}
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            Disputed on {new Date(dispute.created_at).toLocaleDateString("en-US", dateFormatOptions)}
          </span>
        </div>
      </div>

      {/* Customer vs Merchant Profiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Customer Profile */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2.5">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <User className="h-4 w-4 text-blue-400" />
              <span>Cardholder / Buyer Record</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              ID: {customer.id}
            </span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Name:</span>
              <span className="font-semibold text-white">{customer.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Email:</span>
              <span className="text-slate-300 font-mono text-[11px]">{customer.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Account History:</span>
              <span className="text-slate-300">Member since {customer.account_created}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Past Disputes:</span>
              <span
                className={`font-mono px-1.5 py-0.2 rounded font-semibold text-[11px] ${
                  customer.past_dispute_count > 1
                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    : "bg-slate-800 text-slate-300"
                }`}
              >
                {customer.past_dispute_count} prior claims
              </span>
            </div>
            <div className="pt-1 text-[11px] text-slate-400 border-t border-slate-800/50">
              <div className="flex items-start gap-1">
                <MapPin className="h-3 w-3 text-slate-500 mt-0.5 flex-shrink-0" />
                <span className="truncate">{customer.shipping_address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Merchant Profile */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2.5">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <Store className="h-4 w-4 text-emerald-400" />
              <span>Merchant Dossier</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              ID: {merchant.id}
            </span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Merchant Name:</span>
              <span className="font-semibold text-white">{merchant.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Category:</span>
              <span className="text-slate-300">{merchant.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Seller Rating:</span>
              <span className="font-mono text-emerald-400 font-semibold">
                ★ {merchant.rating.toFixed(2)} / 5.0
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Dispute Rate:</span>
              <span
                className={`font-mono px-1.5 py-0.2 rounded font-semibold text-[11px] ${
                  merchant.dispute_rate_percentage > 1.0
                    ? "bg-red-500/10 text-red-400 border border-red-500/20"
                    : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                }`}
              >
                {merchant.dispute_rate_percentage}% (PayPal Benchmark: &lt; 1.0%)
              </span>
            </div>
            <div className="pt-1 text-[11px] text-emerald-400 border-t border-slate-800/50 flex items-center justify-between">
              <span className="flex items-center gap-1 font-semibold">
                <ShieldCheck className="h-3.5 w-3.5" /> Seller Protection Eligible
              </span>
              <span className="text-slate-500 font-mono text-[10px]">Tier-1 Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security Telemetry & Authentication Matrix */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
            <CreditCard className="h-4 w-4 text-purple-400" />
            <span>Fraud Telemetry & Gateway Authentication Matrix</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-1.5 py-0.5 rounded">
            Compelling Evidence 3.0 Verified
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          {/* AVS Check */}
          <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-2.5">
            <div className="text-[10px] text-slate-400 font-medium">AVS Address Check</div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-sm font-bold font-mono text-emerald-400">
                Code {telemetry.avs_result || "N/A"}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5 truncate">
              {telemetry.avs_description || "Address verified"}
            </p>
          </div>

          {/* CVV Check */}
          <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-2.5">
            <div className="text-[10px] text-slate-400 font-medium">CVV2 Validation</div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-sm font-bold font-mono text-emerald-400">
                Match ({telemetry.cvv_result || "M"})
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">Card CVV matched</p>
          </div>

          {/* 3D Secure / Liability Shift */}
          <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-2.5">
            <div className="text-[10px] text-slate-400 font-medium">3DS 2.0 Protocol</div>
            <div className="flex items-center gap-1.5 mt-1">
              <span
                className={`text-xs font-bold font-mono ${
                  telemetry.three_d_secure?.liability_shifted
                    ? "text-emerald-400"
                    : "text-amber-400"
                }`}
              >
                {telemetry.three_d_secure?.liability_shifted
                  ? "Liability Shifted (ECI 05)"
                  : "Standard Auth"}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">
              {telemetry.three_d_secure?.liability_shifted
                ? "Issuer holds liability"
                : "Merchant liability"}
            </p>
          </div>

          {/* IP & Device Telemetry */}
          <div className="rounded-lg border border-slate-800 bg-slate-950/80 p-2.5">
            <div className="text-[10px] text-slate-400 font-medium">Device & IP Match</div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-xs font-bold font-mono text-sky-400">
                {telemetry.ip_matches_buyer_address ? "Matched Address" : "Proxy / Off-net"}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5 font-mono truncate">
              IP: {telemetry.ip_address}
            </p>
          </div>
        </div>
      </div>

      {/* Shipping & Delivery Proof Section */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
            <Truck className="h-4 w-4 text-sky-400" />
            <span>Fulfillment & Carrier Telemetry</span>
          </div>
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
              shipping.delivery_status === "DELIVERED"
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
            }`}
          >
            {shipping.delivery_status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="space-y-1">
            <span className="text-slate-400 text-[11px]">Carrier & Service:</span>
            <div className="font-semibold text-white">{shipping.carrier}</div>
            <div className="text-[11px] text-slate-400">{shipping.service_level || "Standard Tracking"}</div>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 text-[11px]">Tracking Number:</span>
            <div className="font-mono font-semibold text-sky-400 truncate">
              {shipping.tracking_number}
            </div>
            <div className="text-[11px] text-slate-400">
              Shipped: {new Date(shipping.shipped_at).toLocaleDateString("en-US", dateFormatOptions)}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 text-[11px]">Proof of Delivery (PoD):</span>
            <div className="font-semibold text-white">
              {shipping.signed_by ? (
                <span className="text-emerald-400">Signed: {shipping.signed_by}</span>
              ) : (
                <span className="text-amber-400">No Signature Logged</span>
              )}
            </div>
            {shipping.delivery_gps && (
              <div className="text-[10px] text-slate-400 font-mono">
                GPS: {shipping.delivery_gps.latitude}, {shipping.delivery_gps.longitude} (±{shipping.delivery_gps.accuracy_meters}m)
              </div>
            )}
          </div>
        </div>

        {shipping.carrier_delivery_note && (
          <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-2.5 text-xs text-amber-300 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <span>Carrier Log Note: {shipping.carrier_delivery_note}</span>
          </div>
        )}
      </div>

      {/* Prior Refund / Twin Transaction Callout if present */}
      {prior_refund_record && (
        <div className="rounded-xl border border-emerald-800/80 bg-emerald-950/40 p-3.5 text-xs space-y-1.5">
          <div className="flex items-center gap-2 font-semibold text-emerald-300">
            <Layers className="h-4 w-4" />
            <span>Pre-Dispute Prior Settlement Credit Found</span>
          </div>
          <p className="text-slate-300">
            Merchant gateway processed refund credit of <strong>${prior_refund_record.amount.toFixed(2)}</strong> under Acquirer Reference Number (ARN):{" "}
            <code className="text-emerald-300 bg-emerald-900/60 px-1 py-0.5 rounded font-mono">
              {prior_refund_record.arn_acquirer_reference_number}
            </code>{" "}
            on {new Date(prior_refund_record.processed_at).toLocaleDateString("en-US", dateFormatOptions)}.
          </p>
        </div>
      )}

      {/* Communication Log */}
      {dispute.evidence_dossier?.customer_communication_log && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 border-b border-slate-800 pb-2">
            <MessageSquare className="h-4 w-4 text-blue-400" />
            <span>Pre-Dispute Customer Messaging & Inquiries</span>
          </div>
          <div className="space-y-2">
            {dispute.evidence_dossier.customer_communication_log.map((log, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-lg text-xs ${
                  log.from === "buyer"
                    ? "bg-slate-950/80 border border-slate-800 text-slate-200"
                    : "bg-blue-950/40 border border-blue-900/50 text-sky-200 ml-4"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                  <span className="font-semibold uppercase tracking-wider">
                    {log.from === "buyer" ? "Customer" : "Merchant Support"}
                  </span>
                  <span>{new Date(log.timestamp).toLocaleTimeString("en-US", timeFormatOptions)}</span>
                </div>
                <p>{log.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
