import FieldLabel from "@components/common/FieldLabel";
import Line from "@components/common/Line";
import { ITickerData } from "@interface/common";
import { RowContent } from "@src/styles/common";
import colors from "@src/themes/colors";
import { genPriceColor } from "@src/utils/helpers";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useTranslations } from "next-intl";
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
interface IProps {
  ticker: ITickerData;
}
const PriceInfo = ({ ticker }: IProps) => {
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
              ticker.ref,
              ticker.open,
              ticker.ceil,
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
              ticker.ref,
              ticker.high,
              ticker.ceil,
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
              ticker.ref,
              ticker.low,
              ticker.ceil,
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
            {ticker.ref}
          </Typography>
        </RowContent>
        <RowContent>
          <FieldLabel>{t("en_sb_price_celling")}</FieldLabel>

          <Typography
            fontWeight={500}
            color={colors.lightCeilText}
            variant="body2"
          >
            {ticker.ceil}
          </Typography>
        </RowContent>
        <RowContent>
          <FieldLabel>{t("en_sb_price_floor")}</FieldLabel>
          <Typography
            fontWeight={500}
            color={colors.lightFloorText}
            variant="body2"
          >
            {ticker.floor}
          </Typography>
        </RowContent>
      </ContentBlock>
    </Wrapper>
  );
};
export default PriceInfo;
