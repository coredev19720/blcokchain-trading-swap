import GeneralInfo from "./components/GeneralInfo";
import MarketValue from "./components/MarketValue";
import PriceInfo from "./components/PriceInfo";
import Line from "@components/common/Line";
import { IBestDeal } from "@interface/common";
import MarketIndex from "./components/MarketIndex";
import Actions from "./components/Actions";
import { InsRTData, TradeRTData } from "@/src/constraints/interface/market";
import FieldLabel from "@/src/components/common/FieldLabel";
import StyledTable from "@/src/components/common/StyledTable";
import { TShortSide } from "@/src/constraints/enum/common";
import { IColumn } from "@/src/constraints/interface/table";
import { formatBigNumber, genPriceColor, genTrend } from "@/src/utils/helpers";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import * as S from "./styles";
import SplashText from "@/src/components/common/SplashText";
type Props = {
  inst: InsRTData | null;
  trades: TradeRTData[];
};
const Ticker = ({ inst, trades }: Props) => {
  const [bestDeals, setBestDeals] = useState<IBestDeal[]>([]);
  const t = useTranslations("market");
  useEffect(() => {
    if (inst) {
      setBestDeals([
        {
          buyVol: 0,
          price: inst.S3,
          sellVol: inst.U3,
        },
        {
          buyVol: 0,
          price: inst.S2,
          sellVol: inst.U2,
        },

        {
          buyVol: 0,
          price: inst.S1,
          sellVol: inst.U1,
        },
        {
          buyVol: inst.V1,
          price: inst.B1,
          sellVol: 0,
        },
        {
          buyVol: inst.V2,
          price: inst.B2,
          sellVol: 0,
        },
        {
          buyVol: inst.V3,
          price: inst.B3,
          sellVol: 0,
        },
      ]);
    }
  }, [inst]);
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
        <SplashText
          val={row.price}
          trend={genTrend(inst?.RE, row.price, inst?.CL, inst?.FL)}
        >
          <Typography variant="subtitle1" color="inherit">
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
          color={genPriceColor(inst?.RE, row.FMP, inst?.CL, inst?.FL)}
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
        <GeneralInfo inst={inst} />
        <Line />
        <PriceInfo inst={inst} />
        <Line />
        <MarketValue inst={inst} />
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
      <Actions inst={inst} />
    </S.Wrapper>
  );
};
export default Ticker;
