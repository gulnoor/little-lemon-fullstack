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
      return NextResponse.json(savedReservation);
    }
    // case 2: user logged in
    // decode token
    // FIXME: Older tokens that didn't have expiry are still working
    const decodedUser = jwt.verify(token, process.env.JWT_SEKRET);
    if (!decodedUser.id) {
      return NextResponse.json({ error: "token invalid" });
    }
    // check if user exists in database
    const user = await User.findById(decodedUser.id);
    if (user) {
      const reservation = new Reservation({ ...body, userId: user.id });
      const savedReservation = await reservation.save();
      // // update orders in user document
      user.reservations = user.reservations.concat(savedReservation.id);
      await user.save();
      return NextResponse.json(savedReservation);
    }
    //token received but user not found
    return NextResponse.json({ type: "error", messsage: "user does not exist" });
  } catch (err) {
    return NextResponse.json({ type: "error", messsage: err.message });
  }
}
