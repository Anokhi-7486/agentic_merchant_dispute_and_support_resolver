import {
  Dispute,
  FinalResolution,
  GuardrailAudit,
  InvestigationReport,
  PolicyRetrievalResult,
  ResolutionDecision,
} from "../types";
import { FinalResolutionSchema } from "./zodSchemas";

export interface GuardrailVerificationOutcome {
  validatedResolution: FinalResolution;
  audit: GuardrailAudit;
}

export class AntiHallucinationGuardrailVerifier {
  private static CONFIDENCE_THRESHOLD = 0.80;

  /**
   * Enforces zero-hallucination citations, exact dollar accuracy, and confidence thresholds.
   */
  public static verifyAndEnforce(
    dispute: Dispute,
    investigation: InvestigationReport,
    ragResult: PolicyRetrievalResult,
    resolution: FinalResolution
  ): GuardrailVerificationOutcome {
    const unverifiedCitations: string[] = [];
    let hallucinationsDetected = 0;

    // 1. Policy Citation Grounding Check
    const retrievedPolicyIds = new Set(ragResult.retrieved_chunks.map((c) => c.policy_id));
    for (const citedId of resolution.cited_policy_ids) {
      if (!retrievedPolicyIds.has(citedId)) {
        unverifiedCitations.push(citedId);
        hallucinationsDetected++;
      }
    }

    // 2. Financial Amount Verification Check (Zero Variance allowed)
    const expectedAmount = Number(dispute.amount.toFixed(2));
    const resolvedAmount = Number(resolution.financial_impact.dispute_amount.toFixed(2));
    const amountMatches = Math.abs(expectedAmount - resolvedAmount) < 0.001;
    if (!amountMatches) {
      hallucinationsDetected++;
    }

    // 3. Confidence Threshold Check (PayPal SWE SLA: >= 0.80)
    const confidenceThresholdMet = resolution.confidence >= this.CONFIDENCE_THRESHOLD;

    // Determine if an override to ESCALATE_TO_HUMAN is required
    let finalDecision: ResolutionDecision = resolution.decision;
    let overrideApplied = false;
    let overrideReason: string | undefined = undefined;

    if (!confidenceThresholdMet) {
      overrideApplied = true;
      overrideReason = `Confidence score of ${(resolution.confidence * 100).toFixed(
        1
      )}% is below the required 80.0% threshold. Automated decision halted and redirected to Tier-3 Risk Ops under POL-ESC-901.`;
      finalDecision = "ESCALATE_TO_HUMAN";
    } else if (unverifiedCitations.length > 0) {
      overrideApplied = true;
      overrideReason = `Detected unverified policy citations (${unverifiedCitations.join(
        ", "
      )}) not grounded in RAG context. Anti-hallucination guardrail triggered escalation.`;
      finalDecision = "ESCALATE_TO_HUMAN";
    } else if (!amountMatches) {
      overrideApplied = true;
      overrideReason = `Financial ledger mismatch: Transaction amount ($${expectedAmount}) differs from resolution amount ($${resolvedAmount}).`;
      finalDecision = "ESCALATE_TO_HUMAN";
    }

    // Clone & apply overrides if triggered
    const validatedResolution: FinalResolution = {
      ...resolution,
      decision: finalDecision,
      financial_impact: {
        ...resolution.financial_impact,
        dispute_amount: expectedAmount,
        currency: dispute.currency,
        merchant_liability:
          finalDecision === "APPROVE_MERCHANT_PROTECTION"
            ? 0
            : finalDecision === "ISSUE_CUSTOMER_REFUND"
            ? expectedAmount
            : resolution.financial_impact.merchant_liability,
        customer_refund_amount:
          finalDecision === "ISSUE_CUSTOMER_REFUND" ? expectedAmount : 0,
      },
    };

    if (overrideApplied && overrideReason) {
      validatedResolution.draft_resolution_letter =
        `[RISK OPERATIONS NOTICE - ESCALATION PENDING]\n\n` +
        `This case has been routed to a Senior Dispute Resolution Specialist for manual adjudication.\n\n` +
        `Case ID: ${dispute.id}\n` +
        `Transaction Reference: ${dispute.transaction_id}\n` +
        `Escalation Reason: ${overrideReason}\n\n` +
        `Current Evidence Package:\n` +
        `- Carrier Delivery Status: ${dispute.shipping.delivery_status}\n` +
        `- AVS/CVV Result: ${dispute.telemetry.avs_result || "N/A"} / ${dispute.telemetry.cvv_result || "N/A"}\n` +
        `- Preliminary Recommendation: ${resolution.decision}\n\n` +
        `Next Steps: Senior risk officer review required within 24 hours. Hold placed on disputed funds ($${expectedAmount} ${dispute.currency}).`;
    }

    // Schema validation
    FinalResolutionSchema.parse(validatedResolution);

    const audit: GuardrailAudit = {
      all_citations_verified: unverifiedCitations.length === 0,
      unverified_citations: unverifiedCitations,
      amount_matches_transaction: amountMatches,
      expected_amount: expectedAmount,
      resolved_amount: resolvedAmount,
      confidence_threshold_met: confidenceThresholdMet,
      confidence_score: resolution.confidence,
      override_applied: overrideApplied,
      override_reason: overrideReason,
      hallucinations_detected: hallucinationsDetected,
      passed_all_checks: !overrideApplied && hallucinationsDetected === 0,
    };

    return {
      validatedResolution,
      audit,
    };
  }
}
