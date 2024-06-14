import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnect from "@/app/lib/connectDatabase";
import User from "@/app/lib/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  await dbConnect();
  try {
    const body = await req.json();
    const { email, password } = body;
    const user = await User.findOne({ email });
    if (user === null) {
      //TODO: redirect to registeration page
      return NextResponse.json({ type: "error", message: "User not found" });
    }
    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (passwordCorrect) {
      const token = jwt.sign(
        { email, id: user.id },
        process.env.JWT_SEKRET
        // ,{
        //   expiresIn: 1800,
        // }
      );
      return NextResponse.json({
        type: "success",
        message: "login successful",
        token,
      });
    }
    return NextResponse.json({ type: "error", message: "password incorrect" });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ type: "error", message: err.message });
  }
}
