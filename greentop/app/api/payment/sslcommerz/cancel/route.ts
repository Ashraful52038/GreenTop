import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.formData();
  console.log("⚠️ Payment Cancelled:", Object.fromEntries(body));
  return NextResponse.json({ message: "Payment Cancelled", data: Object.fromEntries(body) });
}
