import FieldLabel from "@components/common/FieldLabel";
import StyledTable from "@components/common/StyledTable";
import { IColumn } from "@interface/table";
import {
  formatBigNumber,
  formatNumber,
  genIndexColor,
  genIndexTrend,
  genTextWithPrefix,
} from "@src/utils/helpers";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useTranslations } from "next-intl";
import { useAppSelector } from "@/src/redux/hooks";
import { IndexRTData } from "@/src/constraints/interface/market";
import { SplashText } from "@/src/components/common";
const Wrapper = styled("div")(() => ({
  display: "flex",
  gap: 8,
  flexDirection: "column",
}));

const MarketIndex = () => {
  const { idx } = useAppSelector((state) => state.market);
  const t = useTranslations("market");
  const columns: IColumn[] = [
    {
      title: t("en_idx_code"),
      render: (row: IndexRTData) => (
        <SplashText val={row.ICH}>
          <Typography variant="subtitle1" fontWeight={700}>
            {row.MC}
          </Typography>
        </SplashText>
      ),
      align: "right",
    },
    {
      title: t("en_idx_price_last"),
      render: (row: IndexRTData) => (
        <SplashText val={row.ICH} trend={genIndexTrend(row.ICH)}>
          <Typography
            fontWeight={500}
            variant="subtitle1"
            color={genIndexColor(row.ICH)}
          >
            {formatNumber(row.MI)}
          </Typography>
        </SplashText>
      ),
      align: "right",
    },
    {
      title: t("en_idx_price_change"),
      render: (row: IndexRTData) => (
        <SplashText val={row.ICH} trend={genIndexTrend(row.ICH)}>
          <Typography
            fontWeight={500}
            variant="subtitle1"
            color={genIndexColor(row.ICH)}
          >{`${genTextWithPrefix(row.ICH)}(${genTextWithPrefix(
            row.IPC
          )}%)`}</Typography>
        </SplashText>
      ),
      align: "right",
    },
    {
      title: t("en_idx_value"),
      render: (row: IndexRTData) => (
        <SplashText val={row.ICH}>
          <Typography variant="subtitle1">
            {formatBigNumber(row.TVS)}
          </Typography>
        </SplashText>
      ),
      align: "right",
    },
  ];

  return (
    <Wrapper>
      <FieldLabel>{t("fn_symbol_txt_bestQuote")}</FieldLabel>
      <StyledTable columns={columns} dataSource={idx} />
    </Wrapper>
  );
};
export default MarketIndex;
