"use client";
import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import * as S from "./styles";
import { TPinAuthType, TSide } from "@enum/common";
import Search from "./components/Search";
import SymbolInfo from "./components/SymbolInfo";
import TicketInfo from "./components/TicketInfo";
import TicketConfirm from "./components/TicketConfirm";
import { lastSymLocalKey } from "@src/utils/helpers";
import { setTicker, setTicket } from "@src/redux/features/marketSlice";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import PageHeader from "../../common/PageHeader";
import { initInstrument } from "@/src/constants/market";
import { InsRTData, TradeRTData } from "@/src/constraints/interface/market";
import { socketCfg } from "@/src/constants/config";
import { usePrecheckOrder } from "@/src/services/hooks/order/usePrecheckOrder";
//@ts-ignore
import io from "socket.io-client";
import { usePreviousValue } from "@/src/hooks/usePrevious";
const Trading = () => {
  const t = useTranslations("trade");
  const { ticket, ticker, stocks } = useAppSelector((state) => state.market);
  const { accountSummary, activeAccount, permissions } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [socket, setSocket] = useState<io.Socket | null>(null);
  const [instrument, setInstrument] = useState<InsRTData>(initInstrument);
  const [trades, setTrades] = useState<TradeRTData[]>([]);
  const prevSymbol = usePreviousValue(ticker?.symbol);
  useEffect(() => {
    initTicker();
  }, [stocks]);
  const activePermission =
    activeAccount && permissions ? permissions[activeAccount.id] : null;
  const { onPrecheckOrder, isError, isSuccess, error } = usePrecheckOrder();
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_URL || "";
    const skt: io.Socket = io(url, {
      transports: socketCfg.transport,
      path: socketCfg.path,
      query: {
        __sails_io_sdk_version: socketCfg.version,
        __sails_io_sdk_platform: socketCfg.platform,
        __sails_io_sdk_language: socketCfg.lang,
      },
    });
    setSocket(skt);
    skt.on("connect", connect);
    skt.on("disconnect", () => console.log("Disconnected from the server"));
    // skt.on("connection", symbolSub(skt, "HCM"));
    skt.on("i", (data: any) => {
      if (data.d[0]) {
        handleIEvent(data.d[0]);
      }
    });
    skt.on("t", (data: any) => {
      if (data.d[0]) {
        const rtData: TradeRTData = data.d[0];
        handleTEvent(rtData);
      }
    });
    return () => {
      if (skt) {
        skt.disconnect();
      }
    };
  }, []);
  useEffect(() => {
    if (ticker && socket) {
      symbolSub(socket, ticker.symbol);
    }
    if (prevSymbol && prevSymbol !== ticker?.symbol && socket) {
      symbolUnsub(socket, prevSymbol);
      setInstrument(initInstrument);
      setTrades([]);
    }
  }, [ticker]);
  const connect = () => {
    console.log("Connected to the server");
  };

  const symbolSub = (socket: io.Socket, symbol: string) => {
    socket.emit("get", {
      data: {
        args: [`t:${symbol}`, `i:${symbol}`],
        op: "subscribe",
      },
      method: "get",
      url: socketCfg.subscribePath,
    });
  };

  const symbolUnsub = (socket: io.Socket, symbol: string) => {
    socket.emit("get", {
      data: {
        args: [`t:${symbol}`, `i:${symbol}`],
        op: "unsubscribe",
      },
      method: "get",
      url: socketCfg.subscribePath,
    });
  };

  const handleIEvent = (data: any) => {
    setInstrument((prev) => ({ ...prev, ...data }));
  };

  const handleTEvent = (data: TradeRTData) => {
    setTrades((prev) => [data, ...prev]);
  };

  const initTicker = () => {
    if (ticker) return;
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
          price: (availTicker.reference / 1000).toFixed(2),
          side: TSide.buy,
        })
      );
    }
  };
  const handleClickTrade = () => {
    if (
      !ticker ||
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
      side: ticket.side, // Mua/Bán - 'buy' or 'sell'
      type: ticket.type, // 'limit': Lệnh LO, 'market':Lệnh thị trường ATO, ATC,...
      limitPrice: ticket.price, // Giá
      authtype: activePermission.ORDINPUT[0], // Loại xác thực, tra cứu bảng 3.5.3;
    });
    setIsConfirm(true);
  };
  return (
    <S.Wrapper>
      <PageHeader title={t("fn_trade_txt_title")} />
      <S.Content>
        <S.MainContent>
          <Search />
          <SymbolInfo instrument={instrument} ticker={ticker} />
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
            disabled={
              !ticker ||
              !ticket.price ||
              !ticket.vol ||
              !activeAccount ||
              !activePermission
            }
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
