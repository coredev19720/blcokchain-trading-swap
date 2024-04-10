"use client";
import { useEffect, useState } from "react";
import { TickerWrapper, Wrapper } from "./styles";
import { Backdrop, Slide, Typography } from "@mui/material";
import SearchInput from "./components/SearchInput";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { setSelectedStock, setTicket } from "@src/redux/features/marketSlice";
import { setLastSymbolToLocalStorage } from "@src/utils/helpers";
import { Stock } from "@/src/constraints/interface/market";
import { List, AutoSizer } from "react-virtualized";

interface IProps {
  open: boolean;
  setOpenPanel: (val: boolean) => void;
}
const SearchPanel = ({ open, setOpenPanel }: IProps) => {
  const { ticket, stocks, selectedStock } = useAppSelector(
    (state) => state.market
  );
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    dispatch(
      setTicket({
        ...ticket,
        symbol: selectedStock?.symbol || "",
        price: "0",
      })
    );
    setOpenPanel(false);
  }, [selectedStock]);

  const handleClickTicker = (val: Stock) => {
    dispatch(setSelectedStock(val));
    setLastSymbolToLocalStorage(val.symbol);
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
        </Wrapper>
      </Slide>
    </Backdrop>
  );
};

export default SearchPanel;
