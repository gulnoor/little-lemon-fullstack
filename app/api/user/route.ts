import dbConnect from "@/app/lib/connectDatabase";
import bcrypt from "bcrypt";
import User from "@/app/lib/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  await dbConnect();
  try {
    // TODO: add password validation
    const userData = await request.json();
    const hash = await bcrypt.hash(userData.password, 10);
    delete userData.password;
    userData.passwordHash = hash;
    const user = new User(userData);
    const result = await user.save();
    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    if (error.message.includes("E11000 duplicate key error")) {
      return new Response("Username already taken");
    }
    return new Response(error.message);
  }
}
