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
const Market = () => {
  const searchParams = useSearchParams();
  const { ticker, ticket, stocks } = useAppSelector((state) => state.market);
  const dispatch = useAppDispatch();
  const [openPanel, setOpenPanel] = useState<boolean>(false);
  const [socket, setSocket] = useState<io.Socket | null>(null);
  useEffect(() => {
    console.log("socketCfg", socketCfg);
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
    skt.on("t", (data: any) => {
      symbolEvent(data);
    });
    return () => {
      if (skt) {
        skt.disconnect();
      }
    };
  }, []);
  useEffect(() => {
    if (ticker) {
      symbolSub(socket, ticker.symbol);
    }
  }, [ticker?.symbol]);

  useEffect(() => {
    !!stocks.length && initTicker();
  }, [stocks]);

  const connect = () => {
    console.log("Connected to the server");
  };

  const symbolSub = (socket: io.Socket, symbol: string) => {
    console.log("Subscribing to symbol", symbol);
    socket.emit("get", {
      data: { args: [`t:${symbol}`], op: "subscribe" },
      method: "get",
      url: socketCfg.subscribePath,
    });
  };

  const symbolUnsub = (socket: io.Socket, symbol: string) => {
    socket.emit("get", {
      data: { args: [`t:${symbol}`], op: "unsubscribe" },
      method: "get",
      url: socketCfg.subscribePath,
    });
  };

  const symbolEvent = (data: any) => {
    console.log(data);
  };

  const initTicker = () => {
    const s = searchParams?.get("s");
    const lastSymbol = localStorage.getItem(lastSymLocalKey);
    const defaultSymbol = process.env.NEXT_PUBLIC_DEFAULT_SYMBOL;
    const symbol = s || lastSymbol || defaultSymbol || "HCM";
    const availTicker = stocks.find((s) => s.symbol === symbol.toUpperCase());
    if (!ticker && availTicker) {
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
      {ticker ? <Ticker ticker={ticker} /> : <EmptyState />}
    </Wrapper>
  );
};
export default Market;
