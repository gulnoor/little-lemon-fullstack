import serverErrorHandler from "@/app/lib/serverErrorHandler";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/app/lib/models/user";

export async function POST(request: NextRequest) {
  const token = request.headers.get("authToken");

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
