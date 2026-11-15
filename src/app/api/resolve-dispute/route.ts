import { NextRequest, NextResponse } from "next/server";
import transactionsData from "../../../../data/transactions.json";
import { MultiAgentOrchestrator } from "../../../lib/agents/orchestrator";
import { Dispute } from "../../../lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let dispute: Dispute | undefined = body.dispute;

    if (!dispute && body.disputeId) {
      const all = transactionsData as Dispute[];
      dispute = all.find((d) => d.id === body.disputeId);
    }

    if (!dispute) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing dispute object or invalid disputeId",
        },
        { status: 400 }
      );
    }

    const resolutionResult = await MultiAgentOrchestrator.resolveDispute(dispute);

    return NextResponse.json({
      success: true,
      data: resolutionResult,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
