"use client";
import { Wrapper } from "./styles";
import SearchInput from "./components/SearchInput";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { validTicker } from "@/src/utils/helpers";
import { tickers } from "@/src/constants/dumpData/dashboard";
import Ticker from "./components/Ticker";
import EmptyState from "./components/EmptyState";
import { useAppSelector, useAppDispatch } from "@/src/redux/hooks";
import { setTicker } from "@/src/redux/features/marketSlice";
import SearchPanel from "../../common/SearchPanel";
const Market = () => {
  const searchParams = useSearchParams();
  const ticker = useAppSelector((state) => state.market.ticker);
  const dispatch = useAppDispatch();
  const [openPanel, setOpenPanel] = useState<boolean>(false);
  useEffect(() => {
    if (!ticker) {
      const s = searchParams?.get("s");
      if (s && validTicker(s.toUpperCase())) {
        const availTicker = tickers.find((t) => t.ticker === s.toUpperCase());
        if (availTicker) {
          dispatch(setTicker(availTicker));
        }
      }
      const lastSymbol = localStorage.getItem(
        process.env.NEXT_PUBLIC_LAST_SYM_KEY
          ? process.env.NEXT_PUBLIC_LAST_SYM_KEY
          : "lastSymbol"
      );
      if (lastSymbol && JSON.parse(lastSymbol)) {
        const availTicker = tickers.find(
          (t) => t.ticker === JSON.parse(lastSymbol)
        );
        if (availTicker) {
          dispatch(setTicker(availTicker));
        }
      }
    }
  }, []);
  return (
    <Wrapper>
      <SearchInput setOpenPanel={setOpenPanel} />
      <SearchPanel open={openPanel} setOpenPanel={setOpenPanel} />
      {ticker ? <Ticker ticker={ticker} /> : <EmptyState />}
    </Wrapper>
  );
};
export default Market;
