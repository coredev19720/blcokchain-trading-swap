import { IconButton, Typography } from "@mui/material";
import { createRef, useState, KeyboardEvent, useEffect } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Wrapper, AdormentWrapper } from "./styles";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import { useLogin } from "@/src/services/hooks";
import { encrypt } from "@src/libs/hash";
import { useRouter } from "next/navigation";
import TextInput from "@/src/components/common/TextInput";
import LoadingButton from "@/src/components/common/LoadingButton";

const LoginForm = () => {
  const { onLogin, isError, isSuccess, isPending } = useLogin();
  const tNoti = useTranslations("notification");
  const t = useTranslations("login");
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    reValidateMode: "onSubmit",
  });
  const recaptchaRef = createRef<ReCAPTCHA>();
  const pwdRef: React.RefObject<HTMLInputElement> = createRef();
  const expireTimeRef: React.RefObject<HTMLInputElement> = createRef();
  const [showPwd, setShowPwd] = useState(false);
  useEffect(() => {
    if (isError) {
      toast.error(tNoti("txt_login_fail"));
    }
    if (isSuccess) {
      router.push("market");
    }
  }, [isError, isSuccess]);

  const handleKeyDownEnter = (
    e: KeyboardEvent<HTMLDivElement>,
    field: string
  ) => {
    if (e.keyCode === 13) {
      switch (field) {
        case "username":
          pwdRef.current?.focus();

          return;
        case "pwd": {
          expireTimeRef.current?.focus();
          return;
        }
        default:
          handleSubmit(handleLogin)();
          return;
      }
    }
  };
  const handleClickShowPwd = () => {
    setShowPwd((prev) => !prev);
  };
  const handleChangeExpireTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxIdleTime: number = Number(
      process.env.NEXT_PUBLIC_MAX_IDLE_TIME ?? 120
    );
    if (Number(e.target.value) > maxIdleTime) {
      setValue("expireTime", maxIdleTime);
      return;
    }
    setValue("expireTime", Number(e.target.value));
  };

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    let txt = e.target.value.trim();
    if (txt.length > 20) {
      txt = txt.substring(0, 20);
    }
    setValue("username", txt);
  };
  const handleChangePwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    let txt = e.target.value.trim();
    if (txt.length > 50) {
      txt = txt.substring(0, 50);
    }
    setValue("pwd", txt);
  };

  const handleLogin = async (data: FieldValues) => {
    const recaptchaVal = recaptchaRef.current?.getValue();
    if (recaptchaRef.current && !recaptchaVal) {
      toast.error(tNoti("txt_recaptcha_fail"));
      return;
    }
    onLogin({
      u: data.username,
      p: encrypt(data.pwd),
      t: data.expireTime * 60,
      captchaToken: recaptchaVal ?? "",
    });
  };
  return (
    <form>
      <Wrapper>
        <Typography variant="h5" fontWeight={600}>
          {t("fn_login_txt_title")}
        </Typography>
        <TextInput
          label={t("fn_login_inp_username")}
          autofocus
          isError={!!errors.username}
          control={control}
          errMsg={(errors.username?.message as string) || ""}
          name="username"
          required
          handleEnter={handleKeyDownEnter}
          onChangeValue={handleChangeUsername}
          inputProps={{
            startAdornment: (
              <Typography
                style={{ paddingLeft: 4 }}
                color="text.secondary"
              >{`${process.env.NEXT_PUBLIC_PREFIX_ACCOUNT}-`}</Typography>
            ),
          }}
        />
        <TextInput
          label={t("fn_login_inp_password")}
          isError={!!errors.pwd}
          control={control}
          errMsg={(errors.pwd?.message as string) || ""}
          name="pwd"
          type={showPwd ? "textbox" : "password"}
          required
          handleEnter={handleKeyDownEnter}
          onChangeValue={handleChangePwd}
          inputRef={pwdRef}
          inputProps={{
            endAdornment: (
              <AdormentWrapper>
                <IconButton onClick={handleClickShowPwd} edge="end">
                  {showPwd ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </AdormentWrapper>
            ),
          }}
        />
        <TextInput
          label={t("fn_login_inp_autoLogout")}
          isError={!!errors.expireTime}
          control={control}
          errMsg={(errors.expireTime?.message as string) || ""}
          name="expireTime"
          type="number"
          required
          handleEnter={handleKeyDownEnter}
          onChangeValue={handleChangeExpireTime}
          inputRef={expireTimeRef}
          defaultValue={60}
          inputProps={{
            endAdornment: (
              <AdormentWrapper>
                <Typography color="text.secondary">
                  {t("txt_minute")}
                </Typography>
              </AdormentWrapper>
            ),
          }}
        />
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
          // onChange={onRecaptchaChange}
        />
        <LoadingButton
          variant="contained"
          onClick={handleSubmit(handleLogin)}
          size="large"
          loading={isPending || isSuccess}
          text={t("fn_login_cta_login")}
        />
      </Wrapper>
    </form>
  );
};
export default LoginForm;
