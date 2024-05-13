"use client";
import FieldLabel from "../FieldLabel";
import * as S from "./styles";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  RadioButtonUncheckedRounded,
  RadioButtonCheckedRounded,
} from "@mui/icons-material";
import { TPinAuthType } from "@/src/constraints/enum/common";
interface IProps {
  handleRequest: () => void;
  otp: string;
  handleChangeOTP: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: TPinAuthType;
  genSuccess: boolean;
  handleCheckBox: (val: boolean) => void;
}
const OTPConfirm = ({
  handleRequest,
  handleChangeOTP,
  otp,
  type,
  genSuccess,
  handleCheckBox,
}: IProps) => {
  const t = useTranslations("order_book");
  const [countdown, setCountdown] = useState(0);
  const countdownTime = process.env.NEXT_PUBLIC_OTP_COUNTDOWN
    ? Number(process.env.NEXT_PUBLIC_OTP_COUNTDOWN)
    : 30;
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Update countdown every 1 second
      setCountdown((prevCountdown) =>
        prevCountdown === 0 ? 0 : prevCountdown - 1
      );

      // Clear interval and restart countdown when it reaches 0
      if (countdown === 0) {
        clearInterval(intervalId);
      }
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [countdown]);
  useEffect(() => {
    if (genSuccess) {
      setCountdown(countdownTime);
    }
  }, [genSuccess]);

  const handleClickCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleCheckBox(e.target.checked);
  };

  return (
    <S.Wrapper>
      <S.OTP>
        <FieldLabel>{t("fn_ob_inp_token")}</FieldLabel>
        <S.OTPInput>
          <TextField
            value={otp}
            onChange={handleChangeOTP}
            type="number"
            fullWidth
            autoFocus
          />
          {type === TPinAuthType.SMSOTP && (
            <S.OTPButton
              onClick={handleRequest}
              variant="outlined"
              disabled={!!countdown}
            >
              {countdown ? `(${countdown})` : t("fn_ob_cta_token")}
            </S.OTPButton>
          )}
        </S.OTPInput>
      </S.OTP>
      <FormControlLabel
        label={t("fn_ob_inp_saveToken")}
        control={
          <Checkbox
            icon={<RadioButtonUncheckedRounded />}
            checkedIcon={<RadioButtonCheckedRounded />}
            onChange={handleClickCheckBox}
          />
        }
      />
    </S.Wrapper>
  );
};
export default OTPConfirm;
