import jwt from "jsonwebtoken";
import dbConnect from "@/app/lib/connectDatabase";
import User from "@/app/lib/models/user";
import { NextRequest, NextResponse } from "next/server";
import Reservation from "@/app/lib/models/reservation";

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
      const body = await request.json()
      // FIXME:any random time can create an order
      // Verify time in db before saving booking
      // ...........
      const reservation = new Reservation({ ...body, userId: user.id });
      const savedReservation = await reservation.save();
      // // update orders in user document
      user.reservations = user.reservations.concat(savedReservation.id);
      await user.save();
      return NextResponse.json(savedReservation);
    }
    return new Response("User does not exist");
  } catch (err) {
    console.log(err);
    return new Response(err);
  }
}
