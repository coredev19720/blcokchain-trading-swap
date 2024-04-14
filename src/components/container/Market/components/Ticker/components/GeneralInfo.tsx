import SplashText from "@/src/components/common/SplashText";
import { InsRTData, Stock } from "@/src/constraints/interface/market";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { RowContent } from "@src/styles/common";
import { genTrend } from "@src/utils/helpers";

const Wrapper = styled("div")(() => ({}));
type Props = {
  inst: InsRTData | null;
};

const GeneralInfo = ({ inst }: Props) => {
  return (
    <Wrapper>
      <RowContent>
        <Typography variant="h4" fontWeight={600}>
          {inst?.SB}
        </Typography>
        <SplashText
          val={inst?.CP}
          trend={genTrend(inst?.RE, inst?.CP, inst?.CL, inst?.FL)}
        >
          <Typography variant="h4" fontWeight={600} color="inherit">
            {inst?.CP ? (inst?.CP / 1000).toFixed(2) : "-"}
          </Typography>
        </SplashText>
      </RowContent>

      <RowContent>
        <Typography variant="subtitle1" noWrap>
          {inst?.FN}
        </Typography>
        <SplashText
          val={inst?.CH}
          trend={genTrend(inst?.RE, inst?.CP, inst?.CL, inst?.FL)}
        >
          <Typography
            style={{ whiteSpace: "nowrap" }}
            variant="subtitle1"
            color="inherit"
          >
            {inst
              ? `${(inst?.CH / 1000).toFixed(2)} /${inst?.CHP?.toFixed(2)} %`
              : "-/-"}
          </Typography>
        </SplashText>
      </RowContent>
    </Wrapper>
  );
};
export default GeneralInfo;
