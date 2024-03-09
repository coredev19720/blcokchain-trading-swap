"use client";
import { ButtonWrapper, Wrapper, ContentWrapper } from "./styles";
import { useEffect } from "react";
import PageHeader from "../../common/PageHeader";
import Content from "./components/Content";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter, useParams } from "next/navigation";
import LanguageToggle from "./components/LanguageToggle";
import { useLogout } from "@/src/services/hooks/useLogout";
const Account = () => {
  const t = useTranslations("account");
  const router = useRouter();
  const params = useParams();
  const { onLogout, isSuccess, isError } = useLogout();

  useEffect(() => {
    if (isSuccess || isError) {
      const locale = params?.locale;
      if (locale) {
        router.push(`/${locale}/login`);
      }
      router.push("/");
    }
  }, [isSuccess, isError]);

  return (
    <Wrapper>
      <ContentWrapper>
        <PageHeader title={t("fn_acc_txt_title")} refresh />
        <Content />
        <LanguageToggle />
      </ContentWrapper>
      <ButtonWrapper>
        <Button fullWidth variant="outlined" onClick={onLogout}>
          {t("fn_acc_cta_logout")}
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};
export default Account;
