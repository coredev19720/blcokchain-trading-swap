"use client";
import { useState } from "react";
import Header from "../Login/Header";
import * as S from "./styles";
import FillInformation from "./components/FillInformation";
import FillPassword from "./components/FillPassword";
import Success from "./components/Success";
import FillOTP from "./components/FillOTP";
type step = "fill_information" | "fill_otp" | "fill_password" | "success";
const steps = ["fill_information", "fill_otp", "fill_password", "success"];
const ForgotPassword = () => {
  const [step, setStep] = useState(0);
  return (
    <S.Wrapper>
      <Header />
      <S.Content>
        {step === 0 && <FillInformation setStep={setStep} />}
        {step === 1 && <FillOTP setStep={setStep} />}
        {step === 2 && <FillPassword setStep={setStep} />}
        {step === 3 && <Success />}
      </S.Content>
    </S.Wrapper>
  );
};
export default ForgotPassword;
