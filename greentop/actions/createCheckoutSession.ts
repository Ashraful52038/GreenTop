'use server'

import imageUrl from "@/lib/imageUrl";
import stripe from "@/lib/stripe";
import { BasketItem } from "@/store/store";

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
};

export type GroupedBasketItem = {
  product: BasketItem["product"];
  quantity: number;
};

export async function createCheckoutSession(
  items: GroupedBasketItem[],
  metadata: Metadata
) {
  try {
    // Validate all items have prices
    const itemsWithoutPrice = items.filter((item) => !item.product.price);
    if (itemsWithoutPrice.length > 0) {
      throw new Error("Some items do not have a price");
    }

    // Check for existing customer
    const customer = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.data[0]?.id || undefined,
      customer_email: !customer.data[0]?.id ? metadata.customerEmail : undefined,
      mode: "payment",
      allow_promotion_codes: true,
      success_url: `${
        process.env.VERCEL_URL || process.env.NEXT_PUBLIC_BASE_URL
      }/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${
        metadata.orderNumber
      }`,
      cancel_url: `${
        process.env.VERCEL_URL || process.env.NEXT_PUBLIC_BASE_URL
      }/basket`,
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          unit_amount: Math.round(item.product.price! * 100),
          product_data: {
            name: item.product.name || "Unnamed Product",
            description: `Product ID: ${item.product._id}`,
            metadata: {
              id: item.product._id,
            },
            images: item.product.image
              ? [imageUrl(item.product.image).url()]
              : undefined,
          },
        },
        quantity: item.quantity,
      })),
    });

    return session.url;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
}