"use client";
import { Wrapper } from "./styles";
import { use, useEffect } from "react";
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
      <Header />
      <Content />
      <LanguageToggle />
      <Button>{t("fn_acc_cta_logout")}</Button>
    </Wrapper>
  );
};
export default Account;
