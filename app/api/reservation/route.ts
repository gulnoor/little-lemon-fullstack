import jwt from "jsonwebtoken";
import dbConnect from "@/app/lib/connectDatabase";
import User from "@/app/lib/models/user";
import { NextRequest, NextResponse } from "next/server";
import Reservation from "@/app/lib/models/reservation";

export async function POST(request: NextRequest, response: NextResponse) {
  console.log("1");

  await dbConnect();
  console.log("2");
  try {
    console.log("3");
    const token = request.headers.get("authToken");
    console.log("4");
    const body = await request.json();
    console.log("5");
    const { date, time } = body;
    console.log("6");
    const alreadyTaken = await Reservation.find({ date, time });
    console.log("7");
    if (alreadyTaken.length !== 0) {
      console.log("8");
      return NextResponse.json({
        type: "error",
        message: "Date and time is already booked",
      });
    }
    // two cases:
    // case 1. guest
    console.log("9");
    if (!token) {
      console.log("10");
      const reservation = new Reservation({ ...body });
      console.log("11");
      const savedReservation = await reservation.save();
      console.log("12");
      return NextResponse.json(savedReservation);
    }
    // case 2: user logged in
    // decode token
    // FIXME: Older tokens that didn't have expiry are still working
    console.log("13");
    const decodedUser = jwt.verify(token, process.env.JWT_SEKRET);
    console.log("14");
    if (!decodedUser.id) {
      console.log("15");
      return NextResponse.json({ error: "token invalid" });
    }
    // check if user exists in database
    const user = await User.findById(decodedUser.id);
    console.log("16");
    if (user) {
      console.log("17");
      const reservation = new Reservation({ ...body, userId: user.id });
      console.log("18");
      const savedReservation = await reservation.save();
      console.log("19");
      // // update orders in user document
      user.reservations = user.reservations.concat(savedReservation.id);
      await user.save();
      return NextResponse.json(savedReservation);
    }
    //token received but user not found
    console.log("20");
    return NextResponse.json({
      type: "error",
      messsage: "user does not exist",
    });
  } catch (err) {
    console.log("21");
    return NextResponse.json({ type: "error", messsage: err.message });
  }
}
