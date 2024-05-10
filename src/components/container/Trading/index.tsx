"use client";
import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import * as S from "./styles";
import { TOrderType, TSide } from "@enum/common";
import Search from "./components/Search";
import SymbolInfo from "./components/SymbolInfo";
import TicketInfo from "./components/TicketInfo";
import TicketConfirm from "./components/TicketConfirm";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { PageHeader, NotiContent } from "@components/common";
import { PortItem } from "@/src/constraints/interface/market";
import { usePrecheckOrder, useGetAvailTrade } from "@/src/services/hooks";
import { toast } from "react-toastify";
import { errHandling } from "@/src/utils/error";
import { setSelectedStock } from "@/src/redux/features/marketSlice";
import { useSearchParams } from "next/navigation";
import {
  lastSymLocalKey,
  setLastSymbolToLocalStorage,
} from "@/src/utils/helpers";

const Trading = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const t = useTranslations("trade");
  const { ticket, selectedStock, ports, inst, stocks } = useAppSelector(
    (state) => state.market
  );
  const { accountSummary, activeAccount, permissions } = useAppSelector(
    (state) => state.user
  );
  const { onPrecheckOrder, isError, isSuccess, error, data } =
    usePrecheckOrder();
  const { data: availTrade, refetch: refetchAvailTrade } = useGetAvailTrade(
    activeAccount?.id ?? "",
    selectedStock?.symbol ?? "",
    TSide.buy,
    ticket.price ? Number(ticket.price) * 1000 : 0
  );
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [symbolPort, setSymbolPort] = useState<PortItem | null>(null);
  const activePermission =
    activeAccount && permissions ? permissions[activeAccount.id] : null;
  const maxVol =
    ticket?.side === TSide.sell
      ? symbolPort?.trade ?? 0
      : availTrade?.maxqtty ?? 0;

  useEffect(() => {
    if (ticket && ports) {
      const port = ports.find((p) => p.symbol === ticket?.symbol);
      setSymbolPort(port || null);
    }
  }, [ticket]);
  useEffect(() => {
    ticket?.side === TSide.buy && refetchAvailTrade();
  }, [ticket.price, ticket.symbol]);

  useEffect(() => {
    if (isError && error) {
      const errMsg = errHandling(error);
      toast.error(errMsg);
    }
  }, [isError, error]);
  useEffect(() => {
    if (isSuccess) {
      setIsConfirm(true);
    }
  }, [isSuccess]);
  useEffect(() => {
    !!stocks.length && activeAccount && ports && initTicker();
  }, [stocks, activeAccount, ports]);

  const handleClickTrade = () => {
    if (
      !selectedStock ||
      !ticket.price ||
      !ticket.vol ||
      !activeAccount ||
      !activePermission
    )
      return;
    onPrecheckOrder({
      accountId: activeAccount.id || "",
      instrument: ticket.symbol,
      qty: ticket.vol,
      side: ticket.side,
      type: ticket.type === TOrderType.LO ? "limit" : "market",
      limitPrice: Number(ticket.price) * 1000,
      authtype: activePermission.ORDINPUT[0],
    });
  };
  const initTicker = () => {
    let s = searchParams?.get("s");
    let lastSym = null;
    let firstPortItem = null;
    if (!selectedStock.symbol) {
      lastSym = localStorage.getItem(lastSymLocalKey);
      firstPortItem = ports && ports.length > 0 ? ports[0].symbol : "";
    }
    if (s === selectedStock.symbol) {
      s = null;
    }
    const symbol = s ?? lastSym ?? firstPortItem;
    const stock = stocks.find((s) => s.symbol === symbol?.toUpperCase());
    if (stock) {
      dispatch(setSelectedStock(stock));
      setLastSymbolToLocalStorage(stock.symbol);
    }
  };
  const btnDisabled =
    !inst ||
    !ticket.price ||
    !ticket.vol ||
    !activeAccount ||
    !activePermission;

  return (
    <S.Wrapper>
      <PageHeader title={t("fn_trade_txt_title")} />
      <S.Content>
        <S.MainContent>
          <Search />
          <SymbolInfo inst={inst} maxVol={maxVol} />
          <TicketInfo inst={inst} maxVol={maxVol} />
          {/* Trạng thái tiểu khoản */}
          <S.AccStatus>
            <Typography variant="body2">
              {t("fn_trade_txt_accStatus")}
            </Typography>
            <Typography color="text.success" variant="body2">
              {accountSummary && activeAccount
                ? accountSummary[activeAccount.id]?.afstatus_en
                : ""}
            </Typography>
          </S.AccStatus>
          {/* 2FA type noti */}
          <NotiContent type="warning" message="Thông báo" />
        </S.MainContent>
        <S.ButtonWrapper>
          <Button
            disabled={btnDisabled}
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
      <TicketConfirm
        open={isConfirm}
        setOpen={setIsConfirm}
        precheckData={data ?? null}
      />
    </S.Wrapper>
  );
};
export default Trading;
