import { AntiHallucinationGuardrailVerifier } from "../guardrails/verifier";
import { MultiAgentLLMClient } from "../llm/client";
import {
  AgentExecutionTrace,
  Dispute,
  FinalResolution,
  GuardrailAudit,
  InvestigationReport,
  PolicyRetrievalResult,
} from "../types";

export interface ResolutionVerifierAgentOutput {
  resolution: FinalResolution;
  guardrailAudit: GuardrailAudit;
  trace: AgentExecutionTrace;
  tokenCount: { prompt: number; completion: number };
}

export class ResolutionVerifierAgent {
  public static async execute(
    dispute: Dispute,
    investigation: InvestigationReport,
    ragResult: PolicyRetrievalResult
  ): Promise<ResolutionVerifierAgentOutput> {
    const startTime = performance.now();

    // 1. Synthesize candidate resolution
    const { resolution: rawResolution, tokens } = await MultiAgentLLMClient.runResolutionAgent(
      dispute,
      investigation,
      ragResult
    );

    // 2. Pass through strict Anti-Hallucination Guardrail Verification
    const { validatedResolution, audit } = AntiHallucinationGuardrailVerifier.verifyAndEnforce(
      dispute,
      investigation,
      ragResult,
      rawResolution
    );

    const latencyMs = Math.round(performance.now() - startTime);

    const trace: AgentExecutionTrace = {
      agent_id: "agent_03_resolution_verifier",
      agent_name: "Resolution & Guardrail Verifier Agent",
      latency_ms: latencyMs,
      status: audit.passed_all_checks ? "SUCCESS" : "ESCALATED",
      input_summary: `Synthesized Investigation (Risk: ${investigation.riskScore}) with RAG Policies (${ragResult.applicable_policy_ids.join(", ")})`,
      output_summary: `Decision: ${validatedResolution.decision} (Confidence: ${(validatedResolution.confidence * 100).toFixed(1)}%). Guardrail Check: ${audit.passed_all_checks ? "PASSED (0 Hallucinations)" : "ESCALATED / AUDIT FLAG"}`,
      details: {
        rawDecision: rawResolution.decision,
        finalDecision: validatedResolution.decision,
        confidence: validatedResolution.confidence,
        citedPolicies: validatedResolution.cited_policy_ids,
        guardrailAudit: audit,
      },
    };

    return {
      resolution: validatedResolution,
      guardrailAudit: audit,
      trace,
      tokenCount: tokens,
    };
  }
}
