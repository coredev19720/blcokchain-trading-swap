import { styled } from "@mui/system";
import { csIcon } from "@src/images";
import Image from "next/image";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
const Wrapper = styled("div")({
  padding: 8,
  background: "#FFF9E8",
  borderRadius: 40,
  display: "flex",
  alignItems: "center",
});
const IconWrapper = styled("div")({
  background: "#FFC114",
  borderRadius: "50%",
  width: 40,
  height: 40,
});
const TextWrapper = styled("div")({
  flex: 1,
  display: "flex",
  height: "100%",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 16px",
});
const CustomerService = () => {
  const t = useTranslations("login");
  return (
    <Wrapper>
      <IconWrapper>
        <Image src={csIcon} alt="cs icon" height={40} width={40} />
      </IconWrapper>
      <TextWrapper>
        <Typography fontWeight={600} variant="subtitle1">
          {t("txt_cs")}
        </Typography>
        <Typography fontWeight={600} variant="body2">
          {t("txt_cs_phone")}
        </Typography>
      </TextWrapper>
    </Wrapper>
  );
};
export default CustomerService;
