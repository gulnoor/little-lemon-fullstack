import dbConnect from "@/app/lib/connectDatabase";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "@/app/lib/models/user";
import Order from "@/app/lib/models/order";
import { NextRequest, NextResponse } from "next/server";
import reservation from "@/app/lib/models/reservation";
import serverErrorHandler from "@/app/lib/serverErrorHandler";
import { unstable_noStore } from "next/cache";

export async function POST(request: NextRequest, response: NextResponse) {
  await dbConnect();
  try {
    // TODO: add password validation
    const userData = await request.json();
    const { email } = userData;
    const alreadyTaken = await User.find({ email });
    if (alreadyTaken.length !== 0) {
      return NextResponse.json({
        type: "error",
        message: "email already belongs to an account",
      });
    }
    const hash = await bcrypt.hash(userData.password, 10);
    delete userData.password;
    userData.passwordHash = hash;
    const user = new User(userData);
    const savedUser = await user.save();
    const responseBody = await savedUser.toJSON();
    return NextResponse.json({
      type: "success",
      message: "Account created successfully",
      body: responseBody,
    });
  } catch (error) {
    console.log(error);
    if (error.message.includes("E11000 duplicate key error")) {
      return NextResponse.json({
        type: "error",
        message: "db error: user already taken",
      });
    }
    return NextResponse.json({
      type: "error",
      message: error.message,
    });
  }
}
export async function GET(request: NextRequest) {
  await dbConnect();
  //FIXME: //!Don't use token in "GET" request. not safe
  unstable_noStore();
  const token = request.headers.get("authToken");
  const OrderModel = Order;
  const Reservation = reservation;

  if (!token) {
    return NextResponse.json({
      type: "error",
      message: "Authentication failed. Please log in again",
    });
  }
  try {
    //FIXME: //!Older tokens that didn't have expiry are still working
    const decodedUser = jwt.verify(token, process.env.JWT_SEKRET);
    if (!decodedUser.id) {
      return NextResponse.json({
        type: "error",
        message: "Token invalid. Please login again.",
      });
    }
    // check if user exists in database
    const user = await User.findById(decodedUser.id);
    if (user) {
      await user.populate({
        path: "orders",
        select: "items",
        populate: { path: "items" },
      });
      await user.populate("reservations");

      return NextResponse.json({
        type: "success",
        message: "Authentication successfull",
        body: user.toJSON(),
      });
    }
    //token received but user not found
    return NextResponse.json({
      type: "error",
      message: "user does not exist",
    });
  } catch (err) {
    return serverErrorHandler(err);
  }
}
