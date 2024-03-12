import { styled } from "@mui/system";
import GeneralInfo from "./components/GeneralInfo";
import MarketDepth from "./components/MarketDepth";
import MarketValue from "./components/MarketValue";
import PriceInfo from "./components/PriceInfo";
import Line from "@components/common/Line";
import { ITickerData } from "@interface/common";
import MarketIndex from "./components/MarketIndex";
import Actions from "./components/Actions";
import { Stock } from "@/src/constraints/interface/market";

const Wrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  overflow: "auto",
  flex: 1,
}));
const InforSection = styled("div")(({ theme }) => ({
  flex: 1,
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: theme.spacing(0, 4),
}));
type Props = {
  ticker: Stock;
};
const Ticker = ({ ticker }: Props) => {
  return (
    <Wrapper>
      <InforSection>
        <GeneralInfo ticker={ticker} />
        <Line />
        <PriceInfo ticker={ticker} />
        <Line />
        <MarketValue ticker={ticker} />
        <Line />
        <MarketDepth ticker={ticker} />
        <MarketIndex />
      </InforSection>
      <Actions />
    </Wrapper>
  );
};
export default Ticker;
