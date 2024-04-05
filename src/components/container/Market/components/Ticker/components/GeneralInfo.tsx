import { InsRTData, Stock } from "@/src/constraints/interface/market";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { RowContent, SplashText } from "@src/styles/common";
import { genPriceColor } from "@src/utils/helpers";

const Wrapper = styled("div")(() => ({}));
type Props = {
  instrument: InsRTData;
  ticker: Stock | null;
};
const GeneralInfo = ({ instrument, ticker }: Props) => {
  return (
    <Wrapper>
      <RowContent>
        <Typography variant="h4" fontWeight={600}>
          {ticker?.symbol}
        </Typography>
        <SplashText key={instrument.CP}>
          <Typography
            variant="h4"
            fontWeight={600}
            color={genPriceColor(
              ticker?.reference,
              instrument.CP,
              ticker?.ceiling,
              ticker?.floor
            )}
          >
            {(instrument.CP / 1000).toFixed(2)}
          </Typography>
        </SplashText>
      </RowContent>

      <RowContent>
        <Typography variant="subtitle1" noWrap>
          {instrument.FN}
        </Typography>
        <SplashText key={instrument.CH}>
          <Typography
            style={{ whiteSpace: "nowrap" }}
            variant="subtitle1"
            color={genPriceColor(
              ticker?.reference,
              instrument.CP,
              ticker?.ceiling,
              ticker?.floor
            )}
          >
            {`${(instrument.CH / 1000).toFixed(2)} /${instrument.CHP.toFixed(
              2
            )} %`}
          </Typography>
        </SplashText>
      </RowContent>
    </Wrapper>
  );
};
export default GeneralInfo;
