// app/api/payment/bkash/route.ts

import { NextResponse, NextRequest } from "next/server";
import connectDb from "@/config/db"; // your MongoDB connection
import { v4 as uuidv4 } from "uuid";

connectDb();

export async function post(params:type) {
  
}