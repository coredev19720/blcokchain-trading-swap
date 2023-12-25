import { IconButton, TextField, Typography, Button } from "@mui/material";
import { createRef, useRef, useState, KeyboardEvent } from "react";
import {
  useForm,
  Controller,
  ControllerRenderProps,
  ControllerFieldState,
  UseFormStateReturn,
} from "react-hook-form";
import { useTranslations } from "next-intl";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { uIdGen } from "@/src/utils/helpers";
import HelpText from "@/src/components/common/HelpText";
import { Wrapper, FieldWrapper, AdormentWrapper } from "./styles";
import FieldLabel from "@/src/components/common/FieldLabel";
import { ILoginForm } from "@/src/interface/common";
import colors from "@/src/themes/colors";

interface IProps {
  onSubmit: (data: ILoginForm) => void;
}
const LoginForm = ({ onSubmit }: IProps) => {
  const t = useTranslations("login");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      pwd: "",
      expireTime: 60,
    },
  });

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
          handleSubmit(onSubmit)();
          return;
      }
    }
  };

  const handleClickShowPwd = () => {
    setShowPwd((prev) => !prev);
  };

  const renderUsernameInput = ({ field }: any) => {
    const { onChange, value } = field;
    return (
      <TextField
        onChange={onChange}
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
    const { onChange, value } = field;
    return (
      <TextField
        onChange={onChange}
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
    const { onChange, value } = field;
    return (
      <TextField
        onChange={onChange}
        value={value}
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
    <div>
      <form>
        <Wrapper>
          <Typography variant="h3" fontWeight={600} color="text.primary">
            {t("txt_login")}
          </Typography>
          <FieldWrapper>
            <FieldLabel>{t("txt_username_input")}</FieldLabel>
            <Controller
              control={control}
              name="username"
              render={renderUsernameInput}
            />
            {errors.username && (
              <HelpText text={(errors.username.message as string) || ""} />
            )}
          </FieldWrapper>
          <FieldWrapper>
            <FieldLabel>{t("txt_pwd_input")}</FieldLabel>
            <Controller control={control} name="pwd" render={renderPwdInput} />
            {errors.pwd && (
              <HelpText text={(errors.pwd.message as string) || ""} />
            )}
          </FieldWrapper>
          <FieldWrapper>
            <FieldLabel>{t("txt_expire_time_input")}</FieldLabel>
            <Controller
              control={control}
              name="expireTime"
              render={renderExpireTime}
            />
            {errors.expireTime && (
              <HelpText text={(errors.expireTime.message as string) || ""} />
            )}
          </FieldWrapper>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Đăng nhập
          </Button>
        </Wrapper>
      </form>
    </div>
  );
};
export default LoginForm;
