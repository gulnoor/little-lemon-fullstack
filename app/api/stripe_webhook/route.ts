import dbConnect from "@/app/lib/connectDatabase";
import Order from "@/app/lib/models/order";
import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const webhook_secret = process.env.STRIPE_WEBHOOK_SECRET;
console.log("webhook_secret", webhook_secret);
console.log("stripe", process.env.STRIPE_SECRET_KEY);

export async function POST(request, response) {
  await dbConnect();
  const sig = request.headers.get("stripe-signature");
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      await request.text(),
      sig,
      webhook_secret
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { type: "error", message: err.message },
      { status: 400 }
    );
  }
  // console.log("event", event);
  switch (event.type) {
    case "payment_intent.succeeded":
      console.log("PaymentIntent was successful!");
      const paymentIntent = event.data.object;
      try {
        const updatedOrder = await Order.findOneAndUpdate(
          { paymentIntentId: paymentIntent.id },
          { paymentStatus: "paid" },
          { new: true }
        );
        updatedOrder
          ? null
          : console.log("matching order not found for the intent");
      } catch (error) {
        console.error(error);
      }

      break;
    case "payment_method.attached":
      const paymentMethod = event.data.object;
      console.log("PaymentMethod was attached to a Customer!");
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  return NextResponse.json({ received: true });
}
