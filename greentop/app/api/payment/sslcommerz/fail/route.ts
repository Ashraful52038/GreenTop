import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.formData();
  console.log("❌ Payment Failed:", Object.fromEntries(body));
  return NextResponse.json({ message: "Payment Failed", data: Object.fromEntries(body) });
}
