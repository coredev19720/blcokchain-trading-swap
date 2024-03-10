"use client";
import { Button, Slide, Typography } from "@mui/material";
import * as S from "../styles";
import { useRouter } from "next/navigation";
import { multiKey } from "@src/images";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { locale } from "dayjs";
const Success = () => {
  const t = useTranslations("forgotPwd");
  const router = useRouter();
  const params = useParams();
  const handleNext = () => {
    router.push(`${params?.locale}/login`);
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
            {t("fn_forgotpwd_txt_success")}
          </Typography>
        </S.SuccessContent>
        <Button
          onClick={handleNext}
          variant="contained"
          color="primary"
          fullWidth
        >
          {t("fn_forgotpwd_cta_success")}
        </Button>
      </S.StepWrapper>
    </Slide>
  );
};
export default Success;
