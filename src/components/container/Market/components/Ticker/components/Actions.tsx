import { ITickerData } from "@/src/interface/common";
import { Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { RowContent } from "@/src/styles/common";
import { genPriceColor, genTextWithPrefix } from "@/src/utils/helpers";
import { useTranslations } from "next-intl";
const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  gap: 8,
  padding: theme.spacing(2, 4),
  borderTop: `1px solid ${theme.palette.divider}`,
}));
const ActionBtn = styled(Button)(({ theme }) => ({
  flex: 1,
}));

const Actions = () => {
  const t = useTranslations("market");
  return (
    <Wrapper>
      <ActionBtn variant="contained" color="error">
        {t("fn_symbol_cta_sell")}
      </ActionBtn>
      <ActionBtn variant="contained" color="success">
        {t("fn_symbol_cta_buy")}
      </ActionBtn>
    </Wrapper>
  );
};
export default Actions;
