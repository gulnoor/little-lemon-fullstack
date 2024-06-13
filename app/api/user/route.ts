import dbConnect from "@/app/lib/connectDatabase";
import bcrypt from "bcrypt";
import User from "@/app/lib/models/user";
import { NextRequest, NextResponse } from "next/server";

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
    return NextResponse.json(savedUser);
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
