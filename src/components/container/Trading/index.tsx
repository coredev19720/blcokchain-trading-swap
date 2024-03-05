"use client";
import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import * as S from "./styles";
import { TSide } from "@enum/common";
import Header from "./components/Header";
import Search from "./components/Search";
import TickerInfo from "./components/TickerInfo";
import TicketInfo from "./components/TicketInfo";
import TicketConfirm from "./components/TicketConfirm";
import { lastSymLocalKey } from "@src/utils/helpers";
import { tickers } from "@src/constants/dumpData/dashboard";
import { setTicker, setTicket } from "@src/redux/features/marketSlice";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
const Trading = () => {
  const t = useTranslations("trade");
  const ticket = useAppSelector((state) => state.market.ticket);
  const ticker = useAppSelector((state) => state.market.ticker);
  const dispatch = useAppDispatch();
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  useEffect(() => {
    initTicker();
  }, []);

  const initTicker = () => {
    if (!ticker) {
      const lastSymbol = localStorage.getItem(lastSymLocalKey);
      const availTicker = lastSymbol
        ? tickers.find((t) => t.symbol === lastSymbol.toUpperCase())
        : null;
      if (availTicker) {
        dispatch(setTicker(availTicker));
        dispatch(
          setTicket({
            ...ticket,
            symbol: availTicker.symbol,
            price: availTicker.ref,
            side: TSide.BUY,
          })
        );
      }
    }
  };
  const handleClickTrade = () => {
    setIsConfirm(true);
  };
  return (
    <S.Wrapper>
      <Header />
      <S.Content>
        <S.MainContent>
          <Search />
          <TickerInfo />
          <TicketInfo />
          <S.AccStatus>
            <Typography variant="body2">
              {t("fn_trade_txt_accStatus")}
            </Typography>
            <Typography color="text.success" variant="body2">
              mapping
            </Typography>
          </S.AccStatus>
        </S.MainContent>
        <S.ButtonWrapper>
          <Button
            disabled={!ticker || !ticket.price || !ticket.vol}
            fullWidth
            variant="contained"
            color={ticket.side === TSide.BUY ? "success" : "error"}
            onClick={handleClickTrade}
          >
            {t(
              ticket.side === TSide.BUY
                ? "fn_trade_cta_buy"
                : "fn_trade_cta_sell"
            )}
          </Button>
        </S.ButtonWrapper>
      </S.Content>
      <TicketConfirm open={isConfirm} setOpen={setIsConfirm} />
    </S.Wrapper>
  );
};
export default Trading;
