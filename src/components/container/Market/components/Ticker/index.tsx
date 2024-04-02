import GeneralInfo from "./components/GeneralInfo";
import MarketValue from "./components/MarketValue";
import PriceInfo from "./components/PriceInfo";
import Line from "@components/common/Line";
import { IBestDeal, IHistoryDeal, ITickerData } from "@interface/common";
import MarketIndex from "./components/MarketIndex";
import Actions from "./components/Actions";
import {
  InsRTData,
  Stock,
  TradeRTData,
} from "@/src/constraints/interface/market";
import FieldLabel from "@/src/components/common/FieldLabel";
import StyledTable from "@/src/components/common/StyledTable";
import { TSide } from "@/src/constraints/enum/common";
import { IColumn } from "@/src/constraints/interface/table";
import { formatBigNumber, genPriceColor } from "@/src/utils/helpers";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import * as S from "./styles";
type Props = {
  ticker: Stock;
  instrument: InsRTData;
  trades: TradeRTData[];
};
const Ticker = ({ ticker, instrument, trades }: Props) => {
  const [bestDeals, setBestDeals] = useState<IBestDeal[]>([]);
  const t = useTranslations("market");
  useEffect(() => {
    setBestDeals([
      {
        buyVol: instrument.V1,
        price: instrument.B1,
        sellVol: instrument.U1,
      },
      {
        buyVol: instrument.V2,
        price: instrument.B2,
        sellVol: instrument.U2,
      },
      {
        buyVol: instrument.V3,
        price: instrument.B3,
        sellVol: instrument.U3,
      },
    ]);
  }, [
    instrument.B3,
    instrument.V3,
    instrument.U3,
    instrument.B2,
    instrument.V2,
    instrument.U2,
    instrument.B1,
    instrument.V1,
    instrument.U1,
  ]);
  const bestDealCols: IColumn[] = [
    {
      title: t("en_sb_best_buyQty"),
      render: (row: IBestDeal) => (
        <Typography variant="subtitle1">
          {formatBigNumber(row.buyVol)}
        </Typography>
      ),
      align: "right",
    },
    {
      title: t("en_sb_best_price"),
      render: (row: IBestDeal) => (
        <Typography
          variant="subtitle1"
          color={genPriceColor(
            instrument.RE,
            row.price,
            instrument.CL,
            instrument.FL
          )}
        >
          {row.price}
        </Typography>
      ),
      align: "right",
    },
    {
      title: t("en_sb_best_sellQty"),
      render: (row: IBestDeal) => (
        <Typography variant="subtitle1">
          {formatBigNumber(row.sellVol)}
        </Typography>
      ),
      align: "right",
    },
  ];

  const historyDealsCols: IColumn[] = [
    {
      title: t("en_sb_match_time"),
      align: "center",
      render: (row: IHistoryDeal) => (
        <Typography variant="subtitle1">{row.time}</Typography>
      ),
    },
    {
      title: t("en_sb_match_price"),
      align: "right",
      render: (row: IHistoryDeal) => (
        <Typography
          variant="subtitle1"
          color={genPriceColor(
            instrument.RE,
            row.price,
            instrument.CL,
            instrument.FL
          )}
        >
          {row.price}
        </Typography>
      ),
    },
    {
      title: t("en_sb_match_qty"),
      render: (row: IHistoryDeal) => (
        <Typography variant="subtitle1">{formatBigNumber(row.vol)}</Typography>
      ),
      align: "right",
    },
    {
      title: "",
      render: (row: IHistoryDeal) => (
        <Typography
          variant="subtitle1"
          color={row.side === TSide.buy ? "text.success" : "text.error"}
        >
          {row.side === TSide.buy ? "B" : "S"}
        </Typography>
      ),

      align: "center",
    },
  ];
  return (
    <S.Wrapper>
      <S.InforSection>
        <GeneralInfo instrument={instrument} />
        <Line />
        <PriceInfo instrument={instrument} />
        <Line />
        <MarketValue instrument={instrument} />
        <Line />
        <S.DealWrapper>
          <S.BestDeal>
            <FieldLabel>{t("fn_symbol_txt_bestQuote")}</FieldLabel>
            <StyledTable columns={bestDealCols} dataSource={bestDeals} />
          </S.BestDeal>
          {/* <HistoryDeals>
        <FieldLabel>{t("fn_symbol_txt_ordHist")}</FieldLabel>
        <StyledTable
          columns={historyDealsCols}
          dataSource={ticker.marketDepth.historyDeals}
          stickyHeader
        />
      </HistoryDeals> */}
        </S.DealWrapper>
        <MarketIndex />
      </S.InforSection>
      <Actions />
    </S.Wrapper>
  );
};
export default Ticker;
