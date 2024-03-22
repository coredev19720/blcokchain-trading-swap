import FieldLabel from "@components/common/FieldLabel";
import Line from "@components/common/Line";
import { ITickerData } from "@interface/common";
import { RowContent } from "@src/styles/common";
import colors from "@src/themes/colors";
import { formatNumber, genPriceColor } from "@src/utils/helpers";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useTranslations } from "next-intl";
import { Stock } from "@/src/constraints/interface/market";
const Wrapper = styled("div")(() => ({
  display: "flex",
  gap: 8,
}));
const ContentBlock = styled("div")(() => ({
  flex: 1,
  gap: 8,
  display: "flex",
  flexDirection: "column",
}));
type Props = {
  ticker: Stock;
};
const PriceInfo = ({ ticker }: Props) => {
  const t = useTranslations("market");
  return (
    <Wrapper>
      <ContentBlock>
        <RowContent>
          <FieldLabel>{t("en_sb_price_open")}</FieldLabel>
          <Typography
            fontWeight={500}
            variant="body2"
            color={genPriceColor(
              ticker.reference,
              ticker.open,
              ticker.ceiling,
              ticker.floor
            )}
          >
            {ticker.open}
          </Typography>
        </RowContent>
        <RowContent>
          <FieldLabel>{t("en_sb_price_highest")}</FieldLabel>
          <Typography
            fontWeight={500}
            variant="body2"
            color={genPriceColor(
              ticker.reference,
              ticker.high,
              ticker.ceiling,
              ticker.floor
            )}
          >
            {ticker.high}
          </Typography>
        </RowContent>
        <RowContent>
          <FieldLabel>{t("en_sb_price_lowest")}</FieldLabel>
          <Typography
            fontWeight={500}
            variant="body2"
            color={genPriceColor(
              ticker.reference,
              ticker.low,
              ticker.ceiling,
              ticker.floor
            )}
          >
            {ticker.low}
          </Typography>
        </RowContent>
      </ContentBlock>
      <Line vertical />
      <ContentBlock>
        <RowContent>
          <FieldLabel>{t("en_sb_price_ref")}</FieldLabel>
          <Typography
            fontWeight={500}
            color={colors.lightRefText}
            variant="body2"
          >
            {formatNumber(ticker.reference / 1000, 2)}
          </Typography>
        </RowContent>
        <RowContent>
          <FieldLabel>{t("en_sb_price_celling")}</FieldLabel>

          <Typography
            fontWeight={500}
            color={colors.lightCeilText}
            variant="body2"
          >
            {formatNumber(ticker.ceiling / 1000, 2)}
          </Typography>
        </RowContent>
        <RowContent>
          <FieldLabel>{t("en_sb_price_floor")}</FieldLabel>
          <Typography
            fontWeight={500}
            color={colors.lightFloorText}
            variant="body2"
          >
            {formatNumber(ticker.floor / 1000, 2)}
          </Typography>
        </RowContent>
      </ContentBlock>
    </Wrapper>
  );
};
export default PriceInfo;
