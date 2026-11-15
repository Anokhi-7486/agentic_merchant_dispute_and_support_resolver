import { MultiAgentLLMClient } from "../llm/client";
import { AgentExecutionTrace, Dispute, InvestigationReport } from "../types";

export interface InvestigatorAgentOutput {
  report: InvestigationReport;
  trace: AgentExecutionTrace;
  tokenCount: { prompt: number; completion: number };
}

export class InvestigatorAgent {
  public static async execute(dispute: Dispute): Promise<InvestigatorAgentOutput> {
    const startTime = performance.now();

    const { report, tokens } = await MultiAgentLLMClient.runInvestigationAgent(dispute);
    const latencyMs = Math.round(performance.now() - startTime);

    const trace: AgentExecutionTrace = {
      agent_id: "agent_01_investigator",
      agent_name: "Transaction Investigator Agent",
      latency_ms: latencyMs,
      status: "SUCCESS",
      input_summary: `Analyzed ${dispute.id} (${dispute.dispute_category}, $${dispute.amount.toFixed(2)}), Carrier: ${dispute.shipping.carrier}, AVS: ${dispute.telemetry.avs_result}`,
      output_summary: `Computed Risk Score: ${report.riskScore}/100, Trust Score: ${report.merchantTrustScore}/100, Anomalies: ${report.anomalyFlags.length}, Fraud Likelihood: ${report.friendlyFraudLikelihood}`,
      details: {
        riskScore: report.riskScore,
        merchantTrustScore: report.merchantTrustScore,
        shippingVerification: report.shippingVerification,
        avsCvvStatus: report.avsCvvStatus,
        anomalyFlags: report.anomalyFlags,
        friendlyFraudLikelihood: report.friendlyFraudLikelihood,
      },
    };

    return {
      report,
      trace,
      tokenCount: tokens,
    };
  }
}
