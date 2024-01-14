import FieldLabel from "@/src/components/common/FieldLabel";
import StyledTable from "@/src/components/common/StyledTable";
import {
  IDealPrice,
  IHistoryDeal,
  IMarketDepth,
  ITickerData,
} from "@/src/interface/common";
import { IColumn } from "@/src/interface/table";
import { formatBigNumber, genPriceColor } from "@/src/utils/helpers";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useTranslations } from "next-intl";

const Wrapper = styled("div")(() => ({
  display: "flex",
  gap: 8,
  height: 215,
}));
interface IProps {
  ticker: ITickerData;
}
const MarketIndex = ({ ticker }: IProps) => {
  const t = useTranslations("dashboard");
  const columns: IColumn[] = [
    {
      title: t("en_idx_code"),
      render: (row: IMarketInfo) => (
        <Typography variant="subtitle1">
          {formatBigNumber(row.buyVol)}
        </Typography>
      ),
      align: "right",
    },
    {
      title: t("en_idx_price_last"),
      render: (row: IMarketInfo) => (
        <Typography
          variant="subtitle1"
          color={genPriceColor(
            ticker.ref,
            row.price,
            ticker.ceil,
            ticker.floor
          )}
        >
          {row.price}
        </Typography>
      ),
      align: "right",
    },
    {
      title: t("en_idx_price_change"),
      render: (row: IMarketInfo) => (
        <Typography variant="subtitle1">
          {formatBigNumber(row.sellVol)}
        </Typography>
      ),
      align: "right",
    },
    {
      title: t("en_idx_value"),
      render: (row: IMarketInfo) => (
        <Typography variant="subtitle1">
          {formatBigNumber(row.sellVol)}
        </Typography>
      ),
      align: "right",
    },
    ,
  ];

  return (
    <Wrapper>
      <FieldLabel>{t("fn_symbol_txt_bestQuote")}</FieldLabel>
      <StyledTable columns={columns} dataSource={ticker.marketDepth.deals} />
    </Wrapper>
  );
};
export default MarketIndex;
