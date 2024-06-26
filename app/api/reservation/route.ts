import jwt from "jsonwebtoken";
import dbConnect from "@/app/lib/connectDatabase";
import User from "@/app/lib/models/user";
import { NextRequest, NextResponse } from "next/server";
import Reservation from "@/app/lib/models/reservation";

export async function POST(request: NextRequest, response: NextResponse) {
  await dbConnect();
  try {
    const token = request.headers.get("authToken");
    const body = await request.json();
    const { date, time } = body;
    const alreadyTaken = await Reservation.find({ date, time });
    if (alreadyTaken.length !== 0) {
      return NextResponse.json({
        type: "error",
        message: "Date and time is already booked",
      });
    }
    // two cases:
    // case 1. guest
    if (!token) {
      const reservation = new Reservation({ ...body });
      const savedReservation = await reservation.save();
      const responseBody = savedReservation.toJSON();
      return NextResponse.json({
        type: "success",
        message: "Reservation made successfully. Thank You",
        body: responseBody,
      });
    }
    // case 2: user logged in
    // decode token
    // ! Older tokens that didn't have expiry are still working
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
      const reservation = new Reservation({ ...body, userId: user.id });
      const savedReservation = await reservation.save();
      // // update orders in user document
      user.reservations = user.reservations.concat(savedReservation.id);
      await user.save();
      const responseBody = savedReservation.toJSON();
      return NextResponse.json({
        type: "success",
        message: "Reservation made successfully. Thank You",
        body: responseBody,
      });
    }
    //token received but user not found
    return NextResponse.json({
      type: "error",
      message: "user not found in database",
    });
  } catch (err) {
    return NextResponse.json({ type: "error", message: err.message });
  }
}
