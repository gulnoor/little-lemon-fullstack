export default function errorParser(error) {
  let e = { type: "error", message: "" };
  if (error.name === "SyntaxError") {
    e.message =
      "Error while parsing the response. Response from server was not in the expected format";
    return e;
  }
  e.message = error.message;
  return e;
}
