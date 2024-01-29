import { Typography } from "@mui/material";
import * as S from "./styles";
import { useTranslations } from "next-intl";
import { formatNumber } from "@/src/utils/helpers";
import { FlexContent } from "@/src/styles/common";
const PortInfo = () => {
  const t = useTranslations("portfolio");

  return (
    <S.Wrapper>
      <FlexContent>
        <Typography variant="body2">
          {t("en_cu_stock_sum_onhandVal")}
        </Typography>
        <Typography variant="body2" fontWeight={600} color="text.primary">
          {formatNumber(12345678)}
        </Typography>
      </FlexContent>
      <FlexContent>
        <Typography variant="body2">
          {t("en_cu_stock_sum_receivingVal")}
        </Typography>
        <Typography variant="body2" fontWeight={600} color="text.primary">
          0
        </Typography>
      </FlexContent>
    </S.Wrapper>
  );
};
export default PortInfo;
