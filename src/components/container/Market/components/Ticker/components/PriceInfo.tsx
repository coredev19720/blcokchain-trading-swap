import FieldLabel from "@components/common/FieldLabel";
import Line from "@components/common/Line";
import { RowContent } from "@src/styles/common";
import { genTrend } from "@src/utils/helpers";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useTranslations } from "next-intl";
import { InsRTData } from "@/src/constraints/interface/market";
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
  inst: InsRTData | null;
};
const PriceInfo = ({ inst }: Props) => {
  const t = useTranslations("market");

  return (
    <Wrapper>
      <ContentBlock>
        <RowContent>
          <FieldLabel>{t("en_sb_price_open")}</FieldLabel>
          <SplashText
            val={inst?.OP}
            trend={genTrend(inst?.RE, inst?.OP, inst?.CL, inst?.FL)}
          >
            <Typography fontWeight={500} variant="body2" color="inherit">
              {inst ? (inst.OP / 1000).toFixed(2) : "-"}
            </Typography>
          </SplashText>
        </RowContent>
        <RowContent>
          <FieldLabel>{t("en_sb_price_highest")}</FieldLabel>
          <SplashText
            val={inst?.HI}
            trend={genTrend(inst?.RE, inst?.HI, inst?.CL, inst?.FL)}
          >
            <Typography fontWeight={500} variant="body2" color="inherit">
              {inst ? (inst.HI / 1000).toFixed(2) : "-"}
            </Typography>
          </SplashText>
        </RowContent>
        <RowContent>
          <FieldLabel>{t("en_sb_price_lowest")}</FieldLabel>
          <SplashText
            val={inst?.LO}
            trend={genTrend(inst?.RE, inst?.LO, inst?.CL, inst?.FL)}
          >
            <Typography fontWeight={500} variant="body2" color="inherit">
              {inst ? (inst.LO / 1000).toFixed(2) : "-"}
            </Typography>
          </SplashText>
        </RowContent>
      </ContentBlock>
      <Line vertical />
      <ContentBlock>
        <RowContent>
          <FieldLabel>{t("en_sb_price_ref")}</FieldLabel>
          <SplashText val={inst?.RE ?? 0} trend="ref">
            <Typography fontWeight={500} variant="body2" color="inherit">
              {inst ? (inst.RE / 1000).toFixed(2) : "-"}
            </Typography>
          </SplashText>
        </RowContent>
        <RowContent>
          <FieldLabel>{t("en_sb_price_celling")}</FieldLabel>
          <SplashText val={inst?.CL ?? 0} trend="ce">
            <Typography fontWeight={500} variant="body2" color="inherit">
              {inst ? (inst.CL / 1000).toFixed(2) : "-"}
            </Typography>
          </SplashText>
        </RowContent>
        <RowContent>
          <FieldLabel>{t("en_sb_price_floor")}</FieldLabel>
          <SplashText val={inst?.FL ?? 0} trend="fl">
            <Typography fontWeight={500} variant="body2" color="inherit">
              {inst ? (inst.FL / 1000).toFixed(2) : "-"}
            </Typography>
          </SplashText>
        </RowContent>
      </ContentBlock>
    </Wrapper>
  );
};
export default PriceInfo;
