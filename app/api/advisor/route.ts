import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { buildVerifiedGateAnswer, legalDisclaimer } from "@/lib/verified-data-gate";

export async function POST(req: NextRequest) {
  const input = await req.json();
  const gateAnswer = buildVerifiedGateAnswer(input);

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ mode: "verified-data-gate", answer: gateAnswer });
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      temperature: 0.15,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are Workora AI. You provide general EU employment information only, not legal/tax/accounting/payroll advice. Return JSON only. Do NOT provide exact tax rates, social security percentages, net salary calculations, or definitive legal conclusions unless verified data is supplied. The verified data gate is active unless the provided gate says verified modules are available. Always include disclaimer: ${legalDisclaimer()}`
        },
        { role: "user", content: JSON.stringify({ input, gateAnswer }) }
      ]
    });

    const parsed = JSON.parse(completion.choices[0]?.message?.content || "{}");
    parsed.disclaimer = legalDisclaimer();
    parsed.verification = gateAnswer.verification;
    return NextResponse.json({ mode: "ai-with-verified-data-gate", answer: parsed, fallback: gateAnswer });
  } catch (err: any) {
    return NextResponse.json({ mode: "verified-data-gate-fallback", answer: gateAnswer, error: err?.message });
  }
}
