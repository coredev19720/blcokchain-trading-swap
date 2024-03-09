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
    initTicker();
  }, []);

  const initTicker = () => {
    const s = searchParams?.get("s");
    const availTicker = s && stocks.find((t) => t.symbol === s.toUpperCase());
    if (availTicker) {
      setLastSymbolToLocalStorage(availTicker.symbol);
      dispatch(setTicker(availTicker));
      dispatch(
        setTicket({
          ...ticket,
          symbol: availTicker.symbol,
          price: availTicker.reference,
        })
      );
      return;
    }
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
          })
        );
      }
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
