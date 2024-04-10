import FieldLabel from "@components/common/FieldLabel";
import { ColContent } from "@src/styles/common";
import { formatBigNumber } from "@src/utils/helpers";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useTranslations } from "next-intl";
import { InsRTData } from "@/src/constraints/interface/market";
const Wrapper = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-around",
}));

type Props = {
  inst: InsRTData | null;
};
const MarketValue = ({ inst }: Props) => {
  const t = useTranslations("market");
  return (
    <Wrapper>
      <ColContent>
        <FieldLabel>{t("en_sb_sum_value")}</FieldLabel>
        <Typography fontWeight={500} variant="body2">
          {formatBigNumber(inst?.TV)}
        </Typography>
      </ColContent>
      <ColContent>
        <FieldLabel>{t("en_sb_sum_qty")}</FieldLabel>
        <Typography fontWeight={500} variant="body2">
          {formatBigNumber(inst?.TT)}
        </Typography>
      </ColContent>
      <ColContent>
        <FieldLabel>{t("en_sb_sum_foreignBQty")}</FieldLabel>
        <Typography fontWeight={500} variant="body2">
          {formatBigNumber(inst?.FB)}
        </Typography>
      </ColContent>
      <ColContent>
        <FieldLabel>{t("en_sb_sum_foreignSQty")}</FieldLabel>
        <Typography fontWeight={500} variant="body2">
          {formatBigNumber(inst?.FS)}
        </Typography>
      </ColContent>
    </Wrapper>
  );
};
export default MarketValue;
