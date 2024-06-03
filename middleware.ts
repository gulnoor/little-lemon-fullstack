import { NextRequest, NextResponse } from "next/server";
function iteratorToObject(iterator) {
  const obj = {};
  for (const [key, value] of iterator) {
    obj[key] = value;
  }
  return obj;
}
export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  let token = request.headers.get("authorization");

  let body = {};
  try {
    body = await request.json();
  } catch (err) {
    return NextResponse.json({ error: err.message });
  }
  console.log(
    `-------------------------
    Method: ${request.method}
    Path: ${request.url}
    Body: ${JSON.stringify(body)}
    -----------------------`
  );
  if (token && token.startsWith("Bearer ")) {
    token = token.replace("Bearer ", "");
    requestHeaders.set("authToken", token);
  }
  const modifiedRequest = new Request(request, {
    headers: requestHeaders,
  });
  return NextResponse.next({
    request: modifiedRequest,
  });
}
export const config = {
  matcher: ["/api/order", "/api/reservation"],
};
