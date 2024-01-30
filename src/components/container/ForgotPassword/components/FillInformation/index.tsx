"use client";
import { Button, Slide, Typography } from "@mui/material";
import * as S from "./styles";
interface IProps {
  setStep: (step: number) => void;
}
const FillInformation = ({ setStep }: IProps) => {
  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
      <S.Wrapper>
        <Typography>FillInformation</Typography>
        <Button onClick={() => setStep(1)}>Next</Button>
      </S.Wrapper>
    </Slide>
  );
};
export default FillInformation;
