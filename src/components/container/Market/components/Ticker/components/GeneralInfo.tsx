import { InsRTData, Stock } from "@/src/constraints/interface/market";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { RowContent } from "@src/styles/common";
import { genPriceColor, genTextWithPrefix } from "@src/utils/helpers";

const Wrapper = styled("div")(() => ({}));
type Props = {
  instrument: InsRTData;
};
const GeneralInfo = ({ instrument }: Props) => {
  return (
    <Wrapper>
      <RowContent>
        <Typography variant="h4" fontWeight={600}>
          {instrument.SB}
        </Typography>
        <Typography
          variant="h4"
          fontWeight={600}
          color={genPriceColor(
            instrument.RE,
            instrument.CP,
            instrument.CL,
            instrument.FL
          )}
        >
          {instrument.CP}
        </Typography>
      </RowContent>

      <RowContent>
        <Typography variant="subtitle1" noWrap>
          {instrument.FN}
        </Typography>
        <Typography
          style={{ whiteSpace: "nowrap" }}
          variant="subtitle1"
          color={genPriceColor(
            instrument.RE,
            instrument.CP,
            instrument.CL,
            instrument.FL
          )}
        >
          {`${genTextWithPrefix(instrument.CH)} / ${genTextWithPrefix(
            instrument.CHP
          )}%`}
        </Typography>
      </RowContent>
    </Wrapper>
  );
};
export default GeneralInfo;
