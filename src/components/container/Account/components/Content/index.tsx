import { useEffect, useState } from "react";
import * as S from "./styles";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import colors from "@src/themes/colors";
import { useAppSelector } from "@src/redux/hooks";
import { AccountInfo } from "@interface/services/response";
const Content = () => {
  const t = useTranslations("account");
  const { accountSummary } = useAppSelector((state) => state.user);
  return accountSummary ? (
    <S.Wrapper>
      <S.RowWrapper isHeader bgColor={colors.sy80}>
        <Typography color={colors.sb60}>{t("en_cu_asset_total")}</Typography>
        <Typography fontWeight={600} color={colors.sb60}>
          {accountSummary.totalseamt}
        </Typography>
      </S.RowWrapper>
      <S.RowWrapper isHeader bgColor={colors.sb60}>
        <Typography color={colors.p300}>{t("en_cu_cash_total")}</Typography>
        <Typography fontWeight={600} color={colors.p300}>
          {accountSummary.intbalance}
        </Typography>
      </S.RowWrapper>
      <S.RowWrapper>
        <Typography>{t("en_cu_cash_onHand")}</Typography>
        <Typography>{accountSummary.balance}</Typography>
      </S.RowWrapper>
      <S.RowWrapper>
        <Typography>{t("en_cu_cash_payables")}</Typography>
        <Typography>{accountSummary.tdbalance}</Typography>
      </S.RowWrapper>
      <S.RowWrapper>
        <Typography>{t("en_cu_cash_receivables")}</Typography>
        <Typography>{accountSummary.cibalance}</Typography>
      </S.RowWrapper>
      <S.RowWrapper>
        <Typography>{t("en_cu_cash_advance")}</Typography>
        <Typography>{accountSummary.avladvance}</Typography>
      </S.RowWrapper>
      <S.RowWrapper>
        <Typography>{t("fn_acc_cu_stock_buyPower")}</Typography>
        <Typography>{accountSummary.pp}</Typography>
      </S.RowWrapper>
      <S.RowWrapper>
        <Typography>{t("en_cu_stock_sum_total")}</Typography>
        <Typography>{accountSummary.totalseamt}</Typography>
      </S.RowWrapper>
      <S.RowWrapper isHeader bgColor={colors.sb60}>
        <Typography color={colors.p300}>
          {t("en_cu_stock_sum_onhandVal")}
        </Typography>
        <Typography fontWeight={600} color={colors.p300}>
          {accountSummary.totalbuyamt}
        </Typography>
      </S.RowWrapper>
      <S.RowWrapper>
        <Typography>{t("en_cu_stock_sum_receivingVal")}</Typography>
        <Typography>{accountSummary.netassval}</Typography>
      </S.RowWrapper>
      <S.RowWrapper>
        <Typography>{t("fn_acc_cta_port")}</Typography>
      </S.RowWrapper>
    </S.Wrapper>
  ) : null;
};
export default Content;
