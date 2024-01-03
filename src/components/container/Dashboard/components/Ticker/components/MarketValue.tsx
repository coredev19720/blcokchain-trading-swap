import FieldLabel from "@/src/components/common/FieldLabel";
import { ITickerData } from "@/src/interface/common";
import { ColContent } from "@/src/styles/common";
import { formatBigNumber, formatNumber } from "@/src/utils/helpers";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { format } from "path";
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
          {formatBigNumber(ticker.marketValue)}
        </Typography>
      </ColContent>
      <ColContent>
        <FieldLabel>Khối lượng</FieldLabel>
        <Typography fontWeight={500} variant="body2">
          {formatBigNumber(ticker.vol)}
        </Typography>
      </ColContent>
      <ColContent>
        <FieldLabel>KLNN Mua</FieldLabel>
        <Typography fontWeight={500} variant="body2">
          {formatBigNumber(ticker.klnnBuy)}
        </Typography>
      </ColContent>
      <ColContent>
        <FieldLabel>KLNN Bán</FieldLabel>
        <Typography fontWeight={500} variant="body2">
          {formatBigNumber(ticker.klnnSell)}
        </Typography>
      </ColContent>
    </Wrapper>
  );
};
export default MarketValue;
