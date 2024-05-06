"use client";
import { ButtonWrapper, Wrapper, ContentWrapper } from "./styles";
import { PageHeader, LoadingButton } from "@components/common";
import Content from "./components/Content";
import { useTranslations } from "next-intl";
import LanguageToggle from "./components/LanguageToggle";
import { useLogout } from "@/src/services/hooks";

const Account = () => {
  const t = useTranslations("account");
  const { onLogout, isPending } = useLogout();

  return (
    <Wrapper>
      <ContentWrapper>
        <PageHeader title={t("fn_acc_txt_title")} accSumRefresh />
        <Content />
        <LanguageToggle />
        {/* <ModeToggle /> */}
      </ContentWrapper>
      <ButtonWrapper>
        <LoadingButton
          fullWidth
          variant="outlined"
          onClick={onLogout}
          loading={isPending}
          text={t("fn_acc_cta_logout")}
        />
      </ButtonWrapper>
    </Wrapper>
  );
};
export default Account;
