import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.redirect(
    "https://github.com/Swapnil2656/CarboniX/releases/download/latest/carbonix.apk",
    302
  );
}
