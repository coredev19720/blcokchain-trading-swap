import GeneralInfo from "./components/GeneralInfo";
import MarketValue from "./components/MarketValue";
import PriceInfo from "./components/PriceInfo";
import Line from "@components/common/Line";
import { IBestDeal } from "@interface/common";
import MarketIndex from "./components/MarketIndex";
import Actions from "./components/Actions";
import {
  InsRTData,
  Stock,
  TradeRTData,
} from "@/src/constraints/interface/market";
import FieldLabel from "@/src/components/common/FieldLabel";
import StyledTable from "@/src/components/common/StyledTable";
import { TShortSide } from "@/src/constraints/enum/common";
import { IColumn } from "@/src/constraints/interface/table";
import { formatBigNumber, genPriceColor } from "@/src/utils/helpers";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import * as S from "./styles";
import SplashText from "@/src/components/common/SplashText";
type Props = {
  instrument: InsRTData;
  trades: TradeRTData[];
  ticker: Stock | null;
};
const Ticker = ({ instrument, trades, ticker }: Props) => {
  const [bestDeals, setBestDeals] = useState<IBestDeal[]>([]);
  const t = useTranslations("market");
  useEffect(() => {
    setBestDeals([
      {
        buyVol: 0,
        price: instrument.S3,
        sellVol: instrument.U3,
      },
      {
        buyVol: 0,
        price: instrument.S2,
        sellVol: instrument.U2,
      },

      {
        buyVol: 0,
        price: instrument.S1,
        sellVol: instrument.U1,
      },

      {
        buyVol: instrument.V3,
        price: instrument.B3,
        sellVol: 0,
      },
      {
        buyVol: instrument.V2,
        price: instrument.B2,
        sellVol: 0,
      },
      {
        buyVol: instrument.V1,
        price: instrument.B1,
        sellVol: 0,
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
  const bestDealCols: IColumn[] = [
    {
      title: t("en_sb_best_buyQty"),
      render: (row: IBestDeal) => {
        return (
          <SplashText val={row.buyVol}>
            <Typography variant="subtitle1">
              {row.buyVol ? formatBigNumber(row.buyVol) : null}
            </Typography>
          </SplashText>
        );
      },
      align: "right",
    },
    {
      title: t("en_sb_best_price"),
      render: (row: IBestDeal) => (
        <SplashText val={row.price}>
          <Typography
            variant="subtitle1"
            color={genPriceColor(
              ticker?.reference,
              row.price,
              ticker?.ceiling,
              ticker?.floor
            )}
          >
            {(row.price / 1000).toFixed(2)}
          </Typography>
        </SplashText>
      ),
      align: "right",
    },
    {
      title: t("en_sb_best_sellQty"),
      render: (row: IBestDeal) => (
        <SplashText val={row.sellVol}>
          <Typography variant="subtitle1">
            {row.sellVol ? formatBigNumber(row.sellVol) : null}
          </Typography>
        </SplashText>
      ),
      align: "right",
    },
  ];

  const historyDealsCols: IColumn[] = [
    {
      title: t("en_sb_match_time"),
      align: "center",
      render: (row: TradeRTData) => (
        <Typography variant="subtitle1">{genTime(row.FT)}</Typography>
      ),
    },
    {
      title: t("en_sb_match_price"),
      align: "right",
      render: (row: TradeRTData) => (
        <Typography
          variant="subtitle1"
          color={genPriceColor(
            ticker?.reference,
            row.FMP,
            ticker?.ceiling,
            ticker?.floor
          )}
        >
          {(row.FMP / 1000).toFixed(2)}
        </Typography>
      ),
    },
    {
      title: t("en_sb_match_qty"),
      render: (row: TradeRTData) => (
        <Typography variant="subtitle1">{formatBigNumber(row.FV)}</Typography>
      ),
      align: "right",
    },
    {
      title: "",
      render: (row: TradeRTData) => (
        <Typography
          variant="subtitle1"
          color={row.LC === TShortSide.b ? "text.success" : "text.error"}
        >
          {row.LC === TShortSide.b ? "B" : "S"}
        </Typography>
      ),

      align: "center",
    },
  ];
  const genTime = (time: string) => {
    const timeArr = time.split(":");
    return `${timeArr[0]}:${timeArr[1]}`;
  };
  return (
    <S.Wrapper>
      <S.InforSection>
        <GeneralInfo instrument={instrument} ticker={ticker} />
        <Line />
        <PriceInfo instrument={instrument} ticker={ticker} />
        <Line />
        <MarketValue instrument={instrument} />
        <Line />
        <S.DealWrapper>
          <S.BestDeal>
            <FieldLabel>{t("fn_symbol_txt_bestQuote")}</FieldLabel>
            <StyledTable columns={bestDealCols} dataSource={bestDeals} />
          </S.BestDeal>
          <S.HistoryDeals>
            <FieldLabel>{t("fn_symbol_txt_ordHist")}</FieldLabel>
            <StyledTable
              columns={historyDealsCols}
              dataSource={trades}
              stickyHeader
            />
          </S.HistoryDeals>
        </S.DealWrapper>
        <MarketIndex />
      </S.InforSection>
      <Actions />
    </S.Wrapper>
  );
};
export default Ticker;
