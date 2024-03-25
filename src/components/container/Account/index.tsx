"use client";
import { ButtonWrapper, Wrapper, ContentWrapper } from "./styles";
import PageHeader from "../../common/PageHeader";
import Content from "./components/Content";
import { useTranslations } from "next-intl";
import LanguageToggle from "./components/LanguageToggle";
import { useLogout } from "@/src/services/hooks/useLogout";
import LoadingButton from "../../common/LoadingButton";
import { useRouter } from "next/navigation";
// import ModeToggle from "./components/ModeToggle";
const Account = () => {
  const t = useTranslations("account");
  const { onLogout, isPending } = useLogout();
  const router = useRouter();

  return (
    <Wrapper>
      <ContentWrapper>
        <PageHeader title={t("fn_acc_txt_title")} refresh />
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
