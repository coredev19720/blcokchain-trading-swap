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
  const handleLogin = (data: ILoginForm) => {
    if (process.env.NEXT_PUBLIC_TOKEN_COOKIE) {
      cookies.set(process.env.NEXT_PUBLIC_TOKEN_COOKIE, "logged", {
        expires: dayjs().add(data.expireTime, "minutes").toDate(),
      });
      toast.info("Login success");
      router.push(
        `/${params?.locale}?s=${
          params?.s || process.env.NEXT_PUBLIC_DEFAUL_SYMBOL
        }`
      );
    }
  };
  const redirectToForgotPwd = () =>
    router.push(`/${params?.locale}/forgot-password`);
  const redirectToCashTransfer = () =>
    router.push(`/${params?.locale}/cash-transfer`);
  const redirectToOnlTrading = () => {
    console.log("click");
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
      >
        {t("txt_forgot_pwd")}
      </Typography>
      <CustomerService />
      <HelpLinkWraper>
        <Typography
          align="center"
          fontWeight={600}
          onClick={redirectToCashTransfer}
        >
          {t("txt_cash_transfer")}
        </Typography>
        <Typography
          align="center"
          fontWeight={600}
          onClick={redirectToOnlTrading}
        >
          {t("txt_online_trading")}
        </Typography>
      </HelpLinkWraper>
    </Wrapper>
  );
};
export default Content;
