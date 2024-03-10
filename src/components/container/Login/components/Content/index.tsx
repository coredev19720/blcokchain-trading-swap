import { Typography } from "@mui/material";
import colors from "@src/themes/colors";
import { Wrapper, HelpLinkWraper } from "./styles";
import LoginForm from "./comonents/LoginForm";
import { useTranslations } from "next-intl";
import { useRouter, useParams } from "next/navigation";
import CustomerService from "./comonents/CustomerService";

const Content = () => {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations("login");
  const tNoti = useTranslations("notification");

  const redirectToForgotPwd = () => {
    router.push(`/${params?.locale}/forgot-password?s=fi`);
  };

  const redirectToCashTransfer = () =>
    router.push(`/${params?.locale}/cash-transfer`);
  const redirectToOnlTrading = () => {
    router.push(`/${params?.locale}/onl-trading`);
  };

  return (
    <Wrapper>
      <LoginForm />
      <Typography
        align="right"
        fontWeight={600}
        color={colors.sb60}
        onClick={redirectToForgotPwd}
        variant="subtitle1"
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
