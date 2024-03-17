"use client";
import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import * as S from "./styles";
import { TSide } from "@enum/common";
import Search from "./components/Search";
import SymbolInfo from "./components/SymbolInfo";
import TicketInfo from "./components/TicketInfo";
import TicketConfirm from "./components/TicketConfirm";
import { lastSymLocalKey } from "@src/utils/helpers";
import { setTicker, setTicket } from "@src/redux/features/marketSlice";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import PageHeader from "../../common/PageHeader";
const Trading = () => {
  const t = useTranslations("trade");
  const { ticket, ticker, stocks } = useAppSelector((state) => state.market);
  const { accountSummary, activeAccount } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  useEffect(() => {
    initTicker();
  }, [stocks]);

  const initTicker = () => {
    if (!ticker) {
      const lastSymbol = localStorage.getItem(lastSymLocalKey);
      const availTicker = lastSymbol
        ? stocks.find((t) => t.symbol === lastSymbol.toUpperCase())
        : null;
      if (availTicker) {
        dispatch(setTicker(availTicker));
        dispatch(
          setTicket({
            ...ticket,
            symbol: availTicker.symbol,
            price: availTicker.reference,
            side: TSide.buy,
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
      <PageHeader title={t("fn_trade_txt_title")} />
      <S.Content>
        <S.MainContent>
          <Search />
          <SymbolInfo />
          <TicketInfo />
          <S.AccStatus>
            <Typography variant="body2">
              {t("fn_trade_txt_accStatus")}
            </Typography>
            <Typography color="text.success" variant="body2">
              {accountSummary && activeAccount
                ? accountSummary[activeAccount.id].afstatus_en
                : ""}
            </Typography>
          </S.AccStatus>
        </S.MainContent>
        <S.ButtonWrapper>
          <Button
            disabled={!ticker || !ticket.price || !ticket.vol}
            fullWidth
            variant="contained"
            color={ticket.side === TSide.buy ? "success" : "error"}
            onClick={handleClickTrade}
            size="large"
          >
            {t(
              ticket.side === TSide.buy
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
