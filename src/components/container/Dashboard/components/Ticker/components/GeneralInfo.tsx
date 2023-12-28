import { ITickerData } from "@/src/interface/common";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { RowContent } from "@/src/styles/common";
import { genTextColor, genTextWithPrefix } from "@/src/utils/helpers";

const Wrapper = styled("div")(() => ({}));
interface IProps {
  ticker: ITickerData;
}
const GeneralInfo = ({ ticker }: IProps) => {
  return (
    <Wrapper>
      <RowContent>
        <Typography variant="h4" color="text.primary" fontWeight={600}>
          {ticker.ticker}
        </Typography>
        <Typography
          variant="h4"
          fontWeight={600}
          color={genTextColor(
            ticker.ref,
            ticker.price,
            ticker.ceil,
            ticker.floor
          )}
        >
          {ticker.price}
        </Typography>
      </RowContent>

      <RowContent>
        <Typography variant="subtitle1" noWrap>
          {ticker.companyName}
        </Typography>
        <Typography
          style={{ whiteSpace: "nowrap" }}
          variant="subtitle1"
          color={genTextColor(
            ticker.ref,
            ticker.price,
            ticker.ceil,
            ticker.floor
          )}
        >
          {`${genTextWithPrefix(ticker.chg)} / ${genTextWithPrefix(
            ticker.pctChg
          )}%`}
        </Typography>
      </RowContent>
    </Wrapper>
  );
};
export default GeneralInfo;
