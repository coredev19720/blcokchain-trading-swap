import { useState } from "react";
import { InputWrapper, TickerWrapper, Wrapper } from "./styles";
import { Backdrop, Button, Slide, TextField, Typography } from "@mui/material";
import { tickerOpts } from "@/src/constants/dumpData";
import { ITickerData, ITickerOpt } from "@/src/interface/common";
import { tickers } from "@/src/constants/dumpData/dashboard";
interface IProps {
  searchText: string;
  open: boolean;
  setTicker: (val: ITickerData) => void;
  setOpenPanel: (val: boolean) => void;
}
const SearchPanel = ({ open, setTicker, searchText, setOpenPanel }: IProps) => {
  const handleClickTicker = (val: ITickerOpt) => {
    const ticker = tickers.find((t) => t.ticker === val.value);
    if (ticker) {
      setTicker(ticker);
    }
    setOpenPanel(false);
  };
  return (
    <Backdrop open={open}>
      <Slide direction="left" in={open} mountOnEnter unmountOnExit>
        <Wrapper>
          {tickerOpts
            .filter((x) => x.value.includes(searchText))
            .map((x) => (
              <TickerWrapper key={x.value} onClick={() => handleClickTicker(x)}>
                <Typography>{x.value}</Typography>
                <Typography>{x.title}</Typography>
              </TickerWrapper>
            ))}
          {/* fix me, remove this duplicate code */}
          {tickerOpts
            .filter((x) => x.value.includes(searchText))
            .map((x) => (
              <TickerWrapper key={x.value} onClick={() => handleClickTicker(x)}>
                <Typography>{x.value}</Typography>
                <Typography>{x.title}</Typography>
              </TickerWrapper>
            ))}
          {/* fix me, remove this duplicate code */}
        </Wrapper>
      </Slide>
    </Backdrop>
  );
};

export default SearchPanel;
