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
import io from "socket.io-client";

const Market = () => {
  const searchParams = useSearchParams();
  const { ticker, ticket, stocks } = useAppSelector((state) => state.market);
  const dispatch = useAppDispatch();
  const [openPanel, setOpenPanel] = useState<boolean>(false);
  useEffect(() => {
    let socket: io.Socket;
    const socketUrl = process.env.NEXT_PUBLIC_API_URL || "";
    socket = io(socketUrl, {
      transports: ["websocket"],
      path: "/realtime/socket.io",
      query: {
        __sails_io_sdk_version: "1.2.1",
        __sails_io_sdk_platform: "browser",
        __sails_io_sdk_language: "javascript",
      },
    });

    socket.on("connect", connect);
    socket.on("disconnect", () => console.log("Disconnected from the server"));
    socket.on("connection", (socket: io.Socket) => {
      socket.emit("get", {
        data: { args: ["t:HCM"], op: "subscribe" },
        method: "get",
        url: "/client/subscribe",
      });
    });
    socket.on("t", (data: any) => {
      console.log(data);
    });
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);
  const connect = () => {
    console.log("Connected to the server");
  };
  useEffect(() => {
    !!stocks.length && initTicker();
  }, [stocks]);

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
