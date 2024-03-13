"use client";
import { ButtonWrapper, Wrapper, ContentWrapper } from "./styles";
import PageHeader from "../../common/PageHeader";
import Content from "./components/Content";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import LanguageToggle from "./components/LanguageToggle";
import { useLogout } from "@/src/services/hooks/useLogout";
import LoadingButton from "../../common/LoadingButton";
const Account = () => {
  const t = useTranslations("account");
  const { onLogout, isPending } = useLogout();

  return (
    <Wrapper>
      <ContentWrapper>
        <PageHeader title={t("fn_acc_txt_title")} refresh />
        <Content />
        <LanguageToggle />
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
