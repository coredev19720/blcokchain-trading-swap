"use client";
import { Wrapper } from "./styles";
import SearchInput from "./components/SearchInput";
import { useEffect, useState } from "react";
import Ticker from "./components/Ticker";
import { useAppSelector } from "@src/redux/hooks";
import SearchPanel from "../../common/SearchPanel";

const Market = () => {
  const { inst, hisTrades, ports, selectedStock } = useAppSelector(
    (state) => state.market
  );
  const [openPanel, setOpenPanel] = useState<boolean>(false);
  useEffect(() => {
    if (ports && !selectedStock) {
      setOpenPanel(true);
    }
  }, [ports, selectedStock]);
  return (
    <Wrapper>
      <SearchInput setOpenPanel={setOpenPanel} />
      <SearchPanel open={openPanel} setOpenPanel={setOpenPanel} />
      <Ticker inst={inst} trades={hisTrades} />
    </Wrapper>
  );
};
export default Market;
