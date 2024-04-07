import FieldLabel from "@components/common/FieldLabel";
import Line from "@components/common/Line";
import { RowContent } from "@src/styles/common";
import { genTrend } from "@src/utils/helpers";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useTranslations } from "next-intl";
import { InsRTData, Stock } from "@/src/constraints/interface/market";
import SplashText from "@/src/components/common/SplashText";
import React from "react";
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
          <SplashText
            key={instrument.OP}
            trend={genTrend(
              ticker?.reference,
              instrument.OP,
              ticker?.ceiling,
              ticker?.floor
            )}
          >
            <Typography fontWeight={500} variant="body2" color="inherit">
              {instrument.OP}
            </Typography>
          </SplashText>
        </RowContent>
        <RowContent>
          <FieldLabel>{t("en_sb_price_highest")}</FieldLabel>
          <SplashText
            key={instrument.HI}
            trend={genTrend(
              ticker?.reference,
              instrument.HI,
              ticker?.ceiling,
              ticker?.floor
            )}
          >
            <Typography fontWeight={500} variant="body2" color="inherit">
              {instrument.HI}
            </Typography>
          </SplashText>
        </RowContent>
        <RowContent>
          <FieldLabel>{t("en_sb_price_lowest")}</FieldLabel>
          <SplashText
            key={instrument.LO}
            trend={genTrend(
              ticker?.reference,
              instrument.LO,
              ticker?.ceiling,
              ticker?.floor
            )}
          >
            <Typography fontWeight={500} variant="body2" color="inherit">
              {instrument.LO}
            </Typography>
          </SplashText>
        </RowContent>
      </ContentBlock>
      <Line vertical />
      <ContentBlock>
        <RowContent>
          <FieldLabel>{t("en_sb_price_ref")}</FieldLabel>
          <SplashText key={ticker?.reference || 0} trend="ref">
            <Typography fontWeight={500} variant="body2" color="inherit">
              {ticker ? (ticker.reference / 1000).toFixed(2) : "-"}
            </Typography>
          </SplashText>
        </RowContent>
        <RowContent>
          <FieldLabel>{t("en_sb_price_celling")}</FieldLabel>
          <SplashText key={ticker?.ceiling || 0} trend="ce">
            <Typography fontWeight={500} variant="body2" color="inherit">
              {ticker ? (ticker.ceiling / 1000).toFixed(2) : "-"}
            </Typography>
          </SplashText>
        </RowContent>
        <RowContent>
          <FieldLabel>{t("en_sb_price_floor")}</FieldLabel>
          <SplashText key={ticker?.floor || 0} trend="fl">
            <Typography fontWeight={500} variant="body2" color="inherit">
              {ticker ? (ticker.floor / 1000).toFixed(2) : "-"}
            </Typography>
          </SplashText>
        </RowContent>
      </ContentBlock>
    </Wrapper>
  );
};
export default PriceInfo;
