import * as S from "./styles";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { IAccount } from "@/src/interface/common";
import { TAccountType } from "@/src/enum";

const data: IAccount = {
  type: TAccountType.CASH,
  accountNo: "00011111111",
  totalAsset: 100000000,
  cashPayables: 0,
  buyingPower: 140000000,
  cashBalance: 100000000,
  coh: 100000000,
  receivingCash: 0,
  accessEquity: 0,
  portValue: 40000000,
};
const Content = () => {
  const t = useTranslations("account");
  return (
    <S.Wrapper>
      <S.RowWrapper>
        <Typography>{t("en_cu_asset_total")}</Typography>
        <Typography>{data.totalAsset}</Typography>
      </S.RowWrapper>
      <S.RowWrapper>
        <Typography>{t("en_cu_cash_total")}</Typography>
        <Typography>{data.cashBalance}</Typography>
      </S.RowWrapper>
      <S.RowWrapper>
        <Typography>{t("en_cu_cash_onHand")}</Typography>
        <Typography>{data.coh}</Typography>
      </S.RowWrapper>
      <S.RowWrapper>
        <Typography>{t("en_cu_cash_payables")}</Typography>
        <Typography>{data.cashPayables}</Typography>
      </S.RowWrapper>
      <S.RowWrapper>
        <Typography>{t("en_cu_cash_receivables")}</Typography>
        <Typography>{data.receivingCash}</Typography>
      </S.RowWrapper>
      <S.RowWrapper>
        <Typography>{t("en_cu_cash_advance")}</Typography>
        <Typography>{data.accessEquity}</Typography>
      </S.RowWrapper>
      <S.RowWrapper>
        <Typography>{t("fn_acc_cu_stock_buyPower")}</Typography>
        <Typography>{data.buyingPower}</Typography>
      </S.RowWrapper>
      <S.RowWrapper>
        <Typography>{t("en_cu_stock_sum_total")}</Typography>
        <Typography>{data.portValue}</Typography>
      </S.RowWrapper>
      <S.RowWrapper>
        <Typography>{t("en_cu_stock_sum_onhandVal")}</Typography>
        <Typography>{data.portValue}</Typography>
      </S.RowWrapper>
      <S.RowWrapper>
        <Typography>{t("en_cu_stock_sum_receivingVal")}</Typography>
        <Typography>{data.portValue}</Typography>
      </S.RowWrapper>
      <S.RowWrapper>
        <Typography>{t("fn_acc_cta_port")}</Typography>
      </S.RowWrapper>
    </S.Wrapper>
  );
};
export default Content;
