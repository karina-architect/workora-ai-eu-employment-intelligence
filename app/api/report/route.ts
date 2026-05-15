import { NextRequest, NextResponse } from "next/server";
import { buildVerifiedGateAnswer } from "@/lib/verified-data-gate";

export async function POST(req: NextRequest) {
  const input = await req.json();
  return NextResponse.json({
    title: "Workora AI Information Report",
    type: "information-only-not-legal-advice",
    createdAt: new Date().toISOString(),
    answer: buildVerifiedGateAnswer(input)
  });
}
