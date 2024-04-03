import FieldLabel from "@components/common/FieldLabel";
import Line from "@components/common/Line";
import { RowContent } from "@src/styles/common";
import colors from "@src/themes/colors";
import { formatNumber, genPriceColor } from "@src/utils/helpers";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useTranslations } from "next-intl";
import { InsRTData, Stock } from "@/src/constraints/interface/market";
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
  instrument: InsRTData;
  ticker: Stock | null;
};
const PriceInfo = ({ instrument, ticker }: Props) => {
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
              ticker?.reference,
              instrument.OP,
              ticker?.ceiling,
              ticker?.floor
            )}
          >
            {instrument.OP}
          </Typography>
        </RowContent>
        <RowContent>
          <FieldLabel>{t("en_sb_price_highest")}</FieldLabel>
          <Typography
            fontWeight={500}
            variant="body2"
            color={genPriceColor(
              ticker?.reference,
              instrument.HI,
              ticker?.ceiling,
              ticker?.floor
            )}
          >
            {instrument.HI}
          </Typography>
        </RowContent>
        <RowContent>
          <FieldLabel>{t("en_sb_price_lowest")}</FieldLabel>
          <Typography
            fontWeight={500}
            variant="body2"
            color={genPriceColor(
              ticker?.reference,
              instrument.LO,
              ticker?.ceiling,
              ticker?.floor
            )}
          >
            {instrument.LO}
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
            {ticker ? (ticker.reference / 1000).toFixed(2) : "-"}
          </Typography>
        </RowContent>
        <RowContent>
          <FieldLabel>{t("en_sb_price_celling")}</FieldLabel>

          <Typography
            fontWeight={500}
            color={colors.lightCeilText}
            variant="body2"
          >
            {ticker ? (ticker.ceiling / 1000).toFixed(2) : "-"}
          </Typography>
        </RowContent>
        <RowContent>
          <FieldLabel>{t("en_sb_price_floor")}</FieldLabel>
          <Typography
            fontWeight={500}
            color={colors.lightFloorText}
            variant="body2"
          >
            {ticker ? (ticker.floor / 1000).toFixed(2) : "-"}
          </Typography>
        </RowContent>
      </ContentBlock>
    </Wrapper>
  );
};
export default PriceInfo;
