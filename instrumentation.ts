import dbConnect from "./app/lib/connectDatabase";

export function register() {
  //connect to database
  dbConnect();
  // setup mongoose models
  require("./models/order");
  require("./models/reservation");
  require("./models/menuItem");
  require("./models/user");
}
