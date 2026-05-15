import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ ok: true, service: "Workora AI Final", timestamp: new Date().toISOString() });
}
