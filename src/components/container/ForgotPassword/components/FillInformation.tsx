"use client";
import { Button, Slide } from "@mui/material";
import { useRef, KeyboardEvent, useEffect, createRef } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { usePostForgotPwd } from "@/src/services/hooks/usePostForgotPwd";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import * as S from "../styles";
import TextInput from "../../../common/TextInput";
import DateInput from "../../../common/DateInput";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";

const FillInformation = () => {
  const nameRef: React.RefObject<HTMLInputElement> = useRef(null);
  const phoneRef: React.RefObject<HTMLInputElement> = useRef(null);
  const idCodeRef: React.RefObject<HTMLInputElement> = useRef(null);
  const router = useRouter();
  const t = useTranslations("forgotPwd");
  const tNoti = useTranslations("notification");
  const { onForgotPwd, isSuccess, isError, error } = usePostForgotPwd();
  const recaptchaRef = createRef<ReCAPTCHA>();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    reValidateMode: "onSubmit",
  });
  useEffect(() => {
    if (isError) {
      router.push(`forgot-password?s=fo`);
      // toast.error(error as string);\
    }
  }, [isError]);
  useEffect(() => {
    if (isSuccess) {
      router.push(`forgot-password?s=fo`);
    }
  }, [isSuccess]);
  const handleKeyDownEnter = (
    e: KeyboardEvent<HTMLDivElement>,
    field: string
  ) => {
    if (e.keyCode === 13) {
      switch (field) {
        case "username":
          if (nameRef.current) {
            nameRef.current.focus();
          }
          return;
        default:
          handleSubmit(onSubmit);
          return;
      }
    }
  };
  const onSubmit = async (data: FieldValues) => {
    const recaptchaVal = recaptchaRef.current?.getValue();
    if (recaptchaRef.current) {
      if (!recaptchaVal) {
        toast.error(tNoti("txt_recaptcha_fail"));
        return;
      }
      onForgotPwd({
        username: data.username,
        phone: data.phone,
        fullname: data.fullname,
        idcode: data.idcode,
        iddate: data.iddate,
        dateofbirth: data.dateofbirth,
      });
    }
    onForgotPwd({
      username: data.username,
      phone: data.phone,
      fullname: data.fullname,
      idcode: data.idcode,
      iddate: data.iddate,
      dateofbirth: data.dateofbirth,
    });
  };

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    let txt = e.target.value.trim();
    if (txt.length > 20) {
      txt = txt.substring(0, 20);
    }
    setValue("username", txt);
  };

  const handleChangeFullname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("fullname", e.target.value);
  };

  const handleChangeIdCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const txt = e.target.value.trim();
    setValue("idcode", txt);
  };

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const txt = e.target.value.trim();
    setValue("phone", txt);
  };

  const handleChangeDate = (e: Date, name: string) => {
    setValue(name, e);
  };
  return (
    <Slide direction="left" in={true} mountOnEnter unmountOnExit>
      <S.StepWrapper>
        <TextInput
          autofocus
          name="username"
          label={t("fn_forgotpwd_inp_username")}
          control={control}
          onChangeValue={handleChangeUsername}
          handleEnter={handleKeyDownEnter}
          isError={!!errors.username}
          errMsg={errors.username?.message as string}
          defaultValue="086C001234"
        />
        <TextInput
          defaultValue="Tran Van An"
          name="fullname"
          label={t("fn_forgotpwd_inp_fullname")}
          control={control}
          onChangeValue={handleChangeFullname}
          inputRef={nameRef}
          isError={!!errors.fullname}
          errMsg={errors.fullname?.message as string}
        />
        <DateInput
          defaultValue={dayjs("05/16/1957").toDate()}
          name="dateofbirth"
          label={t("fn_forgotpwd_inp_birthdate")}
          control={control}
          onChangeValue={handleChangeDate}
          isError={!!errors.dateofbirth}
          errMsg={errors.dateofbirth?.message as string}
        />
        <TextInput
          defaultValue="022356753"
          name="idcode"
          label={t("fn_forgotpwd_inp_idcode")}
          control={control}
          onChangeValue={handleChangeIdCode}
          inputRef={idCodeRef}
          isError={!!errors.idcode}
          errMsg={errors.idcode?.message as string}
        />
        <S.FieldBlock>
          <DateInput
            defaultValue={dayjs("05/16/2012").toDate()}
            name="iddate"
            label={t("fn_forgotpwd_inp_issue_date")}
            control={control}
            onChangeValue={handleChangeDate}
            isError={!!errors.iddate}
            errMsg={errors.iddate?.message as string}
          />
        </S.FieldBlock>
        <TextInput
          defaultValue="0977989613"
          name="phone"
          label={t("fn_forgotpwd_inp_phone")}
          control={control}
          onChangeValue={handleChangePhone}
          inputRef={phoneRef}
          isError={!!errors.phone}
          errMsg={errors.phone?.message as string}
        />
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
          // onChange={onRecaptchaChange}
        />
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          color="primary"
          fullWidth
        >
          {t("fn_forgotpwd_cta_submit")}
        </Button>
      </S.StepWrapper>
    </Slide>
  );
};
export default FillInformation;
