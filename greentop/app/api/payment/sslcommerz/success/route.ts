import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.formData();
  console.log("✅ Payment Success:", Object.fromEntries(body));
  return NextResponse.json({ message: "Payment Successful", data: Object.fromEntries(body) });
}
