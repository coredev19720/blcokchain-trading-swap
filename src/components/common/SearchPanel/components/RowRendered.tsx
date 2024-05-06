import { Stock } from "@/src/constraints/interface/market";
import { Typography } from "@mui/material";
import { TickerWrapper } from "../styles";
interface IProps {
  key: string;
  index: number;
  handleClickTicker: (val: Stock) => void;
  searchText: string;
  stocks: Stock[];
}

const RowRendered = ({
  key,
  index,
  handleClickTicker,
  searchText,
  stocks,
}: IProps) => {
  const stock = stocks.filter((x) => x.symbol.includes(searchText))[index];
  return (
    <TickerWrapper key={key} onClick={() => handleClickTicker(stock)}>
      <Typography fontWeight={600}>{stock.symbol}</Typography>
      <Typography variant="subtitle2" fontWeight={400}>
        {stock.FullName}
      </Typography>
    </TickerWrapper>
  );
};

export default RowRendered;
