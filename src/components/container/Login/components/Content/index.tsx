import { Typography } from "@mui/material";
import colors from "@/src/themes/colors";
import { Wrapper, HelpLinkWraper } from "./styles";
import LoginForm from "./comonents/LoginForm";
import { useTranslations } from "next-intl";
import { ILoginForm } from "@/src/interface/common";
import { useRouter, useParams } from "next/navigation";
import CustomerService from "./comonents/CustomerService";
import cookies from "js-cookie";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const Content = () => {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations("login");
  const tNoti = useTranslations("notification");
  const loginSuccess = (data: ILoginForm) => {
    if (data.username !== "admin" || data.pwd !== "admin") return false;
    return true;
  };
  const handleLogin = (data: ILoginForm) => {
    if (!loginSuccess(data)) {
      toast.error(tNoti("txt_login_fail"));
      return;
    }
    const lastSymbol = process.env.NEXT_PUBLIC_LAST_SYM_KEY
      ? window.localStorage.getItem(process.env.NEXT_PUBLIC_LAST_SYM_KEY)
      : null;
    if (process.env.NEXT_PUBLIC_TOKEN_COOKIE) {
      cookies.set(process.env.NEXT_PUBLIC_TOKEN_COOKIE, "logged", {
        expires: dayjs().add(data.expireTime, "minutes").toDate(),
      });
      toast.info(tNoti("txt_login_success"));
      router.push(
        `/${params?.locale}/${process.env.NEXT_PUBLIC_DEFAULT_PAGE}?s=${
          params?.s || lastSymbol || process.env.NEXT_PUBLIC_DEFAULT_SYMBOL
        }`
      );
    }
  };
  const redirectToForgotPwd = () =>
    router.push(`/${params?.locale}/forgot-password`);
  const redirectToCashTransfer = () =>
    router.push(`/${params?.locale}/cash-transfer`);
  const redirectToOnlTrading = () => {
    router.push(`/${params?.locale}/onl-trading`);
  };

  return (
    <Wrapper>
      <LoginForm onSubmit={handleLogin} />
      <Typography
        align="right"
        fontWeight={600}
        color={colors.sb60}
        onClick={redirectToForgotPwd}
        variant="body2"
      >
        {t("fn_login_forgot_pwd")}
      </Typography>
      <CustomerService />
      <HelpLinkWraper>
        <Typography
          align="center"
          fontWeight={600}
          onClick={redirectToCashTransfer}
          variant="subtitle1"
        >
          {t("fn_login_cta_ctInstruct")}
        </Typography>
        <Typography
          align="center"
          fontWeight={600}
          onClick={redirectToOnlTrading}
          variant="subtitle1"
        >
          {t("fn_login_cta_otInstruct")}
        </Typography>
      </HelpLinkWraper>
    </Wrapper>
  );
};
export default Content;
