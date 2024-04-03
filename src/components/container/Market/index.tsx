"use client";
import { Wrapper } from "./styles";
import SearchInput from "./components/SearchInput";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Ticker from "./components/Ticker";
import EmptyState from "./components/EmptyState";
import { useAppSelector, useAppDispatch } from "@src/redux/hooks";
import { setTicker, setTicket } from "@src/redux/features/marketSlice";
import SearchPanel from "../../common/SearchPanel";
import {
  setLastSymbolToLocalStorage,
  lastSymLocalKey,
} from "@src/utils/helpers";
//@ts-ignore
import io from "socket.io-client";
import { socketCfg } from "@src/constants/config";
import { InsRTData, TradeRTData } from "@/src/constraints/interface/market";
import { initInstrument } from "@/src/constants/market";
import { usePreviousValue } from "@/src/hooks/usePrevious";
const Market = () => {
  const searchParams = useSearchParams();
  const { ticker, ticket, stocks } = useAppSelector((state) => state.market);
  const dispatch = useAppDispatch();
  const [openPanel, setOpenPanel] = useState<boolean>(false);
  const [instrument, setInstrument] = useState<InsRTData>(initInstrument);
  const [trades, setTrades] = useState<TradeRTData[]>([]);
  const [socket, setSocket] = useState<io.Socket | null>(null);
  const prevSymbol = usePreviousValue(ticker?.symbol);

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

  useEffect(() => {
    !!stocks.length && initTicker();
  }, [stocks]);

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
    const s = searchParams?.get("s");
    const lastSymbol = localStorage.getItem(lastSymLocalKey);
    const defaultSymbol = process.env.NEXT_PUBLIC_DEFAULT_SYMBOL;
    const symbol = s || lastSymbol || defaultSymbol || "HCM";
    const availTicker = stocks.find((s) => s.symbol === symbol.toUpperCase());
    if (availTicker) {
      dispatch(setTicker(availTicker));
      dispatch(
        setTicket({
          ...ticket,
          symbol: availTicker.symbol,
          price: availTicker.reference,
        })
      );
      setLastSymbolToLocalStorage(symbol);
    }
  };
  return (
    <Wrapper>
      <SearchInput setOpenPanel={setOpenPanel} />
      <SearchPanel open={openPanel} setOpenPanel={setOpenPanel} />
      <Ticker instrument={instrument} trades={trades} ticker={ticker} />
    </Wrapper>
  );
};
export default Market;
