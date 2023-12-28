"use client";
import { Wrapper } from "./styles";
import SearchInput from "./components/SearchInput";
import { useEffect, useState } from "react";
import { ITickerData } from "@/src/interface/common";
import SearchPanel from "./components/SearchPanel";
import { useSearchParams } from "next/navigation";
import { validTicker } from "@/src/utils/helpers";
import { tickers } from "@/src/constants/dumpData/dashboard";
import Ticker from "./components/Ticker";
import EmptyState from "./components/EmptyState";
const Dashboard = () => {
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = useState<string>("");
  const [openPanel, setOpenPanel] = useState<boolean>(false);
  const [ticker, setTicker] = useState<ITickerData | null>(null);
  useEffect(() => {
    const s = searchParams?.get("s");
    if (s && validTicker(s.toUpperCase())) {
      const ticker = tickers.find((t) => t.ticker === s.toUpperCase());
      if (ticker) {
        setTicker(ticker);
      }
    }
  }, []);

  return (
    <Wrapper>
      <SearchInput
        openPanel={openPanel}
        searchText={searchText}
        setSearchText={setSearchText}
        setOpenPanel={setOpenPanel}
      />
      <SearchPanel
        searchText={searchText}
        open={openPanel}
        setTicker={setTicker}
        setOpenPanel={setOpenPanel}
      />
      {ticker ? <Ticker ticker={ticker} /> : <EmptyState />}
    </Wrapper>
  );
};
export default Dashboard;
