import { styled } from "@mui/system";
import GeneralInfo from "./components/GeneralInfo";
import MarketValue from "./components/MarketValue";
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
      <GeneralInfo />
      <Line />
      <PriceInfo />
      <Line />
      <MarketValue />
    </Wrapper>
  );
};
export default Ticker;
