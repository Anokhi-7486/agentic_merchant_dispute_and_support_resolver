import { MultiAgentLLMClient } from "../llm/client";
import { Dispute, DisputeResolutionResponse } from "../types";
import { ComplianceRagAgent } from "./complianceRagAgent";
import { InvestigatorAgent } from "./investigatorAgent";
import { ResolutionVerifierAgent } from "./resolutionVerifierAgent";

export class MultiAgentOrchestrator {
  public static async resolveDispute(dispute: Dispute): Promise<DisputeResolutionResponse> {
    const pipelineStartTime = performance.now();

    // Step 1: Execute Investigator Agent
    const investigatorOutput = await InvestigatorAgent.execute(dispute);

    // Step 2: Execute Policy & Compliance RAG Agent
    const ragOutput = await ComplianceRagAgent.execute(dispute, investigatorOutput.report);

    // Step 3: Execute Resolution & Guardrail Verifier Agent
    const resolutionOutput = await ResolutionVerifierAgent.execute(
      dispute,
      investigatorOutput.report,
      ragOutput.result
    );

    const totalLatencyMs = Math.round(performance.now() - pipelineStartTime);

    // Aggregate tokens & cost
    const promptTokens =
      investigatorOutput.tokenCount.prompt +
      ragOutput.tokenCount.prompt +
      resolutionOutput.tokenCount.prompt;
    const completionTokens =
      investigatorOutput.tokenCount.completion +
      ragOutput.tokenCount.completion +
      resolutionOutput.tokenCount.completion;

    // Gemini 1.5/2.5 Flash pricing: ~$0.075 / 1M prompt, $0.30 / 1M completion
    const estimatedCostUsd = Number(
      ((promptTokens * 0.000000075) + (completionTokens * 0.0000003)).toFixed(6)
    );

    const traces = [
      investigatorOutput.trace,
      ragOutput.trace,
      resolutionOutput.trace,
    ];

    return {
      dispute_id: dispute.id,
      transaction_id: dispute.transaction_id,
      investigation: investigatorOutput.report,
      policy_retrieval: ragOutput.result,
      resolution: resolutionOutput.resolution,
      guardrail_audit: resolutionOutput.guardrailAudit,
      traces,
      total_latency_ms: totalLatencyMs,
      telemetry: {
        engine: MultiAgentLLMClient.getEngineName(),
        prompt_tokens: promptTokens,
        completion_tokens: completionTokens,
        estimated_cost_usd: estimatedCostUsd,
        guardrail_version: "2.4.0-fintech-strict",
      },
    };
  }
}
