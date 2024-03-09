import FieldLabel from "@components/common/FieldLabel";
import { ColContent } from "@src/styles/common";
import { ITickerData } from "@interface/common";
import { formatBigNumber } from "@src/utils/helpers";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useTranslations } from "next-intl";
import { Stock } from "@/src/constraints/interface/services/response";
const Wrapper = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-around",
}));

type Props = {
  ticker: Stock;
};
const MarketValue = ({ ticker }: Props) => {
  const t = useTranslations("market");
  return (
    <Wrapper>
      {/* <ColContent>
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
      </ColContent> */}
    </Wrapper>
  );
};
export default MarketValue;
