import { ITickerData } from "@/src/interface/common";
import { styled } from "@mui/system";
const Wrapper = styled("div")(() => ({}));
interface IProps {
  ticker: ITickerData;
}
const MarketDepth = ({ ticker }: IProps) => {
  return <Wrapper> MarketDepth</Wrapper>;
};
export default MarketDepth;
