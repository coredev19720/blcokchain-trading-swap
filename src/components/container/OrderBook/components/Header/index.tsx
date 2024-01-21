import * as S from "./styles";
import { SelectChangeEvent, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import dayjs from "dayjs";
const Header = () => {
  const t = useTranslations("order_book");
  return (
    <S.Wrapper>
      <Typography fontWeight={700} color="text.primary">
        {t("fn_ob_txt_title")}
      </Typography>
      <Typography variant="subtitle1">{`${t("fn_ob_txt_date")} ${dayjs().format(
        "DD/MM/YYYY"
      )}`}</Typography>
    </S.Wrapper>
  );
};
export default Header;
