"use client";
import { ButtonWrapper, Wrapper, ContentWrapper } from "./styles";
import { useEffect } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter, useParams } from "next/navigation";
import Cookies from "js-cookie";
import LanguageToggle from "./components/LanguageToggle";

const Account = () => {
  const t = useTranslations("account");
  const router = useRouter();
  const params = useParams();
  useEffect(() => {}, []);
  const handleLogout = () => {
    const locale = params?.locale;
    Cookies.remove(
      process.env.NEXT_PUBLIC_TOKEN_COOKIE
        ? process.env.NEXT_PUBLIC_TOKEN_COOKIE
        : "token"
    );
    if (locale) {
      router.push(`/${locale}/login`);
    }
    router.push("/");
  };
  return (
    <Wrapper>
      <ContentWrapper>
        <Header />
        <Content />
        <LanguageToggle />
      </ContentWrapper>
      <ButtonWrapper>
        <Button fullWidth variant="outlined" onClick={handleLogout}>
          {t("fn_acc_cta_logout")}
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};
export default Account;
