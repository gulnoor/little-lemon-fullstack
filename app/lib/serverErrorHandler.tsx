import { NextResponse } from "next/server";

export default function serverErrorHandler(error) {
  let message = "Internal server error";
  console.error(error);
  if (error.name === "MongooseError" || error.name === "MissingSchemaError") {
    message = "Internal Database Error: Please try again";
    return NextResponse.json({ type: "error", message });
  }
  return NextResponse.json({ type: "error", message });
}
