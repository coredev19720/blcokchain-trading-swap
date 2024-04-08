import * as S from "./styles";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useAppSelector } from "@src/redux/hooks";
import { TSide } from "@enum/common";
import FieldLabel from "@components/common/FieldLabel";
import StyledTable from "@components/common/StyledTable";
import { IColumn } from "@interface/table";
import { formatBigNumber, formatNumber, genTrend } from "@src/utils/helpers";
import { InsRTData, Stock } from "@/src/constraints/interface/market";
import { useEffect, useState } from "react";
import SplashText from "@/src/components/common/SplashText";
interface IProps {
  instrument: InsRTData;
  ticker: Stock | null;
  maxVol: number;
}
interface BestDeal {
  buyVol: number;
  sellVol: number;
  buyPrice: number;
  sellPrice: number;
}
const SymbolInfo = ({ instrument, ticker, maxVol }: IProps) => {
  const { ticket } = useAppSelector((state) => state.market);

  const [bestDeals, setBestDeals] = useState<BestDeal[]>([]);
  const t = useTranslations("trade");
  useEffect(() => {
    setBestDeals([
      {
        buyVol: instrument.V3,
        buyPrice: instrument.B3,
        sellVol: instrument.U3,
        sellPrice: instrument.S3,
      },
      {
        buyVol: instrument.V2,
        buyPrice: instrument.B2,
        sellVol: instrument.U2,
        sellPrice: instrument.S2,
      },

      {
        buyVol: instrument.V1,
        buyPrice: instrument.B1,
        sellVol: instrument.U1,
        sellPrice: instrument.S1,
      },
    ]);
  }, [
    instrument.B3,
    instrument.V3,
    instrument.U3,
    instrument.S3,
    instrument.B2,
    instrument.V2,
    instrument.U2,
    instrument.S2,
    instrument.B1,
    instrument.V1,
    instrument.U1,
    instrument.S1,
  ]);

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
          trend={genTrend(
            ticker?.reference,
            row.buyPrice,
            ticker?.ceiling,
            ticker?.floor
          )}
        >
          <Typography fontWeight={600} variant="body2" color="inherit">
            {(row.buyPrice / 1000).toFixed(2)}
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
          trend={genTrend(
            ticker?.reference,
            row.sellPrice,
            ticker?.ceiling,
            ticker?.floor
          )}
        >
          <Typography fontWeight={600} variant="body2" color="inherit">
            {(row.sellPrice / 1000).toFixed(2)}
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
          {formatNumber(maxVol || 0)}
        </Typography>
      </S.PowerBuying>
      {/* Price info */}
      <S.PriceInfo>
        <S.PriceBlock>
          <FieldLabel>{t("en_sb_price_floor")}</FieldLabel>
          <Typography color="text.floor" variant="body2" fontWeight={600}>
            {ticker ? (ticker.floor / 1000).toFixed(2) : 0}
          </Typography>
        </S.PriceBlock>
        <S.PriceBlock>
          <FieldLabel>{t("en_sb_price_avg")}</FieldLabel>
          <Typography variant="body2" fontWeight={600}>
            {formatNumber(instrument?.AP || 0)}
          </Typography>
        </S.PriceBlock>
        <S.PriceBlock>
          <FieldLabel>{t("en_sb_price_celling")}</FieldLabel>
          <Typography color="text.ceil" variant="body2" fontWeight={600}>
            {ticker ? (ticker.ceiling / 1000).toFixed(2) : 0}
          </Typography>
        </S.PriceBlock>
      </S.PriceInfo>
      {/* Deals */}
      <StyledTable columns={columns} dataSource={bestDeals} />
    </S.Wrapper>
  );
};
export default SymbolInfo;
