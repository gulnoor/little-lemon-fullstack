import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnect from "@/app/lib/connectDatabase";
import User from "@/app/lib/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  await dbConnect();
  try {
    const body = await req.json();
    const { username, password } = body;
    const user = await User.findOne({ username });
    if (user === null) {
      //TODO: redirect to registeration page
      return NextResponse.json({ message: "User not found" });
    }
    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (passwordCorrect) {
      const token = jwt.sign(
        { username, id: user.id },
        process.env.JWT_SEKRET
        // ,{
        //   expiresIn: 1800,
        // }
      );
      return NextResponse.json({ message: "login successful", token });
    }
    return NextResponse.json({ message: "password incorrect" });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: err.message });
  }
}
