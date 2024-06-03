import dbConnect from "@/app/lib/connectDatabase";
import menuItem from "@/app/lib/models/menuItem";
import { unstable_noStore } from "next/cache";

export async function GET(request: Request) {
  await dbConnect();
  try {
    const result = await menuItem.find({});
    return Response.json(result);
  } catch (err) {
    console.log(err);
  }
}
