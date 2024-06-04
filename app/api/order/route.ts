import jwt from "jsonwebtoken";
import dbConnect from "@/app/lib/connectDatabase";
import Order from "@/app/lib/models/order";
import User from "@/app/lib/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  await dbConnect();
  try {
    const token = request.headers.get("authToken");

    // decode token
    // FIXME: Older tokens that didn't have expiry are still working
    const decodedUser = jwt.verify(token, process.env.JWT_SEKRET);
    if (!decodedUser.id) {
      return NextResponse.json({ error: "token invalid" });
    }
    // check if user exists in database
    const user = await User.findById(decodedUser.id);
    if (user) {
      // FIXME:any random item id can create an order
      // Verify items ids in request body before saving order
      // ...........
      // save order to orders collection
      const body = await request.json();

      const order = new Order({ ...body, userId: user.id });
      if (order.items.length < 1) {
        return new Response("Order cannot be empty");
      }
      const savedOrder = await order.save();
      // update orders in user document
      user.orders = user.orders.concat(savedOrder.id);
      await user.save();
      return NextResponse.json(savedOrder);
    }
    return new Response("User does not exist");
  } catch (err) {
    console.log(err);
    return new Response(err);
  }
}
export async function GET(request: NextRequest, response: NextResponse) {
  await dbConnect();
  try {
    const token = request.headers.get("authToken");

    // decode token
    const decodedUser = jwt.verify(token, process.env.JWT_SEKRET);
    if (!decodedUser.id) {
      return NextResponse.json({ error: "token invalid" });
    }
    // check if user exists in database
    let user = await User.findById(decodedUser.id);
    if (user) {
      await user.populate({
        path: "orders",
        select: "items",
        populate: { path: "items"},
      });

      return NextResponse.json(user);
    }
    return new Response("User does not exist");
  } catch (err) {
    console.log(err);
    return new Response(err);
  }
}
