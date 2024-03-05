"use client";
import { Button, Slide, Typography } from "@mui/material";
import * as S from "../styles";
import { useRouter } from "next/navigation";
import { multiKey } from "@src/images";
const Success = () => {
  const router = useRouter();
  const handleNext = () => {
    router.push("/login");
  };
  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
      <S.StepWrapper>
        <S.SuccessContent>
          <S.SuccessIcon
            src={multiKey}
            width={80}
            height={80}
            alt="change-pwd-success"
          />
          <Typography variant="body2">
            Mật khẩu của Quý khách dã được thay đổi thành công. Vui lòng đăng
            nhập lại để tiếp tục
          </Typography>
        </S.SuccessContent>
        <Button
          onClick={handleNext}
          variant="contained"
          color="primary"
          fullWidth
        >
          Đăng nhập lại
        </Button>
      </S.StepWrapper>
    </Slide>
  );
};
export default Success;
