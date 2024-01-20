"use client";
import { ButtonWrapper, Wrapper, ContentWrapper } from "./styles";
import { useEffect } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import LanguageToggle from "./components/LanguageToggle";
const Account = () => {
  const t = useTranslations("account");
  useEffect(() => {}, []);

  return (
    <Wrapper>
      <ContentWrapper>
        <Header />
        <Content />
        <LanguageToggle />
      </ContentWrapper>
      <ButtonWrapper>
        <Button fullWidth variant="outlined">
          {t("fn_acc_cta_logout")}
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};
export default Account;
