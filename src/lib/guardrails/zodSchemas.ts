import { z } from "zod";

export const DisputeCategorySchema = z.enum([
  "ITEM_NOT_RECEIVED",
  "UNAUTHORIZED_TRANSACTION",
  "DUPLICATE_CHARGE",
  "REFUND_ALREADY_PROCESSED",
  "HIGH_VALUE_CHARGEBACK",
  "SIGNIFICANTLY_NOT_AS_DESCRIBED",
  "RECURRING_BILLING",
  "DIGITAL_GOODS",
]);

export const ResolutionDecisionSchema = z.enum([
  "APPROVE_MERCHANT_PROTECTION",
  "ISSUE_CUSTOMER_REFUND",
  "ESCALATE_TO_HUMAN",
]);

export const InvestigationReportSchema = z.object({
  riskScore: z.number().min(0).max(100),
  merchantTrustScore: z.number().min(0).max(100),
  evidenceSummary: z.string().min(10),
  anomalyFlags: z.array(z.string()),
  avsCvvStatus: z.enum(["FULL_MATCH", "PARTIAL_MATCH", "MISMATCH"]),
  shippingVerification: z.enum([
    "VALID_DELIVERY",
    "DELIVERY_PENDING",
    "MISSING_SIGNATURE",
    "INVALID",
    "DIGITAL_CONFIRMED",
  ]),
  friendlyFraudLikelihood: z.enum(["LOW", "MEDIUM", "HIGH"]),
  duplicateDetected: z.boolean(),
  priorRefundSettled: z.boolean(),
});

export const RetrievedPolicyChunkSchema = z.object({
  policy_id: z.string().regex(/^POL-[A-Z]+-[0-9]+$/),
  clause_id: z.string(),
  policy_title: z.string(),
  clause_name: z.string(),
  snippet: z.string(),
  similarity_score: z.number().min(0).max(1),
  matched_keywords: z.array(z.string()),
});

export const PolicyRetrievalResultSchema = z.object({
  retrieved_chunks: z.array(RetrievedPolicyChunkSchema),
  applicable_policy_ids: z.array(z.string()),
  compliance_notes: z.string(),
});

export const FinancialImpactSchema = z.object({
  dispute_amount: z.number().positive(),
  currency: z.string().min(3).max(3),
  chargeback_fee_waived: z.boolean(),
  merchant_liability: z.number().min(0),
  customer_refund_amount: z.number().min(0),
});

export const FinalResolutionSchema = z.object({
  decision: ResolutionDecisionSchema,
  confidence: z.number().min(0).max(1),
  cited_policy_ids: z.array(z.string().regex(/^POL-[A-Z]+-[0-9]+$/)),
  executive_summary: z.string().min(20),
  merchant_action: z.string(),
  customer_action: z.string(),
  financial_impact: FinancialImpactSchema,
  draft_resolution_letter: z.string().min(50),
});

export const GuardrailAuditSchema = z.object({
  all_citations_verified: z.boolean(),
  unverified_citations: z.array(z.string()),
  amount_matches_transaction: z.boolean(),
  expected_amount: z.number(),
  resolved_amount: z.number(),
  confidence_threshold_met: z.boolean(),
  confidence_score: z.number(),
  override_applied: z.boolean(),
  override_reason: z.string().optional(),
  hallucinations_detected: z.number(),
  passed_all_checks: z.boolean(),
});
