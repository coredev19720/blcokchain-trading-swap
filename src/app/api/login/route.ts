import { NextResponse } from "next/server";
import { decrypt } from "@src/libs/hash";
import { TAuthType } from "@enum/common";
const axios = require("axios");

export async function POST(req: Request) {
  const { data } = await req.json();
  const { u, p } = data;

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_AP_URL}/sso/oauth/token`,
      {
        username: `${process.env.NEXT_PUBLIC_PREFIX_ACCOUNT}${u}`,
        password: decrypt(p),
        grant_type: TAuthType.password,
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      }
    );
    return NextResponse.json(res.data);
  } catch (e) {
    console.log(e);
  }
}
