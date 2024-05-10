"use client";
import { Wrapper } from "./styles";
import SearchInput from "./components/SearchInput";
import { useEffect, useState } from "react";
import Ticker from "./components/Ticker";
import { useAppSelector, useAppDispatch } from "@src/redux/hooks";
import SearchPanel from "../../common/SearchPanel";
import { setSelectedStock } from "@/src/redux/features/marketSlice";
import {
  setLastSymbolToLocalStorage,
  lastSymLocalKey,
} from "@src/utils/helpers";
import { useSearchParams } from "next/navigation";
const Market = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const { inst, hisTrades, ports, selectedStock, stocks } = useAppSelector(
    (state) => state.market
  );
  const { activeAccount } = useAppSelector((state) => state.user);
  const [openPanel, setOpenPanel] = useState<boolean>(false);
  useEffect(() => {
    if (ports && !selectedStock) {
      setOpenPanel(true);
    }
  }, [ports, selectedStock]);
  useEffect(() => {
    !!stocks.length && activeAccount && ports && initTicker();
  }, [stocks, activeAccount, ports]);

  const initTicker = () => {
    let s = searchParams?.get("s");
    let lastSym = null;
    let firstPortItem = null;
    if (!selectedStock.symbol) {
      lastSym = localStorage.getItem(lastSymLocalKey);
      firstPortItem = ports && ports.length > 0 ? ports[0].symbol : "";
    }
    if (s === selectedStock.symbol) {
      s = null;
    }
    const symbol = s ?? lastSym ?? firstPortItem;
    const stock = stocks.find((s) => s.symbol === symbol?.toUpperCase());
    if (stock) {
      dispatch(setSelectedStock(stock));
      setLastSymbolToLocalStorage(stock.symbol);
    }
  };
  return (
    <Wrapper>
      <SearchInput setOpenPanel={setOpenPanel} />
      <SearchPanel open={openPanel} setOpenPanel={setOpenPanel} />
      <Ticker inst={inst} trades={hisTrades} />
    </Wrapper>
  );
};
export default Market;
