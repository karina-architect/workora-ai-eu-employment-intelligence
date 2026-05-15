import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const endpoint = process.env.FORMSPREE_ENDPOINT || "https://formspree.io/f/xkokebwk";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      source: "Workora AI",
      legalDisclaimer: "Information only — not legal, tax, accounting, payroll or immigration advice.",
      ...body
    })
  });
  return NextResponse.json({ ok: response.ok, status: response.status }, { status: response.ok ? 200 : 502 });
}
