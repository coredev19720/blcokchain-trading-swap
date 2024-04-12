"use client";

import { styled } from "@mui/system";
import { ReactNode, useState, useEffect, use } from "react";
import { PageWrapper, MainContent } from "@src/styles/common";
import { ToastContainer } from "react-toastify";
import Menu from "./Menu";
import { publicUrls } from "@src/constants/routes";
import { usePathname, useParams } from "next/navigation";
import { getInitColorSchemeScript } from "@mui/material/styles";
import { useColorScheme } from "@mui/material/styles";
import { socketCfg } from "@/src/constants/config";
//@ts-ignore
import io from "socket.io-client";
import { useAppSelector } from "@/src/redux/hooks";
import { useAppDispatch } from "@/src/redux/hooks";
import {
  setInstrument,
  setSelectedStock,
} from "@/src/redux/features/marketSlice";
import { usePreviousValue } from "@/src/hooks/usePrevious";
import { useGetInstrument } from "@/src/services/hooks/useGetInstrument";
import { stockMappingRTData } from "@/src/utils/market";
import { TradeRTData } from "@/src/constraints/interface/market";
import {
  setLastSymbolToLocalStorage,
  lastSymLocalKey,
} from "@src/utils/helpers";
import { useSearchParams } from "next/navigation";
const Wrapper = styled("main")(({ theme }) => {
  return {
    height: "100%",
    width: "100%",
    overflow: "hidden",
    background: theme.palette.common.background,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
});

export default function Layout({ children }: { children: ReactNode }) {
  const { inst, selectedStock, stocks } = useAppSelector(
    (state) => state.market
  );
  const { data: stockData } = useGetInstrument(selectedStock?.symbol || "");
  const searchParams = useSearchParams();

  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const params = useParams();
  let isPublic = publicUrls.some((x) => `/${params?.locale}/${x}` === pathname);
  const { mode } = useColorScheme();
  const [mounted, setMounted] = useState(false);
  const [socket, setSocket] = useState<io.Socket | null>(null);
  const [trades, setTrades] = useState<TradeRTData[]>([]);
  const prevSymbol = usePreviousValue(selectedStock?.symbol);
  useEffect(() => {
    setMounted(true);
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
    return () => {
      if (skt) {
        skt.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    !!stocks.length && initTicker();
  }, [stocks]);
  useEffect(() => {
    if (prevSymbol && socket) {
      symbolUnsub(socket, prevSymbol);
      setTrades([]);
    }
    if (selectedStock.symbol === stockData?.symbol && socket) {
      dispatch(setInstrument(stockMappingRTData(stockData)));
      symbolSub(socket, stockData.symbol);
    }
  }, [stockData?.symbol, socket]);

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
    dispatch(setInstrument({ ...inst, ...data }));
  };

  const handleTEvent = (data: TradeRTData) => {
    setTrades((prev) => [data, ...prev]);
  };
  const initTicker = () => {
    if (selectedStock.symbol) return;
    const s = searchParams?.get("s");
    const lastSymbol = localStorage.getItem(lastSymLocalKey);
    const defaultSymbol = process.env.NEXT_PUBLIC_DEFAULT_SYMBOL;
    const symbol = s || lastSymbol || defaultSymbol;
    const stock = stocks.find((s) => s.symbol === symbol?.toUpperCase());
    if (stock) {
      dispatch(setSelectedStock(stock));
      setLastSymbolToLocalStorage(stock.symbol);
    }
  };
  console.log("inst", inst);
  if (!mounted) return null;
  return (
    <Wrapper>
      {getInitColorSchemeScript()}
      <PageWrapper>
        <MainContent>{children}</MainContent>
        {!isPublic && <Menu />}
      </PageWrapper>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
        theme={mode === "dark" ? "dark" : "light"}
      />
    </Wrapper>
  );
}
