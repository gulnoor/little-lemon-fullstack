import serverErrorParser from "@/app/lib/serverErrorHandler";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/app/lib/models/user";
import dbConnect from "@/app/lib/connectDatabase";
import reservation from "@/app/lib/models/reservation";
import order from "@/app/lib/models/order";

export async function POST(request: NextRequest) {
  await dbConnect();
  // // const Order = order;
  // //const Reservation = reservation;
  const token = request.headers.get("authToken");

  if (!token) {
    return NextResponse.json({
      type: "error",
      message: "Authentication failed. Please log in again",
    });
  }
  try {
    //FIXME://!Older tokens that didn't have expiry are still working
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
    return NextResponse.json(serverErrorParser(err));
  }
}
