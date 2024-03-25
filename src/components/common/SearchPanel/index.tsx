"use client";
import { useState } from "react";
import { TickerWrapper, Wrapper } from "./styles";
import { Backdrop, Slide, Typography } from "@mui/material";
import SearchInput from "./components/SearchInput";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { setTicker, setTicket } from "@src/redux/features/marketSlice";
import { setLastSymbolToLocalStorage } from "@src/utils/helpers";
import { Stock } from "@/src/constraints/interface/market";
import { List, AutoSizer } from "react-virtualized";

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
          <AutoSizer>
            {({ height, width }) => {
              return (
                <List
                  width={width}
                  height={height - 42}
                  rowCount={
                    stocks.filter((x) => x.symbol.includes(searchText)).length
                  }
                  rowHeight={46}
                  rowRenderer={({ key, index, style }) => {
                    const stock = stocks.filter((x) =>
                      x.symbol.includes(searchText)
                    )[index];
                    return (
                      <TickerWrapper
                        key={key}
                        style={style}
                        onClick={() => handleClickTicker(stock)}
                      >
                        <Typography fontWeight={600}>{stock.symbol}</Typography>
                        <Typography variant="subtitle2" fontWeight={400}>
                          {stock.FullName}
                        </Typography>
                      </TickerWrapper>
                    );
                  }}
                />
              );
            }}
          </AutoSizer>
          {/* <Tickers>
            {stocks
              .filter((x) => x.symbol.includes(searchText))
              .map((x) => (
                <TickerWrapper
                  key={x.symbol}
                  onClick={() => handleClickTicker(x)}
                >
                  <Typography fontWeight={600}  >
                    {x.symbol}
                  </Typography>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {x.FullName}
                  </Typography>
                </TickerWrapper>
              ))}
          </Tickers> */}
        </Wrapper>
      </Slide>
    </Backdrop>
  );
};

export default SearchPanel;
