import { NextRequest, NextResponse } from "next/server";

// This value never reaches the client: route handlers run only on the
// server, so it is not present in any JS bundle, page source, or
// "view source" / devtools output.
const UNLOCK_CODE = "KQJ222";

export async function POST(request: NextRequest) {
  let code = "";

  try {
    const body = await request.json();
    code = typeof body?.code === "string" ? body.code : "";
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const success = code.trim().toUpperCase() === UNLOCK_CODE;
  return NextResponse.json({ success });
}
