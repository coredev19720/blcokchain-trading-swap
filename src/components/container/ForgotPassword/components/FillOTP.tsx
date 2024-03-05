"use client";
import { Button, Slide, TextField } from "@mui/material";
import FieldLabel from "@components/common/FieldLabel";
import { useState } from "react";
import * as S from "../styles";
interface IProps {
  setStep: (step: number) => void;
}
const FillOTP = ({ setStep }: IProps) => {
  const [otp, setOtp] = useState<string>("");
  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
      <S.StepWrapper>
        <S.FieldBlock>
          <FieldLabel>
            Quý khách hàng vui lòng nhập mã xác thực OTP đã được gửi về số di
            động đăng ký nhận thông báo.
          </FieldLabel>
          <TextField value={otp} />
        </S.FieldBlock>
        <Button
          onClick={() => setStep(2)}
          variant="contained"
          color="primary"
          fullWidth
        >
          Xác nhận
        </Button>
      </S.StepWrapper>
    </Slide>
  );
};
export default FillOTP;
