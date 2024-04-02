import { NextResponse } from "next/server";
import { decrypt } from "@src/libs/hash";
import { TAuthType } from "@enum/common";
import axiosInst from "@/src/services/Interceptors";
import apiUrls from "@/src/services/apiUrls";

export async function POST(req: Request) {
  const { data } = await req.json();
  const { u, p, c } = data;
  try {
    const data = {
      secret: process.env.RECAPTCHA_SECRET_KEY as string,
      response: c,
    };
    const recaptchaUrl = process.env.RECAPTCHA_VERIFY_URL as string;
    const recaptchaResult = await axiosInst.post(
      `${recaptchaUrl}?${new URLSearchParams(data)}`
    );
    if (recaptchaResult.data.success) {
      const res = await fetch(apiUrls.getInstruments);
      return NextResponse.json(res.data);
    }
    return NextResponse.json("error");
  } catch (e) {
    console.log(e);
    return NextResponse.json("error");
  }
}
