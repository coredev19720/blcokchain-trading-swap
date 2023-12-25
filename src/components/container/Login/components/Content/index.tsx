import { Typography } from "@mui/material";
import colors from "@/src/themes/colors";
import { Wrapper, HelpLinkWraper } from "./styles";
import LoginForm from "./comonents/LoginForm";
import { useTranslations } from "next-intl";
import { ILoginForm } from "@/src/interface/common";
import { useRouter, useParams } from "next/navigation";
import CustomerService from "./comonents/CustomerService";
const Content = () => {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations("login");
  const handleLogin = (data: ILoginForm) => {
    console.log("data", data);
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
