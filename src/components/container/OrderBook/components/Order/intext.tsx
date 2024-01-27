import * as S from "./styles";
import { FlexContent } from "@/src/styles/common";
import { Button, SelectChangeEvent, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import dayjs from "dayjs";
import { ITransaction } from "@/src/interface/common";
interface IProps {
  data: ITransaction;
}
const Order = ({ data }: IProps) => {
  const t = useTranslations("order_book");
  return (
    <S.Wrapper>
      <S.Content>
        <FlexContent></FlexContent>
      </S.Content>
      <S.Actions>
        <S.Action color="error" variant="contained" fullWidth>
          {t("fn_ob_cta_cancel")}
        </S.Action>
        <S.Action color="primary" variant="contained" fullWidth>
          {t("fn_ob_cta_edit")}
        </S.Action>
        <S.Action variant="outlined" color="secondary" fullWidth>
          {t("fn_ob_cta_detail")}
        </S.Action>
      </S.Actions>
    </S.Wrapper>
  );
};
export default Order;
