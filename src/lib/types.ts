export type DisputeCategory =
  | "ITEM_NOT_RECEIVED"
  | "UNAUTHORIZED_TRANSACTION"
  | "DUPLICATE_CHARGE"
  | "REFUND_ALREADY_PROCESSED"
  | "HIGH_VALUE_CHARGEBACK"
  | "SIGNIFICANTLY_NOT_AS_DESCRIBED"
  | "RECURRING_BILLING"
  | "DIGITAL_GOODS";

export type DisputeStatus =
  | "UNDER_INVESTIGATION"
  | "RESOLVED_MERCHANT_WIN"
  | "RESOLVED_CUSTOMER_REFUND"
  | "ESCALATED_TO_HUMAN";

export type ResolutionDecision =
  | "APPROVE_MERCHANT_PROTECTION"
  | "ISSUE_CUSTOMER_REFUND"
  | "ESCALATE_TO_HUMAN";

export interface Customer {
  id: string;
  name: string;
  email: string;
  account_created: string;
  past_dispute_count: number;
  billing_address: string;
  shipping_address: string;
}

export interface Merchant {
  id: string;
  name: string;
  category: string;
  rating: number;
  dispute_rate_percentage: number;
  verified_seller: true | boolean;
  protection_eligible: true | boolean;
}

export interface Item {
  sku: string;
  description: string;
  quantity: number;
  unit_price: number;
}

export interface Telemetry {
  ip_address: string;
  ip_country: string;
  ip_region: string;
  ip_matches_buyer_address?: boolean;
  device_fingerprint?: string;
  device_matches_account_history?: boolean;
  avs_result?: string;
  avs_description?: string;
  cvv_result?: string;
  cvv_description?: string;
  three_d_secure?: {
    enrolled?: boolean;
    authenticated?: boolean;
    eci?: string;
    cavv?: string;
    liability_shifted?: boolean;
  };
  duplicate_twin_transaction_id?: string;
  duplicate_timestamp_delta_seconds?: number;
  active_sessions_during_cycle?: number;
  last_login_timestamp?: string;
  renewal_notice_sent_at?: string;
  license_activation_log?: {
    license_key_hash: string;
    activated_at: string;
    machine_guid: string;
    client_ip: string;
    ip_matches_checkout: boolean;
  };
}

export interface Shipping {
  carrier: string;
  tracking_number: string;
  service_level?: string;
  shipped_at: string;
  delivered_at: string | null;
  delivery_status: "DELIVERED" | "IN_TRANSIT" | "RETURNED_TO_SENDER" | "EXCEPTION";
  signed_by?: string | null;
  signature_required_on_waybill?: boolean;
  carrier_delivery_note?: string;
  delivery_gps?: {
    latitude: number;
    longitude: number;
    accuracy_meters: number;
    matches_recipient_address: boolean;
  };
  photo_proof_url?: string;
  handling_days: number;
  single_fulfillment_verified?: boolean;
}

export interface PriorRefundRecord {
  refund_id: string;
  amount: number;
  processed_at: string;
  arn_acquirer_reference_number: string;
  refund_method: string;
  settlement_status: string;
}

export interface EvidenceDossier {
  order_confirmation_emailed?: boolean;
  rma_prepaid_label_issued?: boolean;
  rma_label_tracking?: string;
  rma_days_elapsed?: number;
  customer_communication_log?: Array<{
    timestamp: string;
    from: "buyer" | "merchant" | "system";
    message: string;
  }>;
}

export interface Dispute {
  id: string;
  transaction_id: string;
  case_title: string;
  dispute_category: DisputeCategory;
  amount: number;
  currency: string;
  created_at: string;
  status: DisputeStatus;
  customer: Customer;
  merchant: Merchant;
  items: Item[];
  telemetry: Telemetry;
  shipping: Shipping;
  prior_refund_record?: PriorRefundRecord;
  evidence_dossier?: EvidenceDossier;
}

export interface PolicyClause {
  clause_id: string;
  name: string;
  text: string;
  tags: string[];
}

export interface Policy {
  id: string;
  category: string;
  title: string;
  effective_date: string;
  version: string;
  summary: string;
  clauses: PolicyClause[];
}

export interface RetrievedPolicyChunk {
  policy_id: string;
  clause_id: string;
  policy_title: string;
  clause_name: string;
  snippet: string;
  similarity_score: number;
  matched_keywords: string[];
}

export interface PolicyRetrievalResult {
  retrieved_chunks: RetrievedPolicyChunk[];
  applicable_policy_ids: string[];
  compliance_notes: string;
}

export interface InvestigationReport {
  riskScore: number; // 0-100
  merchantTrustScore: number; // 0-100
  evidenceSummary: string;
  anomalyFlags: string[];
  avsCvvStatus: "FULL_MATCH" | "PARTIAL_MATCH" | "MISMATCH";
  shippingVerification:
    | "VALID_DELIVERY"
    | "DELIVERY_PENDING"
    | "MISSING_SIGNATURE"
    | "INVALID"
    | "DIGITAL_CONFIRMED";
  friendlyFraudLikelihood: "LOW" | "MEDIUM" | "HIGH";
  duplicateDetected: boolean;
  priorRefundSettled: boolean;
}

export interface FinalResolution {
  decision: ResolutionDecision;
  confidence: number; // 0.00 - 1.00
  cited_policy_ids: string[];
  executive_summary: string;
  merchant_action: string;
  customer_action: string;
  financial_impact: {
    dispute_amount: number;
    currency: string;
    chargeback_fee_waived: boolean;
    merchant_liability: number;
    customer_refund_amount: number;
  };
  draft_resolution_letter: string;
}

export interface GuardrailAudit {
  all_citations_verified: boolean;
  unverified_citations: string[];
  amount_matches_transaction: boolean;
  expected_amount: number;
  resolved_amount: number;
  confidence_threshold_met: boolean;
  confidence_score: number;
  override_applied: boolean;
  override_reason?: string;
  hallucinations_detected: number;
  passed_all_checks: boolean;
}

export interface AgentExecutionTrace {
  agent_id: string;
  agent_name: string;
  latency_ms: number;
  status: "SUCCESS" | "FAILED" | "ESCALATED";
  input_summary: string;
  output_summary: string;
  details: Record<string, unknown>;
}

export interface DisputeResolutionResponse {
  dispute_id: string;
  transaction_id: string;
  investigation: InvestigationReport;
  policy_retrieval: PolicyRetrievalResult;
  resolution: FinalResolution;
  guardrail_audit: GuardrailAudit;
  traces: AgentExecutionTrace[];
  total_latency_ms: number;
  telemetry: {
    engine: "GEMINI_2_5_FLASH" | "OPENAI_GPT4O" | "DETERMINISTIC_FINTECH_ENGINE";
    prompt_tokens: number;
    completion_tokens: number;
    estimated_cost_usd: number;
    guardrail_version: string;
  };
}
