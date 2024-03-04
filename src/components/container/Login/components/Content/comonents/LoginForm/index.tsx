import { IconButton, TextField, Typography, Button } from "@mui/material";
import { createRef, useRef, useState, KeyboardEvent } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { uIdGen } from "@/src/utils/helpers";
import HelpText from "@/src/components/common/HelpText";
import { Wrapper, FieldWrapper, AdormentWrapper } from "./styles";
import FieldLabel from "@/src/components/common/FieldLabel";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";

interface IProps {
  onSubmit: (data: any) => void;
}

const LoginForm = ({ onSubmit }: IProps) => {
  const tNoti = useTranslations("notification");
  const t = useTranslations("login");
  const tMess = useTranslations("mess");
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    reValidateMode: "onSubmit",
  });
  const recaptchaRef = createRef<ReCAPTCHA>();
  const usernameRef = useRef(null);
  const pwdRef: React.RefObject<HTMLInputElement> = createRef();
  const expireTimeRef: React.RefObject<HTMLInputElement> = createRef();
  const [showPwd, setShowPwd] = useState(false);
  const handleKeyDownEnter = (
    e: KeyboardEvent<HTMLDivElement>,
    field: string
  ) => {
    if (e.keyCode === 13) {
      switch (field) {
        case "username":
          if (pwdRef.current) {
            pwdRef.current.focus();
          }
          return;
        case "pwd": {
          if (expireTimeRef.current) {
            expireTimeRef.current.focus();
          }
          return;
        }
        default:
          handleSubmit(onSubmitWithCaptcha);
          return;
      }
    }
  };
  const onSubmitWithCaptcha = (data: any) => {
    const recaptchaVal = recaptchaRef.current?.getValue();
    console.log(recaptchaVal);
    if (recaptchaRef.current) {
      if (!recaptchaVal) {
        toast.error(tNoti("txt_recaptcha_fail"));
        return;
      }
      onSubmit(data);
    }
  };
  const handleClickShowPwd = () => {
    setShowPwd((prev) => !prev);
  };
  const handleChangeExpireTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) > 120) {
      setValue("expireTime", 120);
      return;
    }
    setValue("expireTime", Number(e.target.value));
  };

  const handleBlurExpireTime = () => {
    const expireTime = getValues("expireTime");
    if (expireTime < 5) {
      setValue("expireTime", 5);
      return;
    }
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
  const renderUsernameInput = ({ field }: any) => {
    const { value } = field;
    return (
      <TextField
        autoFocus
        onChange={handleChangeUsername}
        value={value}
        type="textbox"
        variant="outlined"
        id={uIdGen()}
        autoComplete="off"
        onKeyDown={(e) => {
          handleKeyDownEnter(e, "username");
        }}
        error={!!errors.username}
        inputRef={usernameRef}
        fullWidth
        InputProps={{
          startAdornment: (
            <Typography style={{ paddingLeft: 4 }}>086C-</Typography>
          ),
        }}
      />
    );
  };

  const renderPwdInput = ({ field }: any) => {
    const { value } = field;
    return (
      <TextField
        onChange={handleChangePwd}
        value={value}
        variant="outlined"
        type={showPwd ? "textbox" : "password"}
        id={uIdGen()}
        autoComplete="off"
        onKeyDown={(e) => {
          handleKeyDownEnter(e, "pwd");
        }}
        error={!!errors.pwd}
        inputRef={pwdRef}
        InputProps={{
          endAdornment: (
            <AdormentWrapper>
              <IconButton onClick={handleClickShowPwd} edge="end">
                {showPwd ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </AdormentWrapper>
          ),
        }}
        fullWidth
      />
    );
  };

  const renderExpireTime = ({ field }: any) => {
    const { value } = field;
    return (
      <TextField
        onChange={handleChangeExpireTime}
        onBlur={handleBlurExpireTime}
        value={value || ""}
        variant="outlined"
        type="number"
        id={uIdGen()}
        autoComplete="off"
        onKeyDown={(e) => {
          handleKeyDownEnter(e, "expireTime");
        }}
        error={!!errors.expireTime}
        inputRef={expireTimeRef}
        InputProps={{
          endAdornment: (
            <AdormentWrapper>
              <Typography>{t("txt_minute")}</Typography>
            </AdormentWrapper>
          ),
        }}
        fullWidth
      />
    );
  };

  return (
    <form>
      <Wrapper>
        <Typography variant="h5" fontWeight={600} color="text.primary">
          {t("fn_login_txt_title")}
        </Typography>
        <FieldWrapper>
          <FieldLabel>{t("fn_login_inp_username")}</FieldLabel>
          <Controller
            control={control}
            name="username"
            render={renderUsernameInput}
            defaultValue=""
            rules={{
              required: { value: true, message: tMess("required_field") },
            }}
          />
          {errors.username && (
            <HelpText
              stt="error"
              txt={(errors.username.message as string) || ""}
            />
          )}
        </FieldWrapper>
        <FieldWrapper>
          <FieldLabel>{t("fn_login_inp_password")}</FieldLabel>
          <Controller
            control={control}
            name="pwd"
            render={renderPwdInput}
            defaultValue=""
            rules={{
              required: { value: true, message: tMess("required_field") },
            }}
          />
          {errors.pwd && (
            <HelpText stt="error" txt={(errors.pwd.message as string) || ""} />
          )}
        </FieldWrapper>
        <FieldWrapper>
          <FieldLabel>{t("fn_login_inp_autoLogout")}</FieldLabel>
          <Controller
            control={control}
            name="expireTime"
            render={renderExpireTime}
            defaultValue={60}
          />
          {errors.expireTime && (
            <HelpText
              txt={(errors.expireTime.message as string) || ""}
              stt="error"
            />
          )}
        </FieldWrapper>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
          // onChange={onRecaptchaChange}
        />
        <Button
          variant="contained"
          onClick={handleSubmit(onSubmitWithCaptcha)}
          size="large"
        >
          {t("fn_login_cta_login")}
        </Button>
      </Wrapper>
    </form>
  );
};
export default LoginForm;
