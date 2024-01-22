import FieldLabel from "@/src/components/common/FieldLabel";
import * as S from "./styles";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useTranslations } from "next-intl";
const OtpConfirm = () => {
  const t = useTranslations("order_book");
  const [otp, setOtp] = useState<number | null>(null);
  const handleChangeOtp = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const handleRequestOtp = () => {
    console.log("request otp");
  };
  return (
    <S.Wrapper>
      <FieldLabel>{t("fn_ob_inp_token")}</FieldLabel>
      <TextField value={otp || null} onChange={handleChangeOtp} type="number" />
      <Button onClick={handleRequestOtp} variant="outlined">
        {t("fn_ob_cta_token")}
      </Button>
    </S.Wrapper>
  );
};
export default OtpConfirm;
