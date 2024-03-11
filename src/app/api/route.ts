import { NextResponse } from "next/server";
("use strict");

export async function GET() {
  return NextResponse.json({
    hello: "world",
  });
}
