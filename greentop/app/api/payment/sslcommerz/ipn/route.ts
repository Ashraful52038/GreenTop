import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.formData();
  console.log("📩 IPN Notification:", Object.fromEntries(body));
  return NextResponse.json({ message: "IPN Received", data: Object.fromEntries(body) });
}

