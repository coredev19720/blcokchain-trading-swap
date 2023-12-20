import { IconButton, TextField, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";
import { createRef, useRef, useState, KeyboardEvent } from "react";
import {
  useForm,
  Controller,
  ControllerRenderProps,
  ControllerFieldState,
  UseFormStateReturn,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { uIdGen } from "@/src/utils/helpers";
import HelpText from "@/src/components/common/HelpText";
import { Wrapper, FieldWrapper } from "./styles";
interface IProps {
  onSubmit: () => void;
}
const LoginForm = ({ onSubmit }: IProps) => {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const usernameRef = useRef(null);
  const pwdRef: React.RefObject<HTMLInputElement> = createRef();
  const [showPwd, setShowPwd] = useState(false);
  const Router = useRouter();

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
          handleSubmit(onSubmit)();
        }
        default:
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
        type="textbox"
        id={uIdGen()}
        autoComplete="off"
        onKeyDown={(e) => {
          handleKeyDownEnter(e, "pwd");
        }}
        error={!!errors.pwd}
        inputRef={pwdRef}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleClickShowPwd} edge="end">
              {showPwd ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ),
        }}
        fullWidth
      />
    );
  };

  return (
    <div>
      <Typography variant="h4" fontWeight="700">
        {t("changePassword")}
      </Typography>
      <div>
        <form>
          <Wrapper>
            <Typography variant="body1">{t("lblCurrentPassword")}</Typography>
            <Controller
              control={control}
              name="username"
              render={renderUsernameInput}
            />
            {errors.username && (
              <HelpText text={(errors.username.message as string) || ""} />
            )}
          </Wrapper>
          <Wrapper>
            <Typography variant="body1">{t("lblNewPassword")}</Typography>
            <Controller
              control={control}
              name="newPassword"
              render={renderPwdInput}
            />
            {errors.pwd && (
              <HelpText text={(errors.pwd.message as string) || ""} />
            )}
          </Wrapper>

          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Đăng nhập
          </Button>
        </form>
      </div>
    </div>
  );
};
export default LoginForm;
