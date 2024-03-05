"use client";
import { Button, Slide, TextField, Typography } from "@mui/material";
import * as S from "../styles";
import {FieldLabel } from "@components/common";
import { useState } from "react";
interface IProps {
  setStep: (step: number) => void;
}
const FillPassword = ({ setStep }: IProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
      <S.StepWrapper>
        <Typography variant="body2">
          Mật khẩu mới của quý khách sử dụng tối thiểu 8 ký tự bao gồm số, chữ
          thường, chữ in hoa và ký tự đặc biệt
        </Typography>
        <S.FieldBlock>
          <FieldLabel>Mật khẩu mới</FieldLabel>
          <TextField value={password} />
        </S.FieldBlock>
        <S.FieldBlock>
          <FieldLabel>Xác nhận mật khẩu mới</FieldLabel>
          <TextField value={confirmPassword} />
        </S.FieldBlock>
        <Button
          onClick={() => setStep(3)}
          variant="contained"
          color="primary"
          fullWidth
        >
          Cập nhật
        </Button>
      </S.StepWrapper>
    </Slide>
  );
};
export default FillPassword;
