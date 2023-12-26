import { useState } from "react";
import { InputWrapper, TickerWrapper, Wrapper } from "./styles";
import { Button, Slide, TextField, Typography } from "@mui/material";
import { tickerOpts } from "@/src/constants/dumpData";
import { ITickerOpt } from "@/src/interface/common";
interface IProps {
  open: boolean;
  handleClose: (val: boolean) => void;
  handleSelectTicker: (val: ITickerOpt) => void;
}
const SearchPanel = ({ open, handleClose, handleSelectTicker }: IProps) => {
  const [searchText, setSearchText] = useState<string>("");
  const handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    let txt = e.target.value;
    if (txt.length > 20) {
      txt = txt.substring(0, 20);
    }
    setSearchText(txt);
  };
  const handleClickTicker = (val: ITickerOpt) => {
    handleSelectTicker(val);
    handleClose(false);
  };
  return (
    <Slide direction="left" in={open} mountOnEnter unmountOnExit>
      <Wrapper>
        <InputWrapper>
          <TextField
            value={searchText}
            onChange={handleChangeSearchText}
            fullWidth
          />
          <Button onClick={() => handleClose(false)}>Close</Button>
        </InputWrapper>
        {tickerOpts
          .filter((x) => x.value.includes(searchText))
          .map((x) => (
            <TickerWrapper key={x.value} onClick={() => handleClickTicker(x)}>
              <Typography>{x.value}</Typography>
              <Typography>{x.title}</Typography>
            </TickerWrapper>
          ))}
      </Wrapper>
    </Slide>
  );
};

export default SearchPanel;
