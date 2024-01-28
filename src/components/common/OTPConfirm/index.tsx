import FieldLabel from "@/src/components/common/FieldLabel";
import * as S from "./styles";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface IProps {
  handleRequest: () => void;
  otp: string;
  handleChangeOTP: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const OTPConfirm = ({ handleRequest, handleChangeOTP, otp }: IProps) => {
  const t = useTranslations("order_book");
  const handleClickCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
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
          />
          <S.OTPButton onClick={handleRequest} variant="outlined">
            {t("fn_ob_cta_token")}
          </S.OTPButton>
        </S.OTPInput>
      </S.OTP>
      <FormControlLabel
        label={t("fn_ob_inp_saveToken")}
        control={<Checkbox onChange={handleClickCheckBox} />}
      />
    </S.Wrapper>
  );
};
export default OTPConfirm;
