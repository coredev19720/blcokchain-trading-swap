"use client";
import { useState } from "react";
import { TickerWrapper, Wrapper, Tickers } from "./styles";
import { Backdrop, Slide, Typography } from "@mui/material";
import SearchInput from "./components/SearchInput";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { setTicker, setTicket } from "@src/redux/features/marketSlice";
import { setLastSymbolToLocalStorage } from "@src/utils/helpers";
import { Stock } from "@/src/constraints/interface/market";

interface IProps {
  open: boolean;
  setOpenPanel: (val: boolean) => void;
}
const SearchPanel = ({ open, setOpenPanel }: IProps) => {
  const { ticket, stocks } = useAppSelector((state) => state.market);
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState<string>("");

  const handleClickTicker = (val: Stock) => {
    setLastSymbolToLocalStorage(val.symbol);
    dispatch(setTicker(val));
    dispatch(
      setTicket({
        ...ticket,
        symbol: val.symbol,
        price: val.reference,
      })
    );
    setOpenPanel(false);
  };

  return (
    <Backdrop open={open}>
      <Slide direction="left" in={open} mountOnEnter unmountOnExit>
        <Wrapper>
          <SearchInput
            searchText={searchText}
            setOpenPanel={setOpenPanel}
            openPanel={open}
            setSearchText={setSearchText}
          />
          <Tickers>
            {stocks
              .filter((x) => x.symbol.includes(searchText))
              .map((x) => (
                <TickerWrapper
                  key={x.symbol}
                  onClick={() => handleClickTicker(x)}
                >
                  <Typography fontWeight={600} color="text.primary">
                    {x.symbol}
                  </Typography>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {x.FullName}
                  </Typography>
                </TickerWrapper>
              ))}
          </Tickers>
        </Wrapper>
      </Slide>
    </Backdrop>
  );
};

export default SearchPanel;
