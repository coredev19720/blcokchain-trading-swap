import * as S from "./styles";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import colors from "@src/themes/colors";
import { useAppSelector } from "@src/redux/hooks";
const Content = () => {
  const t = useTranslations("account");
  const account = useAppSelector((state) => state.user.account);
  return account ? (
    <S.Wrapper>
      <S.RowWrapper isHeader bgColor={colors.sy80}>
        <Typography color={colors.sb60}>{t("en_cu_asset_total")}</Typography>
        <Typography fontWeight={600} color={colors.sb60}>
          {account.totalAsset}
        </Typography>
      </S.RowWrapper>
      <S.RowWrapper isHeader bgColor={colors.sb60}>
        <Typography color={colors.p300}>{t("en_cu_cash_total")}</Typography>
        <Typography fontWeight={600} color={colors.p300}>
          {account.cashBalance}
        </Typography>
      </S.RowWrapper>
      <S.RowWrapper>
        <Typography>{t("en_cu_cash_onHand")}</Typography>
        <Typography>{account.coh}</Typography>
      </S.RowWrapper>
      <S.RowWrapper>
        <Typography>{t("en_cu_cash_payables")}</Typography>
        <Typography>{account.cashPayables}</Typography>
      </S.RowWrapper>
      <S.RowWrapper>
        <Typography>{t("en_cu_cash_receivables")}</Typography>
        <Typography>{account.receivingCash}</Typography>
      </S.RowWrapper>
      <S.RowWrapper>
        <Typography>{t("en_cu_cash_advance")}</Typography>
        <Typography>{account.accessEquity}</Typography>
      </S.RowWrapper>
      <S.RowWrapper>
        <Typography>{t("fn_acc_cu_stock_buyPower")}</Typography>
        <Typography>{account.buyingPower}</Typography>
      </S.RowWrapper>
      <S.RowWrapper>
        <Typography>{t("en_cu_stock_sum_total")}</Typography>
        <Typography>{account.portValue}</Typography>
      </S.RowWrapper>
      <S.RowWrapper isHeader bgColor={colors.sb60}>
        <Typography color={colors.p300}>
          {t("en_cu_stock_sum_onhandVal")}
        </Typography>
        <Typography fontWeight={600} color={colors.p300}>
          {account.portValue}
        </Typography>
      </S.RowWrapper>
      <S.RowWrapper>
        <Typography>{t("en_cu_stock_sum_receivingVal")}</Typography>
        <Typography>{account.portValue}</Typography>
      </S.RowWrapper>
      <S.RowWrapper>
        <Typography>{t("fn_acc_cta_port")}</Typography>
      </S.RowWrapper>
    </S.Wrapper>
  ) : null;
};
export default Content;
