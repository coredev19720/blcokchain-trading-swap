"use client";
import { Button, Slide, Typography } from "@mui/material";
import * as S from "./styles";
interface IProps {
  setStep: (step: number) => void;
}
const FillPassword = ({ setStep }: IProps) => {
  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
      <S.Wrapper>
        <Typography>FillPassword</Typography>
        <Button onClick={() => setStep(2)}>Next to OTP</Button>
      </S.Wrapper>
    </Slide>
  );
};
export default FillPassword;
