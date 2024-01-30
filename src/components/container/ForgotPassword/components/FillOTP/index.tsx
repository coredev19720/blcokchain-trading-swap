"use client";
import { Button, Slide, Typography } from "@mui/material";
import * as S from "./styles";
interface IProps {
  setStep: (step: number) => void;
}
const FillOTP = ({ setStep }: IProps) => {
  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
      <S.Wrapper>
        <Typography>FillOTP</Typography>
        <Button onClick={() => setStep(3)}>Next</Button>
      </S.Wrapper>
    </Slide>
  );
};
export default FillOTP;
