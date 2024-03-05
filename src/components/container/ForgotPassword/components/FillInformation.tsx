"use client";
import { Button, Slide, TextField } from "@mui/material";
import {FieldLabel} from "@components/common";
import { useState } from "react";
import dayjs from "dayjs";
import * as S from "../styles";
interface IProps {
  setStep: (step: number) => void;
}
interface IFormData {
  username: string;
  name: string;
  birthday: Date;
  issueId: string;
  issueDate: Date;
  phone: string;
  confirmCode: string;
}
const FillInformation = ({ setStep }: IProps) => {
  const [formData, setFormData] = useState<IFormData>({
    username: "",
    name: "",
    birthday: new Date(),
    issueId: "",
    issueDate: new Date(),
    phone: "",
    confirmCode: "",
  });
  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
      <S.StepWrapper>
        <S.FieldBlock>
          <FieldLabel>Tên đăng nhập</FieldLabel>
          <TextField value={formData.username} />
        </S.FieldBlock>
        <S.FieldBlock>
          <FieldLabel>Họ và tên(không dấu, có khoảng trắng)</FieldLabel>
          <TextField value={formData.name} />
        </S.FieldBlock>
        <S.FieldBlock>
          <FieldLabel>Ngày sinh(dd/mm/yyyy)v</FieldLabel>
          <TextField value={dayjs().format("DD/MM/YYYY")} />
        </S.FieldBlock>
        <S.FieldBlock>
          <FieldLabel>Số ĐKSH (CMND, hộ chiếu…)</FieldLabel>
          <TextField value={formData.issueId} />
        </S.FieldBlock>
        <S.FieldBlock>
          <FieldLabel>Ngày cấp(dd/mm/yyyy)</FieldLabel>
          <TextField value={dayjs().format("DD/MM/YYYY")} />
        </S.FieldBlock>
        <S.FieldBlock>
          <FieldLabel>Số điện thoại di động đăng ký nhận thông báo</FieldLabel>
          <TextField value={formData.phone} />
        </S.FieldBlock>
        <Button
          onClick={() => setStep(1)}
          variant="contained"
          color="primary"
          fullWidth
        >
          Đồng ý
        </Button>
      </S.StepWrapper>
    </Slide>
  );
};
export default FillInformation;
