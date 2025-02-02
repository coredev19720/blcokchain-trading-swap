"use client";
import { Button, Slide, Typography, IconButton } from "@mui/material";
import * as S from "../styles";
import { KeyboardEvent, createRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import TextInput from "../../../common/TextInput";
import { usePostCreatePwd } from "@/src/services/hooks";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const FillPassword = () => {
  const router = useRouter();
  const confPwdRef: React.Ref<any> = createRef();
  const t = useTranslations("resetpwd");
  const tMess = useTranslations("mess");
  const { onCreatePwd, isSuccess, isError, error } = usePostCreatePwd();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    reValidateMode: "onSubmit",
  });
  const [showPwd, setShowPwd] = useState<boolean>(false);
  const [showConfPwd, setShowConfPwd] = useState<boolean>(false);
  useEffect(() => {
    if (isSuccess) {
      router.push(`forgot-password?s=f`);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isError) {
      toast.error(error as string);
    }
  }, [isError]);
  const onSubmit = () => {
    if (getValues("pwd") === getValues("confPwd")) {
      //fix me
      router.push(`forgot-password?s=f`);
      onCreatePwd({
        pwd: getValues("pwd"),
        confirmPwd: getValues("confPwd"),
      });
      return;
    }
    toast.error(tMess("pwd_not_match"));
  };
  const handleChangePwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("pwd", e.target.value);
  };
  const handleChangeConfPwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("confPwd", e.target.value);
  };
  const handleKeyDownEnter = (
    e: KeyboardEvent<HTMLDivElement>,
    name: string
  ) => {
    if (e.keyCode === 13) {
      if (name === "pwd") {
        confPwdRef.current?.focus();
        return;
      }
      handleSubmit(onSubmit)();
    }
  };
  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
      <S.StepWrapper>
        <Typography variant="body2">
          {t("fn_resetpwd_txt_pwd_input")}
        </Typography>
        <TextInput
          label={t("fn_resetpwd_inp_pwd")}
          control={control}
          name="pwd"
          required
          isError={!!errors.password}
          errMsg={errors.password?.message as string}
          onChangeValue={handleChangePwd}
          handleEnter={handleKeyDownEnter}
          type={showPwd ? "text" : "password"}
          inputProps={{
            endAdornment: (
              <S.AdormentWrapper>
                <IconButton
                  onClick={() => setShowPwd((prev) => !prev)}
                  edge="end"
                >
                  {showPwd ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </S.AdormentWrapper>
            ),
          }}
        />
        <TextInput
          label={t("fn_resetpwd_inp_pwd_confirm")}
          control={control}
          name="confPwd"
          required
          isError={!!errors.password}
          errMsg={errors.password?.message as string}
          onChangeValue={handleChangeConfPwd}
          handleEnter={handleKeyDownEnter}
          inputRef={confPwdRef}
          type={showConfPwd ? "text" : "password"}
          inputProps={{
            endAdornment: (
              <S.AdormentWrapper>
                <IconButton
                  onClick={() => setShowConfPwd((prev) => !prev)}
                  edge="end"
                >
                  {showConfPwd ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </S.AdormentWrapper>
            ),
          }}
        />
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          color="primary"
          fullWidth
        >
          {t("fn_resetpwd_cta_new_pwd_submit")}
        </Button>
      </S.StepWrapper>
    </Slide>
  );
};
export default FillPassword;
