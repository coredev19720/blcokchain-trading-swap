"use client";
import { Wrapper } from "./styles";
import SearchInput from "./components/SearchInput";
import { useState } from "react";
import Ticker from "./components/Ticker";
import { useAppSelector } from "@src/redux/hooks";
import SearchPanel from "../../common/SearchPanel";
import { TradeRTData } from "@/src/constraints/interface/market";

const Market = () => {
  const { inst } = useAppSelector((state) => state.market);
  const [openPanel, setOpenPanel] = useState<boolean>(false);
  const [trades, setTrades] = useState<TradeRTData[]>([]);

  return (
    <Wrapper>
      <SearchInput setOpenPanel={setOpenPanel} />
      <SearchPanel open={openPanel} setOpenPanel={setOpenPanel} />
      <Ticker inst={inst} trades={trades} />
    </Wrapper>
  );
};
export default Market;
