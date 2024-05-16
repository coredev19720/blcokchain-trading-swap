import * as S from "./styles";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useAppSelector } from "@src/redux/hooks";
import { TSide } from "@enum/common";
import FieldLabel from "@components/common/FieldLabel";
import StyledTable from "@components/common/StyledTable";
import { IColumn } from "@interface/table";
import { formatBigNumber, formatNumber, genTrend } from "@src/utils/helpers";
import { InsRTData } from "@/src/constraints/interface/market";
import { useEffect, useState } from "react";
import SplashText from "@/src/components/common/SplashText";
interface IProps {
  inst: InsRTData | null;
}
interface BestDeal {
  buyVol: number;
  sellVol: number;
  buyPrice: number | string;
  sellPrice: number | string;
}
const SymbolInfo = ({ inst }: IProps) => {
  const { ticket } = useAppSelector((state) => state.market);
  const { accountSummary, activeAccount } = useAppSelector(
    (state) => state.user
  );
  const [bestDeals, setBestDeals] = useState<BestDeal[]>([]);
  const t = useTranslations("trade");
  useEffect(() => {
    if (inst?.B1 && inst?.B2 && inst?.B3 && inst?.S1 && inst?.S2 && inst?.S3) {
      setBestDeals([
        {
          buyVol: inst.V3,
          buyPrice: inst.B3,
          sellVol: inst.U3,
          sellPrice: inst.S3,
        },
        {
          buyVol: inst.V2,
          buyPrice: inst.B2,
          sellVol: inst.U2,
          sellPrice: inst.S2,
        },

        {
          buyVol: inst.V1,
          buyPrice: inst.B1,
          sellVol: inst.U1,
          sellPrice: inst.S1,
        },
      ]);
    }
  }, [inst]);

  const columns: IColumn[] = [
    {
      title: t("fn_trade_sb_best_buyQty"),
      render: (row: BestDeal) => (
        <Typography variant="body2">{formatBigNumber(row.buyVol)}</Typography>
      ),
      align: "center",
    },
    {
      title: t("fn_trade_sb_best_buyPrice"),
      render: (row: BestDeal) => (
        <SplashText
          val={row.buyPrice}
          trend={genTrend(inst?.RE, row.buyPrice, inst?.CL, inst?.FL)}
        >
          <Typography fontWeight={600} variant="body2" color="inherit">
            {typeof row.buyPrice === "number"
              ? (row.buyPrice / 1000).toFixed(2)
              : row.buyPrice}
          </Typography>
        </SplashText>
      ),
      align: "center",
    },
    {
      title: t("fn_trade_sb_best_sellPrice"),
      render: (row: BestDeal) => (
        <SplashText
          val={row.sellPrice}
          trend={genTrend(inst?.RE, row.sellPrice, inst?.CL, inst?.FL)}
        >
          <Typography fontWeight={600} variant="body2" color="inherit">
            {typeof row.sellPrice === "number"
              ? (row.sellPrice / 1000).toFixed(2)
              : row.sellPrice}
          </Typography>
        </SplashText>
      ),
      align: "center",
    },
    {
      title: t("fn_trade_sb_best_sellQty"),
      render: (row: BestDeal) => (
        <Typography variant="body2">{formatBigNumber(row.sellVol)}</Typography>
      ),
      align: "center",
    },
  ];

  return (
    <S.Wrapper>
      {/* buying */}
      <S.PowerBuying>
        <Typography variant="body2">
          {t(
            ticket.side === TSide.sell
              ? "fn_trade_txt_can_sell"
              : "fn_trade_txt_can_buy"
          )}
        </Typography>
        <Typography fontWeight={700} variant="body2">
          {accountSummary && activeAccount
            ? formatNumber(accountSummary[activeAccount.id].pp)
            : 0}
        </Typography>
      </S.PowerBuying>
      {/* Price info */}
      <S.PriceInfo>
        <S.PriceBlock>
          <FieldLabel>{t("en_sb_price_floor")}</FieldLabel>
          <Typography color="text.floor" variant="body2" fontWeight={600}>
            {inst ? (inst.FL / 1000).toFixed(2) : 0}
          </Typography>
        </S.PriceBlock>
        <S.PriceBlock>
          <FieldLabel>{t("en_sb_price_avg")}</FieldLabel>
          <Typography variant="body2" fontWeight={600}>
            {formatNumber(inst?.AP ?? 0)}
          </Typography>
        </S.PriceBlock>
        <S.PriceBlock>
          <FieldLabel>{t("en_sb_price_celling")}</FieldLabel>
          <Typography color="text.ceil" variant="body2" fontWeight={600}>
            {inst ? (inst.CL / 1000).toFixed(2) : 0}
          </Typography>
        </S.PriceBlock>
      </S.PriceInfo>
      {/* Deals */}
      <StyledTable columns={columns} dataSource={bestDeals} />
    </S.Wrapper>
  );
};
export default SymbolInfo;
