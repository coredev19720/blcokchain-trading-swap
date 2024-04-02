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
import { initInstrument } from "@/src/constants/market";
import { InsRTData } from "@/src/constraints/interface/market";
import { socketCfg } from "@/src/constants/config";
//@ts-ignore
import io from "socket.io-client";
const Trading = () => {
  const t = useTranslations("trade");
  const { ticket, ticker, stocks } = useAppSelector((state) => state.market);
  const [instrument, setInstrument] = useState<InsRTData>(initInstrument);
  const { accountSummary, activeAccount } = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const [socket, setSocket] = useState<io.Socket | null>(null);
  useEffect(() => {
    initTicker();
  }, [stocks]);
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
      if (data[0] === "i" && data[1].d[0]) {
        setInstrument({ ...instrument, ...data[1].d[0] });
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
  }, [ticker?.symbol]);
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
      data: { args: [`instrument:${symbol}`], op: "unsubscribe" },
      method: "get",
      url: socketCfg.subscribePath,
    });
  };

  const symbolEvent = (data: any) => {
    console.log(data);
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
          price: availTicker.reference,
          side: TSide.buy,
        })
      );
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
          <SymbolInfo instrument={instrument} />
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
