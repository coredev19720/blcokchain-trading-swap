import { NextResponse } from "next/server";
import { decrypt } from "@/src/libs/hash";
const axios = require("axios");

export async function POST(req: Request) {
  const data = await req.json();
  console.log("req data", data);
  const { username, password } = data;
  const decryptedPassword = decrypt(password);
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_AP_URL}/sso/oauth/token`,
      { username, password: decryptedPassword }
    );
    console.log(res);
    return NextResponse.json(res.data);
  } catch (e) {
    console.log(e);
  }
}
