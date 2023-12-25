import { Typography } from "@mui/material";
import colors from "@/src/themes/colors";
import { Wrapper } from "./styles";
import LoginForm from "./comonents/LoginForm";
import { useTranslations } from "next-intl";
import { ILoginForm } from "@/src/interface/common";
import cookies from "js-cookie";
import { useRouter, useParams } from "next/navigation";
const Content = () => {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations("login");
  const handleLogin = (data: ILoginForm) => {
    console.log("data", data);
  };
  const redirectToForgotPwd = () =>
    router.push(`/${params.locale}/forgot-password`);
  return (
    <Wrapper>
      <LoginForm onSubmit={handleLogin} />
      <Typography
        align="right"
        fontWeight={600}
        color={colors.sb60}
        onClick={redirectToForgotPwd}
      >
        {t("txt_forgot_pwd")}
      </Typography>
    </Wrapper>
  );
};
export default Content;
