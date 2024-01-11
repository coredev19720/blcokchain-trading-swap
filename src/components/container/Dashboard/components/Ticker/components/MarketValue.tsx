import FieldLabel from "@/src/components/common/FieldLabel";
import { ITickerData } from "@/src/interface/common";
import { ColContent } from "@/src/styles/common";
import { formatBigNumber, formatNumber } from "@/src/utils/helpers";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useTranslations } from "next-intl";
const Wrapper = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-around",
}));

interface IProps {
  ticker: ITickerData;
}
const MarketValue = ({ ticker }: IProps) => {
  const t = useTranslations("dashboard");
  return (
    <Wrapper>
      <ColContent>
        <FieldLabel>{t("en_sb_sum_value")}</FieldLabel>
        <Typography fontWeight={500} variant="body2">
          {formatBigNumber(ticker.marketValue)}
        </Typography>
      </ColContent>
      <ColContent>
        <FieldLabel>{t("en_sb_sum_qty")}</FieldLabel>
        <Typography fontWeight={500} variant="body2">
          {formatBigNumber(ticker.vol)}
        </Typography>
      </ColContent>
      <ColContent>
        <FieldLabel>{t("en_sb_sum_foreignBQty")}</FieldLabel>
        <Typography fontWeight={500} variant="body2">
          {formatBigNumber(ticker.klnnBuy)}
        </Typography>
      </ColContent>
      <ColContent>
        <FieldLabel>{t("en_sb_sum_foreignSQty")}</FieldLabel>
        <Typography fontWeight={500} variant="body2">
          {formatBigNumber(ticker.klnnSell)}
        </Typography>
      </ColContent>
    </Wrapper>
  );
};
export default MarketValue;
