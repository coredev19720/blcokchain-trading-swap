import { ITickerData } from "@/src/interface/common";
import { styled } from "@mui/system";
const Wrapper = styled("div")(() => ({}));
interface IProps {
  ticker: ITickerData;
}
const MarketDepth = ({ ticker }: IProps) => {
  return (
    <Wrapper>
      <div>MarketDepth</div>
    </Wrapper>
  );
};
export default MarketDepth;
