import { NextResponse } from "next/server";
("use strict");
import { serialize } from "cookie";
const axios = require("axios");
import type { NextApiRequest, NextApiResponse } from "next";

export async function GET() {
  console.log("api test");
  return NextResponse.json({
    hello: "world",
  });
}
