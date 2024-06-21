import authenticate from "@/app/lib/jwtAuthentication";
import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export async function POST(request: NextRequest) {
  console.log("creating intent");
  const authenticationStatus = await authenticate(request);
  if (authenticationStatus.type === "success") {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 1099, 
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      return NextResponse.json({type:"success", clientSecret: paymentIntent.client_secret });
    } catch (e) {
      console.log(e);
      return NextResponse.json({
        type: "error",
        message: "intent creation failed",
      });
    }
  }
  return NextResponse.json(authenticationStatus);
}
