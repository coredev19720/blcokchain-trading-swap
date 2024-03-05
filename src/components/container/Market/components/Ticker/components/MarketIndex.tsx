import FieldLabel from "@components/common/FieldLabel";
import StyledTable from "@components/common/StyledTable";
import { IMarketInfo, ITickerData } from "@interface/common";
import { IColumn } from "@interface/table";
import {
  formatBigNumber,
  formatNumber,
  genIndexColor,
  genPriceColor,
  genTextWithPrefix,
} from "@src/utils/helpers";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useTranslations } from "next-intl";
import { marketIndex } from "@src/constants/dumpData/dashboard";
const Wrapper = styled("div")(() => ({
  display: "flex",
  gap: 8,
  flexDirection: "column",
}));

const MarketIndex = () => {
  const t = useTranslations("market");
  const columns: IColumn[] = [
    {
      title: t("en_idx_code"),
      render: (row: IMarketInfo) => (
        <Typography variant="subtitle1" fontWeight={700} color="text.primary">
          {row.name}
        </Typography>
      ),
      align: "right",
    },
    {
      title: t("en_idx_price_last"),
      render: (row: IMarketInfo) => (
        <Typography variant="subtitle1" color={genIndexColor(row.chg)}>
          {formatNumber(row.index)}
        </Typography>
      ),
      align: "right",
    },
    {
      title: t("en_idx_price_change"),
      render: (row: IMarketInfo) => (
        <Typography
          fontWeight={500}
          variant="subtitle1"
          color={genIndexColor(row.chg)}
        >{`${genTextWithPrefix(row.chg)}(${genTextWithPrefix(
          row.pctChg
        )}%)`}</Typography>
      ),
      align: "right",
    },
    {
      title: t("en_idx_value"),
      render: (row: IMarketInfo) => (
        <Typography variant="subtitle1">
          {formatBigNumber(row.value)}
        </Typography>
      ),
      align: "right",
    },
  ];

  return (
    <Wrapper>
      <FieldLabel>{t("fn_symbol_txt_bestQuote")}</FieldLabel>
      <StyledTable columns={columns} dataSource={marketIndex} />
    </Wrapper>
  );
};
export default MarketIndex;
