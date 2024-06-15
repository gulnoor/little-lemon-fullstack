import dbConnect from "./app/lib/connectDatabase";

export function register() {
  console.log("running instrumentation");

  //connect to database
  dbConnect();
  // setup mongoose models
  require("./app/lib/models/order");
  require("./app/lib/models/reservation");
  require("./app/lib/models/menuItem");
  require("./app/lib/models/user");
}
