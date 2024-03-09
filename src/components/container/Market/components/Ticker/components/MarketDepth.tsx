import FieldLabel from "@components/common/FieldLabel";
import StyledTable from "@components/common/StyledTable";
import { TSide } from "@enum/common";
import {
  IDealPrice,
  IHistoryDeal,
  IMarketDepth,
  ITickerData,
} from "@interface/common";
import { IColumn } from "@interface/table";
import { formatBigNumber, genPriceColor } from "@src/utils/helpers";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useTranslations } from "next-intl";
import { Stock } from "@/src/constraints/interface/services/response";

const Wrapper = styled("div")(() => ({
  display: "flex",
  gap: 8,
  height: 211,
}));
const BestDeal = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  flex: 1,
}));
const HistoryDeals = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  flex: 1,
}));
type Props = {
  ticker: Stock;
};
const MarketDepth = ({ ticker }: Props) => {
  const t = useTranslations("market");
  const bestDealCols: IColumn[] = [
    {
      title: t("en_sb_best_buyQty"),
      render: (row: IDealPrice) => (
        <Typography variant="subtitle1">
          {formatBigNumber(row.buyVol)}
        </Typography>
      ),
      align: "right",
    },
    {
      title: t("en_sb_best_price"),
      render: (row: IDealPrice) => (
        <Typography
          variant="subtitle1"
          color={genPriceColor(
            ticker.reference,
            row.price,
            ticker.ceiling,
            ticker.floor
          )}
        >
          {row.price}
        </Typography>
      ),
      align: "right",
    },
    {
      title: t("en_sb_best_sellQty"),
      render: (row: IDealPrice) => (
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
            ticker.reference,
            row.price,
            ticker.ceiling,
            ticker.floor
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
          color={row.side === TSide.BUY ? "text.success" : "text.error"}
        >
          {row.side === TSide.BUY ? "B" : "S"}
        </Typography>
      ),

      align: "center",
    },
  ];
  return (
    <Wrapper>
      <BestDeal>
        <FieldLabel>{t("fn_symbol_txt_bestQuote")}</FieldLabel>
        {/* <StyledTable
          columns={bestDealCols}
          dataSource={ticker.marketDepth.deals}
        /> */}
      </BestDeal>
      <HistoryDeals>
        <FieldLabel>{t("fn_symbol_txt_ordHist")}</FieldLabel>
        {/* <StyledTable
          columns={historyDealsCols}
          dataSource={ticker.marketDepth.historyDeals}
          stickyHeader
        /> */}
      </HistoryDeals>
    </Wrapper>
  );
};
export default MarketDepth;
