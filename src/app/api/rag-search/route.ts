import { NextRequest, NextResponse } from "next/server";
import { defaultVectorAdapter } from "../../../lib/rag/pineconeAdapter";
import { vectorStore } from "../../../lib/rag/vectorStore";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "seller protection tangible delivery signature";
  const topK = parseInt(searchParams.get("topK") || "4", 10);

  const results = await defaultVectorAdapter.query(query, topK);
  const health = await defaultVectorAdapter.healthCheck();

  return NextResponse.json({
    success: true,
    query,
    results,
    health,
  });
}

export async function POST(req: NextRequest) {
  try {
    const { query, topK } = await req.json();
    if (!query) {
      return NextResponse.json({ success: false, error: "Missing query text" }, { status: 400 });
    }

    const results = await defaultVectorAdapter.query(query, topK || 4);
    const allPolicies = vectorStore.getAllPolicies();

    return NextResponse.json({
      success: true,
      query,
      results,
      total_policies_indexed: allPolicies.length,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error executing vector search";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
