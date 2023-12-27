import { useState } from "react";
import { InputWrapper, TickerWrapper, Wrapper } from "./styles";
import { Button, Slide, TextField, Typography } from "@mui/material";
import { tickerOpts } from "@/src/constants/dumpData";
import { ITickerOpt } from "@/src/interface/common";
interface IProps {
  searchText: string;
  open: boolean;
  handleSelectTicker: (val: ITickerOpt) => void;
}
const SearchPanel = ({ open, handleSelectTicker, searchText }: IProps) => {
  return (
    <Slide direction="left" in={open} mountOnEnter unmountOnExit>
      <Wrapper>
        {tickerOpts
          .filter((x) => x.value.includes(searchText))
          .map((x) => (
            <TickerWrapper key={x.value} onClick={() => handleSelectTicker(x)}>
              <Typography>{x.value}</Typography>
              <Typography>{x.title}</Typography>
            </TickerWrapper>
          ))}
        {tickerOpts
          .filter((x) => x.value.includes(searchText))
          .map((x) => (
            <TickerWrapper key={x.value} onClick={() => handleSelectTicker(x)}>
              <Typography>{x.value}</Typography>
              <Typography>{x.title}</Typography>
            </TickerWrapper>
          ))}
      </Wrapper>
    </Slide>
  );
};

export default SearchPanel;
