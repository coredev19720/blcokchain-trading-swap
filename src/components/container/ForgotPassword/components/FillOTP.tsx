"use client";
import { Button, Slide } from "@mui/material";
import { useEffect, KeyboardEvent } from "react";
import * as S from "../styles";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import TextInput from "../../../common/TextInput";
import { usePostConfirmOTP } from "@/src/services/hooks/usePostConfirmOTP";
import { useRouter } from "next/navigation";
const FillOTP = () => {
  const t = useTranslations("forgotPwd");
  const { onConfirmOTP, isSuccess, isError, error } = usePostConfirmOTP();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    reValidateMode: "onSubmit",
  });
  useEffect(() => {
    if (isSuccess) {
      router.push(`forgot-password?s=fp`);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isError) {
      router.push(`forgot-password?s=fp`);
      toast.error(error as string);
    }
  }, [isError]);
  const onSubmit = () => {
    onConfirmOTP({
      username: "demo",
      otp: getValues("otp"),
    });
  };
  const handleChangeVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const txt = e.target.value.trim();
    if (txt.length <= 6) {
      setValue("otp", e.target.value);
    }
  };
  const handleKeyDownEnter = (e: KeyboardEvent<HTMLDivElement>, _: string) => {
    if (e.keyCode === 13) {
      handleSubmit(onSubmit)();
    }
  };
  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
      <S.StepWrapper>
        <TextInput
          autofocus
          onChangeValue={handleChangeVal}
          handleEnter={handleKeyDownEnter}
          isError={!!errors.otp}
          control={control}
          errMsg={errors.otp?.message as string}
          name="otp"
          type="number"
          label={t("fn_forgotpwd_txt_otp_input")}
          required
          min={6}
        />
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          color="primary"
          fullWidth
        >
          {t("fn_forgotpwd_cta_otp_submit")}
        </Button>
      </S.StepWrapper>
    </Slide>
  );
};
export default FillOTP;
