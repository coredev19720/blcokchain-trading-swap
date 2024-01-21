"use client";
import { Button, Typography } from "@mui/material";
import Header from "./components/Header";
import Search from "./components/Search";
import TickerInfo from "./components/TickerInfo";
import TicketInfo from "./components/TicketInfo";
import { useTranslations } from "next-intl";
import { useAppSelector } from "@/src/redux/hooks";
import * as S from "./styles";
import { TSide } from "@/src/enum";
const Trading = () => {
  const t = useTranslations("trade");
  const side = useAppSelector((state) => state.market.side);
  const ticker = useAppSelector((state) => state.market.ticker);
  return (
    <S.Wrapper>
      <Header />
      <S.MainContent>
        <Search />
        <TickerInfo />
        <TicketInfo />
        <S.AccStatus>
          <Typography variant="body2">{t("fn_trade_txt_accStatus")}</Typography>
          <Typography color="text.success" variant="body2">
            mapping
          </Typography>
        </S.AccStatus>
      </S.MainContent>
      <S.ButtonWrapper>
        <Button
          disabled={!ticker}
          fullWidth
          variant="contained"
          color={side === TSide.BUY ? "success" : "error"}
        >
          {t(side === TSide.BUY ? "fn_trade_cta_buy" : "fn_trade_cta_sell")}
        </Button>
      </S.ButtonWrapper>
    </S.Wrapper>
  );
};
export default Trading;
