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

const Market = () => {
  const searchParams = useSearchParams();
  const { ticker, ticket, stocks } = useAppSelector((state) => state.market);
  const dispatch = useAppDispatch();
  const [openPanel, setOpenPanel] = useState<boolean>(false);
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
