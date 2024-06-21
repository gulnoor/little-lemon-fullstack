export default function serverErrorParser(error) {
  console.error(error);
  let message = "Internal server error";
  if (error.name === "MongooseError" || error.name === "MissingSchemaError") {
    message = "Internal Database Error: Please try again";
    return { type: "error", message };
  } else if (error.name === "TokenExpiredError") {
    message = "Session timed out. Please Login again.";
  } else if (error.message === "jwt malformed") {
    message = "User authentication failed. Please Login first";
  }
  return { type: "error", message };
}
