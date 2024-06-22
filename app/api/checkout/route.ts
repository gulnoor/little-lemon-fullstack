import authenticate from "@/app/lib/jwtAuthentication";
import { NextRequest, NextResponse } from "next/server";
//TODO: confirm payment success
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const calculateTotal = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};
export async function POST(request: NextRequest) {
  console.log("creating intent");
  const authenticationStatus = await authenticate(request);
  if (authenticationStatus.type === "success") {
    const items = await request.json();
    if (items.length < 1) {
      return NextResponse.json({ type: "error", message: "Cart empty" });
    }
    const amount = calculateTotal(items)*100;
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      return NextResponse.json({
        type: "success",
        clientSecret: paymentIntent.client_secret,
      });
    } catch (e) {
      console.error(e);
      return NextResponse.json({
        type: "error",
        message: e.message,
      });
    }
  }
  return NextResponse.json(authenticationStatus);
}
