import { TickerWrapper, Wrapper, Tickers } from "./styles";
import { Backdrop, Slide, Typography } from "@mui/material";
import { tickerOpts } from "@/src/constants/dumpData";
import { ITickerOpt } from "@/src/interface/common";
import { tickers } from "@/src/constants/dumpData/dashboard";
import SearchInput from "./components/SearchInput";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { setTicker, setTicket } from "@/src/redux/features/marketSlice";

interface IProps {
  open: boolean;
  setOpenPanel: (val: boolean) => void;
}
const SearchPanel = ({ open, setOpenPanel }: IProps) => {
  const ticket = useAppSelector((state) => state.market.ticket);
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState<string>("");

  const handleClickTicker = (val: ITickerOpt) => {
    const availTicker = tickers.find((t) => t.ticker === val.value);
    if (availTicker) {
      window.localStorage.setItem(
        process.env.NEXT_PUBLIC_LAST_SYM_KEY
          ? process.env.NEXT_PUBLIC_LAST_SYM_KEY
          : "lastSym",
        JSON.stringify(availTicker.ticker)
      );
      dispatch(setTicker(availTicker));
      dispatch(
        setTicket({
          ...ticket,
          ticker: availTicker.ticker,
          price: availTicker.ref,
        })
      );
    }
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
            {tickerOpts
              .filter((x) => x.value.includes(searchText))
              .map((x) => (
                <TickerWrapper
                  key={x.value}
                  onClick={() => handleClickTicker(x)}
                >
                  <Typography fontWeight={600} color="text.primary">
                    {x.value}
                  </Typography>
                  <Typography variant="subtitle2" fontWeight={400}>
                    {x.title}
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
