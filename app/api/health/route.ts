import { NextResponse } from "next/server";
export async function GET(){return NextResponse.json({ok:true,service:"Workora AI V6",timestamp:new Date().toISOString()});}
