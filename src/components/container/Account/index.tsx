"use client";
import { ButtonWrapper, Wrapper, ContentWrapper } from "./styles";
import { PageHeader, LoadingButton } from "@components/common";
import Content from "./components/Content";
import { useTranslations } from "next-intl";
import LanguageToggle from "./components/LanguageToggle";
import { useLogout } from "@/src/services/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const Account = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("account");
  const { onLogout, isPending, isSuccess, isError } = useLogout();
  useEffect(() => {
    if (isSuccess || isError) {
      queryClient.invalidateQueries();
      // queryClient.invalidateQueries({
      //   queryKey: ["get-accounts", "orders", "fectch-init-data"],
      // });
    }
  }, [isSuccess, isError]);

  return (
    <Wrapper>
      <ContentWrapper>
        <PageHeader title={t("fn_acc_txt_title")} accSumRefresh />
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
