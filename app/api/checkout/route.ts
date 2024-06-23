import dbConnect from "@/app/lib/connectDatabase";
import authenticate from "@/app/lib/jwtAuthentication";
import ordermodel from "@/app/lib/models/order";
import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const calculateTotal = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export async function POST(request: NextRequest) {
  await dbConnect();
  const Order = ordermodel;
  const authenticationStatus = await authenticate(request);
  if (authenticationStatus.type === "success") {
    const items = await request.json();
    if (items.length < 1) {
      return NextResponse.json({ type: "error", message: "Cart empty" });
    }
    const amount = calculateTotal(items) * 100;
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      const user = authenticationStatus.user;
      //! any random item id can create an order
      // Verify items ids in request body before saving order
      // ...........
      // save order to orders collection
      const itemIds = items.map((item) => item.id);

      const order = new Order({
        items: itemIds,
        userId: user.id,
        paymentIntentId: paymentIntent.id,
      });
      if (order.items.length < 1) {
        return NextResponse.json({
          type: "error",
          message: "Order cannot be empty",
        });
      }
      const savedOrder = await order.save();
      // update orders in user document
      user.orders = user.orders.concat(savedOrder.id);
      await user.save();
      return NextResponse.json({
        type: "success",
        clientSecret: paymentIntent.client_secret,
        // order: savedOrder.toJSON(),
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
