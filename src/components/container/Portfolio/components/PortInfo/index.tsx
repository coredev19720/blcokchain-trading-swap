import { Typography } from "@mui/material";
import * as S from "./styles";
import { useTranslations } from "next-intl";
import { formatNumber } from "@src/utils/helpers";
import { FlexContent } from "@src/styles/common";
import { useAppSelector } from "@/src/redux/hooks";
const PortInfo = () => {
  const { accountSummary, activeAccount } = useAppSelector(
    (state) => state.user
  );
  const t = useTranslations("portfolio");

  return (
    <S.Wrapper>
      <FlexContent>
        <Typography variant="body2">
          {t("en_cu_stock_sum_onhandVal")}
        </Typography>
        <Typography variant="body2" fontWeight={600} color="text.primary">
          {accountSummary &&
            activeAccount &&
            formatNumber(accountSummary[activeAccount.id]?.totalseamt || 0)}
        </Typography>
      </FlexContent>
      <FlexContent>
        <Typography variant="body2">
          {t("en_cu_stock_sum_receivingVal")}
        </Typography>
        <Typography variant="body2" fontWeight={600} color="text.primary">
          {accountSummary &&
            activeAccount &&
            formatNumber(accountSummary[activeAccount.id]?.totalbuyamt || 0)}
        </Typography>
      </FlexContent>
    </S.Wrapper>
  );
};
export default PortInfo;
