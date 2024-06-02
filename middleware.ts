import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  let token = request.headers.get("authorization");
  if (token && token.startsWith("Bearer ")) {
    token = token.replace("Bearer ", "");
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("authToken", token);
    const modifiedRequest = new Request(request, {
      headers: requestHeaders,
    });

    return NextResponse.next({
      request: modifiedRequest,
    });
  }
}
export const config = {
  matcher: "/api/order",
};
