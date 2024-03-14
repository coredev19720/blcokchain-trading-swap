"use client";
import Header from "../Login/Header";
import * as S from "./styles";
import FillInformation from "./components/FillInformation";
import FillPassword from "./components/FillPassword";
import Success from "./components/Success";
import FillOTP from "./components/FillOTP";
import { useRouter, useSearchParams } from "next/navigation";
const enum step {
  fi = "fi",
  fo = "fo",
  fp = "fp",
  f = "f",
}
const ForgotPassword = () => {
  const sParams = useSearchParams();
  const router = useRouter();
  if (!sParams?.get("s")) {
    router.push("login");
  }
  return (
    <S.Wrapper>
      <Header />
      <S.Content>
        {sParams?.get("s") === step.fi && <FillInformation />}
        {sParams?.get("s") === step.fo && <FillOTP />}
        {sParams?.get("s") === step.fp && <FillPassword />}
        {sParams?.get("s") === step.f && <Success />}
      </S.Content>
    </S.Wrapper>
  );
};
export default ForgotPassword;
