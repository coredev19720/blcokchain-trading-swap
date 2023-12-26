"use client";
import { Wrapper } from "./styles";
import SearchInput from "./components/SearchInput";
import { useState } from "react";
import { ITickerOpt } from "@/src/interface/common";
const Dashboard = () => {
  const [selectedTicker, setSelectedTicker] = useState<string>("");
  console.log(selectedTicker);
  const handleChangeTicker = (val: ITickerOpt) => {
    setSelectedTicker(val.value);
  };
  return (
    <Wrapper>
      <SearchInput handleSelectTicker={handleChangeTicker} />
    </Wrapper>
  );
};
export default Dashboard;
