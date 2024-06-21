import jwt from "jsonwebtoken";
import { NextRequest} from "next/server";
import User from "./models/user";
import serverErrorParser from "./serverErrorHandler";
import dbConnect from "./connectDatabase";

const authenticate = async (request: NextRequest) => {
  dbConnect();
  const token = request.headers.get("authToken");

  if (!token) {
    return {
      type: "error",
      message: "Token not provided",
    };
  }
  try {
    //FIXME: //!Older tokens that didn't have expiry are still working
    const decodedUser = jwt.verify(token, process.env.JWT_SEKRET);
    if (!decodedUser.id) {
      return {
        type: "error",
        message: "Token invalid. Please login again.",
      };
    }
    // check if user exists in database
    const user = await User.findById(decodedUser.id);
    if (user) {
      return {
        type: "success",
        message: "Authentication successfull",
        body: user.toJSON(),
      };
    }
    //token received but user not found
    return {
      type: "error",
      message: "user does not exist",
    };
  } catch (err) {
    return (serverErrorParser(err));
  }
};
export default authenticate;
