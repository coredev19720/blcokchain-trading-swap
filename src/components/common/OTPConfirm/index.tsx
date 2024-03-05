import {FieldLabel} from "@components/common";
import * as S from "./styles";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  RadioButtonUncheckedRounded,
  RadioButtonCheckedRounded,
} from "@mui/icons-material";
interface IProps {
  handleRequest: () => void;
  otp: string;
  handleChangeOTP: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const OTPConfirm = ({ handleRequest, handleChangeOTP, otp }: IProps) => {
  const t = useTranslations("order_book");
  const [countdown, setCountdown] = useState(0);

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
            autoFocus
          />
          <S.OTPButton
            onClick={() => {
              handleRequest();
              setCountdown(30);
            }}
            variant="outlined"
            disabled={!!countdown}
          >
            {!!countdown ? `(${countdown})` : t("fn_ob_cta_token")}
          </S.OTPButton>
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
