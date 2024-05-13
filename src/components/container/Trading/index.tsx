"use client";
import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import * as S from "./styles";
import { TOrderType, TPinAuthType, TSide } from "@enum/common";
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
  unFormatNumber,
} from "@/src/utils/helpers";

const Trading = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const t = useTranslations("trade");
  const { ticket, selectedStock, ports, inst, stocks } = useAppSelector(
    (state) => state.market
  );
  const { accountSummary, activeAccount, permissions, verifyInfo } =
    useAppSelector((state) => state.user);
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
  }, [ticket.symbol, activeAccount]);

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
  const invalidTicket =
    !inst ||
    !unFormatNumber(ticket.price) ||
    !unFormatNumber(ticket.vol) ||
    !activeAccount ||
    !activePermission ||
    activePermission?.STOCKTRANS[0] === TPinAuthType.DIGI_SIGN;

  const handleClickTrade = () => {
    if (invalidTicket) return;
    onPrecheckOrder({
      accountId: activeAccount.id || "",
      instrument: ticket.symbol,
      qty: unFormatNumber(ticket.vol) * unFormatNumber(ticket.multiple),
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
  const genNoticeMsg = () => {
    if (!activePermission?.STOCKTRANS[0]) {
      return t("fn_trade_txt_no_auth_notice");
    }
    if (activePermission?.STOCKTRANS[0] === TPinAuthType.SMSOTP) {
      return t("fn_trade_txt_auth_notice");
    }
    return "";
  };

  return (
    <S.Wrapper>
      <PageHeader title={t("fn_trade_txt_title")} />
      <S.Content>
        <S.MainContent>
          <Search />
          <SymbolInfo inst={inst} maxVol={maxVol} />
          <TicketInfo
            inst={inst}
            maxVol={maxVol}
            refetchAvailTrade={refetchAvailTrade}
          />
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
          {(!activePermission?.STOCKTRANS[0] ||
            activePermission?.STOCKTRANS[0] === TPinAuthType.DIGI_SIGN) && (
            <NotiContent type="warning" message={genNoticeMsg()} />
          )}
        </S.MainContent>
        <S.ButtonWrapper>
          <Button
            disabled={invalidTicket}
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
        verifyInfo={verifyInfo}
      />
    </S.Wrapper>
  );
};
export default Trading;
