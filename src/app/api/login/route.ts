import { NextResponse } from "next/server";
import { decrypt } from "@src/libs/hash";
import { TAuthType } from "@enum/common";
import axiosInst from "@/src/services/Interceptors";

export async function POST(req: Request) {
  const { data } = await req.json();
  const { u, p, captchaToken } = data;
  try {
    // const data = {
    //   secret: process.env.RECAPTCHA_SITE_KEY,
    //   response: captchaToken,
    // };
    // console.log(data);
    // const recaptchaValid = await axiosInst.post(
    //   process.env.RECAPTCHA_VERIFY_URL || "",
    //   data
    // );
    const res = await axiosInst.post(
      `${process.env.NEXT_PUBLIC_API_URL}/sso/oauth/token`,
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
