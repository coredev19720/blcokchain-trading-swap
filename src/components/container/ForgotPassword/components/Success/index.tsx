"use client";
import { Button, Slide, Typography } from "@mui/material";
import * as S from "./styles";
import { useRouter } from "next/navigation";
const Success = () => {
  const router = useRouter();
  const handleNext = () => {
    router.push("/login");
  };
  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
      <S.Wrapper>
        <Typography>Success</Typography>
        <Button onClick={handleNext}>Quay lai trang dang nhap</Button>
      </S.Wrapper>
    </Slide>
  );
};
export default Success;
