import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export async function POST(request: NextRequest) {
    console.log('creating intent');
    
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  return NextResponse.json({ clientSecret: paymentIntent.client_secret });
}
