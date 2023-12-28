import { styled } from "@mui/system";
import GeneralInfo from "./components/GeneralInfo";
import MarketDepth from "./components/MarketDepth";
import PriceInfo from "./components/PriceInfo";
import Line from "@/src/components/common/Line";
import { ITickerData } from "@/src/interface/common";
const Wrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 8,
}));
interface IProps {
  ticker: ITickerData;
}
const Ticker = ({ ticker }: IProps) => {
  return (
    <Wrapper>
      <GeneralInfo ticker={ticker} />
      <Line />
      <PriceInfo ticker={ticker} />
      <Line />
      <MarketDepth ticker={ticker} />
    </Wrapper>
  );
};
export default Ticker;
