import { NextRequest, NextResponse } from "next/server";
import SSLCommerzPayment from "sslcommerz-lts";


const store_id = process.env.SSLC_STORE_ID!;
const store_passwd = process.env.SSLC_STORE_PASS!;
const is_live = false; // true for live, false for sandbox

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Generate a unique transaction id
    const tran_id = `REF-${Date.now()}`;

    const data = {
      total_amount: body.amount, // amount from client
      currency: "BDT",
      tran_id: tran_id,
      success_url: "http://localhost:3000/success",
      fail_url: "http://localhost:3000/fail",
      cancel_url: "http://localhost:3000/cancel",
      ipn_url: "http://localhost:3000/ipn",
      shipping_method: "Courier",
      product_name: "Basket Items",
      product_category: "Ecommerce",
      product_profile: "general",
      cus_name: body.name || "Customer Name",
      cus_email: body.email || "customer@example.com",
      cus_add1: "Dhaka",
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: body.phone || "01700000000",
      cus_fax: body.phone || "01700000000",
      ship_name: body.name || "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: "1000",
      ship_country: "Bangladesh",
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const apiResponse = await sslcz.init(data);

    return NextResponse.json({ sslcommerzURL: apiResponse.GatewayPageURL });
  } catch (error) {
    console.error("Error initializing SSLCommerz:", error);
    return NextResponse.json({ error: "Failed to create SSLCommerz session" }, { status: 500 });
  }
}
