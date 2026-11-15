import { defaultVectorAdapter } from "../rag/pineconeAdapter";
import {
  AgentExecutionTrace,
  Dispute,
  InvestigationReport,
  PolicyRetrievalResult,
  RetrievedPolicyChunk,
} from "../types";

export interface ComplianceRagAgentOutput {
  result: PolicyRetrievalResult;
  trace: AgentExecutionTrace;
  tokenCount: { prompt: number; completion: number };
}

export class ComplianceRagAgent {
  public static async execute(
    dispute: Dispute,
    investigation: InvestigationReport
  ): Promise<ComplianceRagAgentOutput> {
    const startTime = performance.now();

    // Formulate targeted vector query
    const queryTerms: string[] = [
      dispute.dispute_category,
      `amount ${dispute.amount}`,
      dispute.shipping.delivery_status,
      dispute.shipping.carrier,
    ];

    if (dispute.amount >= 750) {
      queryTerms.push("high value 750 signature confirmation mandate POL-SP-104");
    }
    if (dispute.amount >= 2500) {
      queryTerms.push("senior risk human escalation POL-ESC-901");
    }
    if (investigation.friendlyFraudLikelihood === "HIGH") {
      queryTerms.push("friendly fraud geolocation gps compelling evidence POL-FF-501");
    }
    if (dispute.dispute_category === "DUPLICATE_CHARGE" || investigation.duplicateDetected) {
      queryTerms.push("duplicate charge timeout race condition remediation POL-DB-305");
    }
    if (dispute.dispute_category === "REFUND_ALREADY_PROCESSED" || investigation.priorRefundSettled) {
      queryTerms.push("prior refund settled ARN acquirer reference number offset POL-AR-402");
    }
    if (dispute.dispute_category === "UNAUTHORIZED_TRANSACTION") {
      queryTerms.push("unauthorized transaction 3d secure liability shift eci POL-UT-204");
    }
    if (dispute.dispute_category === "SIGNIFICANTLY_NOT_AS_DESCRIBED") {
      queryTerms.push("significantly not as described return merchandise mandate POL-SNAD-201");
    }
    if (dispute.dispute_category === "RECURRING_BILLING") {
      queryTerms.push("recurring billing subscription renewal notice POL-REC-301");
    }
    if (dispute.dispute_category === "DIGITAL_GOODS") {
      queryTerms.push("digital goods license key download server logs POL-DIG-202");
    }

    const searchQuery = queryTerms.join(" ");
    const retrievedChunks: RetrievedPolicyChunk[] = await defaultVectorAdapter.query(searchQuery, 4);

    const applicablePolicyIds = Array.from(new Set(retrievedChunks.map((c) => c.policy_id)));
    const complianceNotes =
      `Retrieved ${retrievedChunks.length} authoritative policy clauses matching vector query. ` +
      `Identified applicable policies: ${applicablePolicyIds.join(", ")}. Top chunk similarity: ${(
        (retrievedChunks[0]?.similarity_score || 0) * 100
      ).toFixed(1)}%.`;

    const result: PolicyRetrievalResult = {
      retrieved_chunks: retrievedChunks,
      applicable_policy_ids: applicablePolicyIds,
      compliance_notes: complianceNotes,
    };

    const latencyMs = Math.round(performance.now() - startTime);

    const trace: AgentExecutionTrace = {
      agent_id: "agent_02_compliance_rag",
      agent_name: "Policy & Compliance RAG Agent",
      latency_ms: latencyMs,
      status: "SUCCESS",
      input_summary: `Vector query formulated for ${dispute.dispute_category} ($${dispute.amount.toFixed(2)}) across indexed knowledge base`,
      output_summary: `Indexed search returned ${retrievedChunks.length} chunks. Applicable policies: ${applicablePolicyIds.join(", ")}`,
      details: {
        searchQuery,
        retrievedCount: retrievedChunks.length,
        applicablePolicyIds,
        topSimilarity: retrievedChunks[0]?.similarity_score,
        chunks: retrievedChunks.map((c) => ({
          policy_id: c.policy_id,
          clause_id: c.clause_id,
          score: c.similarity_score,
        })),
      },
    };

    return {
      result,
      trace,
      tokenCount: { prompt: 350, completion: 150 },
    };
  }
}
