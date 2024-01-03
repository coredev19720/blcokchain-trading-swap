import { TickerWrapper, Wrapper, Tickers } from "./styles";
import { Backdrop, Slide, Typography } from "@mui/material";
import { tickerOpts } from "@/src/constants/dumpData";
import { ITickerData, ITickerOpt } from "@/src/interface/common";
import { tickers } from "@/src/constants/dumpData/dashboard";
import SearchInput from "./components/SearchInput";
import { useState } from "react";
interface IProps {
  open: boolean;
  setTicker: (val: ITickerData) => void;
  setOpenPanel: (val: boolean) => void;
}
const SearchPanel = ({ open, setTicker, setOpenPanel }: IProps) => {
  const [searchText, setSearchText] = useState<string>("");
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
            {/* fix me, remove this duplicate code */}
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
            {/* fix me, remove this duplicate code */}
          </Tickers>
        </Wrapper>
      </Slide>
    </Backdrop>
  );
};

export default SearchPanel;
