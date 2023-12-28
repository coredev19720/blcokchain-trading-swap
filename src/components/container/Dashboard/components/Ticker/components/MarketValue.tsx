import FieldLabel from "@/src/components/common/FieldLabel";
import { ITickerData } from "@/src/interface/common";
import { ColContent } from "@/src/styles/common";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
const Wrapper = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-around",
}));

interface IProps {
  ticker: ITickerData;
}
const MarketValue = ({ ticker }: IProps) => {
  return (
    <Wrapper>
      <ColContent>
        <FieldLabel>Giá trị GD</FieldLabel>
        <Typography fontWeight={500} variant="body2">
          {/* {ticker} */}
        </Typography>
      </ColContent>
    </Wrapper>
  );
};
export default MarketValue;
