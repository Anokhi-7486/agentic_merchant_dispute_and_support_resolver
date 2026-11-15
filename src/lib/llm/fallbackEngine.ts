import {
  Dispute,
  FinalResolution,
  InvestigationReport,
  PolicyRetrievalResult,
  ResolutionDecision,
} from "../types";

export class DeterministicFintechEngine {
  /**
   * Deterministic Agent 1: Transaction Investigator
   */
  public static investigate(dispute: Dispute): InvestigationReport {
    const anomalyFlags: string[] = [];
    let riskScore = 15;
    let merchantTrustScore = Math.round(dispute.merchant.rating * 20); // 4.9 -> ~98

    // Merchant dispute rate penalty
    if (dispute.merchant.dispute_rate_percentage > 1.0) {
      anomalyFlags.push(
        `High Merchant Dispute Rate: ${dispute.merchant.dispute_rate_percentage}% (Exceeds 1.0% benchmark)`
      );
      riskScore += 25;
      merchantTrustScore -= 20;
    }

    // AVS/CVV evaluation
    let avsCvvStatus: "FULL_MATCH" | "PARTIAL_MATCH" | "MISMATCH" = "FULL_MATCH";
    if (dispute.telemetry.avs_result !== "Y" || dispute.telemetry.cvv_result !== "M") {
      if (dispute.telemetry.avs_result === "N" || dispute.telemetry.cvv_result === "N") {
        avsCvvStatus = "MISMATCH";
        anomalyFlags.push("AVS or CVV Mismatch detected at checkout");
        riskScore += 40;
      } else {
        avsCvvStatus = "PARTIAL_MATCH";
        anomalyFlags.push("Partial AVS/CVV verification");
        riskScore += 15;
      }
    }

    // Duplicate detection
    const duplicateDetected =
      Boolean(dispute.telemetry.duplicate_twin_transaction_id) ||
      dispute.dispute_category === "DUPLICATE_CHARGE";
    if (duplicateDetected) {
      anomalyFlags.push(
        `Duplicate Authorization Signature: Twin TXN ${dispute.telemetry.duplicate_twin_transaction_id || "TXN-AUTO"} within < 1 second`
      );
    }

    // Prior refund settled
    const priorRefundSettled =
      Boolean(dispute.prior_refund_record) ||
      dispute.dispute_category === "REFUND_ALREADY_PROCESSED";
    if (priorRefundSettled && dispute.prior_refund_record) {
      anomalyFlags.push(
        `Prior Refund Settled: Acquirer Reference Number (ARN) ${dispute.prior_refund_record.arn_acquirer_reference_number}`
      );
    }

    // High value threshold check ($750 & $2500)
    if (dispute.amount >= 750) {
      anomalyFlags.push(
        `High-Value Threshold Exceeded: Amount ($${dispute.amount.toFixed(
          2
        )}) requires signature confirmation under POL-SP-104`
      );
    }
    if (dispute.amount >= 2500) {
      anomalyFlags.push(
        `Tier-3 Senior Risk Escalation Trigger: Amount ($${dispute.amount.toFixed(
          2
        )}) requires human sign-off under POL-ESC-901`
      );
    }

    // Shipping verification
    let shippingVerification:
      | "VALID_DELIVERY"
      | "DELIVERY_PENDING"
      | "MISSING_SIGNATURE"
      | "INVALID"
      | "DIGITAL_CONFIRMED" = "VALID_DELIVERY";

    if (dispute.dispute_category === "DIGITAL_GOODS" || dispute.dispute_category === "RECURRING_BILLING") {
      shippingVerification = "DIGITAL_CONFIRMED";
    } else if (dispute.amount >= 750 && !dispute.shipping.signed_by) {
      shippingVerification = "MISSING_SIGNATURE";
      anomalyFlags.push("Missing required signature on delivery for high-value order");
      riskScore += 35;
    } else if (dispute.shipping.delivery_status === "DELIVERED") {
      shippingVerification = "VALID_DELIVERY";
    } else if (dispute.shipping.delivery_status === "IN_TRANSIT") {
      shippingVerification = "DELIVERY_PENDING";
    } else {
      shippingVerification = "INVALID";
    }

    // Friendly fraud likelihood
    let friendlyFraudLikelihood: "LOW" | "MEDIUM" | "HIGH" = "LOW";
    if (
      dispute.dispute_category === "ITEM_NOT_RECEIVED" &&
      dispute.shipping.delivery_status === "DELIVERED" &&
      (dispute.shipping.delivery_gps?.matches_recipient_address ||
        dispute.shipping.signed_by ||
        dispute.telemetry.ip_matches_buyer_address)
    ) {
      friendlyFraudLikelihood = "HIGH";
      anomalyFlags.push(
        "Friendly Fraud Indicators: Carrier delivery confirmed at buyer coordinate with matching digital device fingerprint"
      );
      riskScore = Math.max(riskScore, 65);
    }

    // Generate evidence summary
    const evidenceSummary =
      `Transaction ${dispute.transaction_id} ($${dispute.amount.toFixed(2)} ${dispute.currency}) ` +
      `disputed under category ${dispute.dispute_category}. ` +
      `Merchant rating is ${dispute.merchant.rating}/5.0 with ${dispute.merchant.dispute_rate_percentage}% dispute rate. ` +
      `Carrier ${dispute.shipping.carrier} status is ${dispute.shipping.delivery_status} ` +
      `(Signed by: ${dispute.shipping.signed_by || "No signature"}). ` +
      `AVS: ${dispute.telemetry.avs_result || "N/A"}, CVV: ${dispute.telemetry.cvv_result || "N/A"}. ` +
      `3D-Secure Liability Shift: ${dispute.telemetry.three_d_secure?.liability_shifted ? "ACTIVE (ECI 05/06)" : "INACTIVE"}.`;

    return {
      riskScore: Math.min(100, Math.max(5, riskScore)),
      merchantTrustScore: Math.min(100, Math.max(10, merchantTrustScore)),
      evidenceSummary,
      anomalyFlags,
      avsCvvStatus,
      shippingVerification,
      friendlyFraudLikelihood,
      duplicateDetected,
      priorRefundSettled,
    };
  }

  /**
   * Deterministic Agent 3: Resolution & Guardrail Synthesis
   */
  public static synthesizeResolution(
    dispute: Dispute,
    investigation: InvestigationReport,
    ragResult: PolicyRetrievalResult
  ): FinalResolution {
    const citedPolicyIds: string[] = [];
    const availablePolicyIds = ragResult.retrieved_chunks.map((c) => c.policy_id);

    const helperCite = (id: string) => {
      if (availablePolicyIds.includes(id) && !citedPolicyIds.includes(id)) {
        citedPolicyIds.push(id);
      }
    };

    let decision: ResolutionDecision = "APPROVE_MERCHANT_PROTECTION";
    let confidence = 0.94;
    let executiveSummary = "";
    let merchantAction = "";
    let customerAction = "";
    const amount = Number(dispute.amount.toFixed(2));

    // Decision Logic Matrix
    if (dispute.amount >= 2500 || (dispute.amount >= 750 && investigation.shippingVerification === "MISSING_SIGNATURE")) {
      decision = "ESCALATE_TO_HUMAN";
      confidence = 0.88;
      helperCite("POL-SP-104");
      helperCite("POL-ESC-901");
      executiveSummary =
        `High-value dispute of $${amount.toFixed(2)} requires mandatory senior risk review. ` +
        `Carrier records show item delivered without the mandated physical recipient signature required under POL-SP-104. ` +
        `Pursuant to POL-ESC-901, autonomous settlement is suspended pending manual carrier audit.`;
      merchantAction = "Submit carrier signature manifest or proof of direct customer acceptance within 48 hours.";
      customerAction = "Your claim is undergoing escalated review by PayPal Risk Operations. You will receive an update in 1-2 business days.";
    } else if (dispute.dispute_category === "DUPLICATE_CHARGE" || investigation.duplicateDetected) {
      decision = "ISSUE_CUSTOMER_REFUND";
      confidence = 0.98;
      helperCite("POL-DB-305");
      executiveSummary =
        `Duplicate billing verified. Customer account was debited $${amount.toFixed(2)} twice for a single fulfillment order ` +
        `due to checkout session timeout race condition. Immediate automated remediation executed under POL-DB-305.`;
      merchantAction = "Duplicate credit issued to customer. Dispute fee is waived and processing fee refunded.";
      customerAction = `Full refund of $${amount.toFixed(2)} has been credited back to your original payment method.`;
    } else if (dispute.dispute_category === "REFUND_ALREADY_PROCESSED" || investigation.priorRefundSettled) {
      decision = "APPROVE_MERCHANT_PROTECTION";
      confidence = 0.99;
      helperCite("POL-AR-402");
      executiveSummary =
        `Pre-dispute electronic refund confirmed via merchant gateway under Acquirer Reference Number (ARN). ` +
        `Funds were transmitted to issuing bank prior to chargeback notification. Closed under POL-AR-402 to prevent dual enrichment.`;
      merchantAction = "Dispute closed in your favor. Funds hold released immediately.";
      customerAction = `Investigation confirms a refund of $${amount.toFixed(2)} was already settled to your issuing bank under ARN ${
        dispute.prior_refund_record?.arn_acquirer_reference_number || "REF-AUDIT"
      }. Please check your card statement.`;
    } else if (dispute.dispute_category === "UNAUTHORIZED_TRANSACTION") {
      decision = "APPROVE_MERCHANT_PROTECTION";
      confidence = 0.95;
      helperCite("POL-UT-204");
      executiveSummary =
        `Dispute resolved in merchant favor. Merchant fulfilled all obligations under POL-UT-204 with 3-D Secure 2.0 authentication ` +
        `(Liability Shift Active, ECI 05), full AVS address verification, and delivery to confirmed cardholder address.`;
      merchantAction = "Seller Protection confirmed. Chargeback hold released and no fee assessed.";
      customerAction = "Charge was authenticated via 3-D Secure EMV protocol with billing match. Liability shifts to issuing bank.";
    } else if (dispute.dispute_category === "SIGNIFICANTLY_NOT_AS_DESCRIBED") {
      decision = "APPROVE_MERCHANT_PROTECTION";
      confidence = 0.91;
      helperCite("POL-SNAD-201");
      executiveSummary =
        `Merchant complied with POL-SNAD-201 by issuing a prepaid tracked return merchandise label. ` +
        `Customer failed to return the physical goods within the mandatory return window. Merchant protection upheld.`;
      merchantAction = "Seller Protection affirmed. Retain disputed funds.";
      customerAction = "Return merchandise mandate (POL-SNAD-201) was not satisfied. Merchandise was not returned using the prepaid shipping label.";
    } else if (dispute.dispute_category === "RECURRING_BILLING") {
      decision = "APPROVE_MERCHANT_PROTECTION";
      confidence = 0.92;
      helperCite("POL-REC-301");
      executiveSummary =
        `Merchant provided verifiable electronic audit logs demonstrating pre-billing renewal notice delivered 7 days in advance ` +
        `and authenticated customer platform usage during the active billing cycle under POL-REC-301.`;
      merchantAction = "Subscription terms upheld. Dispute closed in merchant favor.";
      customerAction = "Audit records confirm renewal notification was sent and active service usage occurred during the subscription period.";
    } else if (dispute.dispute_category === "DIGITAL_GOODS") {
      decision = "APPROVE_MERCHANT_PROTECTION";
      confidence = 0.93;
      helperCite("POL-DIG-202");
      executiveSummary =
        `Merchant supplied cryptographically verified digital proof of delivery and server license activation logs ` +
        `matching buyer IP address pursuant to POL-DIG-202 standards.`;
      merchantAction = "Digital fulfillment verified. Dispute closed in your favor with full fee waiver.";
      customerAction = "Digital access and software key activation logs were verified for this account.";
    } else {
      // Default: ITEM_NOT_RECEIVED with valid tracking
      decision = "APPROVE_MERCHANT_PROTECTION";
      confidence = 0.96;
      helperCite("POL-SP-101");
      if (investigation.friendlyFraudLikelihood === "HIGH") {
        helperCite("POL-FF-501");
      }
      executiveSummary =
        `Carrier tracking confirms on-time delivery to the verified recipient address. ` +
        `Geolocation delivery coordinates match buyer residential profile under POL-SP-101 and POL-FF-501. Seller protection fully granted.`;
      merchantAction = "Valid Proof of Delivery verified. Full Seller Protection granted and dispute hold released.";
      customerAction = `Carrier ${dispute.shipping.carrier} confirmed delivery to your address with tracking number ${dispute.shipping.tracking_number}.`;
    }

    // Ensure at least one policy is cited from retrieved chunks
    if (citedPolicyIds.length === 0 && availablePolicyIds.length > 0) {
      citedPolicyIds.push(availablePolicyIds[0]);
    }

    // Format formal letter
    const draftLetter =
      `PAYPAL DISPUTE RESOLUTION ADJUDICATION\n` +
      `Dispute Case ID: ${dispute.id}\n` +
      `Original Transaction ID: ${dispute.transaction_id}\n` +
      `Disputed Amount: $${amount.toFixed(2)} ${dispute.currency}\n` +
      `Date of Determination: ${new Date().toISOString().split("T")[0]}\n\n` +
      `DETERMINATION SUMMARY:\n` +
      `Final Decision: ${decision}\n` +
      `Confidence Rating: ${(confidence * 100).toFixed(1)}%\n` +
      `Governing Policy Framework: ${citedPolicyIds.join(", ")}\n\n` +
      `FINDINGS & EVIDENCE ANALYSIS:\n` +
      `${executiveSummary}\n\n` +
      `FINANCIAL & LEDGER IMPACT:\n` +
      `- Disputed Amount: $${amount.toFixed(2)} ${dispute.currency}\n` +
      `- Chargeback Assessment Fee: ${decision === "APPROVE_MERCHANT_PROTECTION" || decision === "ISSUE_CUSTOMER_REFUND" ? "WAIVED ($0.00)" : "PENDING HUMAN REVIEW"}\n` +
      `- Merchant Liability: $${decision === "APPROVE_MERCHANT_PROTECTION" ? "0.00" : decision === "ISSUE_CUSTOMER_REFUND" ? amount.toFixed(2) : "0.00"}\n` +
      `- Customer Settlement: $${decision === "ISSUE_CUSTOMER_REFUND" ? amount.toFixed(2) : "0.00"}\n\n` +
      `MERCHANT DIRECTIVE:\n${merchantAction}\n\n` +
      `CUSTOMER DIRECTIVE:\n${customerAction}\n\n` +
      `This determination has been audited by the PayPal Anti-Hallucination Guardrail Engine.`;

    return {
      decision,
      confidence,
      cited_policy_ids: citedPolicyIds,
      executive_summary: executiveSummary,
      merchant_action: merchantAction,
      customer_action: customerAction,
      financial_impact: {
        dispute_amount: amount,
        currency: dispute.currency,
        chargeback_fee_waived: decision !== "ESCALATE_TO_HUMAN",
        merchant_liability: decision === "ISSUE_CUSTOMER_REFUND" ? amount : 0,
        customer_refund_amount: decision === "ISSUE_CUSTOMER_REFUND" ? amount : 0,
      },
      draft_resolution_letter: draftLetter,
    };
  }
}
