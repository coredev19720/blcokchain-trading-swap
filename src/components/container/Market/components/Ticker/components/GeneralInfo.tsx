import { Stock } from "@/src/constraints/interface/services/response";
import { ITickerData } from "@interface/common";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { RowContent } from "@src/styles/common";
import { genPriceColor, genTextWithPrefix } from "@src/utils/helpers";

const Wrapper = styled("div")(() => ({}));
type Props = {
  ticker: Stock;
};
const GeneralInfo = ({ ticker }: Props) => {
  return (
    <Wrapper>
      <RowContent>
        <Typography variant="h4" color="text.primary" fontWeight={600}>
          {ticker.symbol}
        </Typography>
        <Typography
          variant="h4"
          fontWeight={600}
          color={genPriceColor(
            ticker.reference,
            ticker.price,
            ticker.ceiling,
            ticker.floor
          )}
        >
          {ticker.price}
        </Typography>
      </RowContent>

      <RowContent>
        <Typography variant="subtitle1" noWrap>
          {ticker.FullName}
        </Typography>
        <Typography
          style={{ whiteSpace: "nowrap" }}
          variant="subtitle1"
          color={genPriceColor(
            ticker.reference,
            ticker.price,
            ticker.ceiling,
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
