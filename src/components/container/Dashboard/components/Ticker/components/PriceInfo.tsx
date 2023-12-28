import FieldLabel from "@/src/components/common/FieldLabel";
import Line from "@/src/components/common/Line";
import { ITickerData } from "@/src/interface/common";
import { RowContent } from "@/src/styles/common";
import colors from "@/src/themes/colors";
import { genTextColor } from "@/src/utils/helpers";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
const Wrapper = styled("div")(() => ({
  display: "flex",
  gap: 8,
}));
const ContentBlock = styled("div")(() => ({
  flex: 1,
  gap: 8,
  display: "flex",
  flexDirection: "column",
}));
interface IProps {
  ticker: ITickerData;
}
const PriceInfo = ({ ticker }: IProps) => {
  return (
    <Wrapper>
      <ContentBlock>
        <RowContent>
          <FieldLabel>Mở cửa</FieldLabel>
          <Typography
            fontWeight={500}
            variant="body2"
            color={genTextColor(
              ticker.ref,
              ticker.open,
              ticker.ceil,
              ticker.floor
            )}
          >
            {ticker.open}
          </Typography>
        </RowContent>
        <RowContent>
          <FieldLabel>Cao nhất</FieldLabel>
          <Typography
            fontWeight={500}
            variant="body2"
            color={genTextColor(
              ticker.ref,
              ticker.high,
              ticker.ceil,
              ticker.floor
            )}
          >
            {ticker.high}
          </Typography>
        </RowContent>
        <RowContent>
          <FieldLabel>Thấp nhất</FieldLabel>
          <Typography
            fontWeight={500}
            variant="body2"
            color={genTextColor(
              ticker.ref,
              ticker.low,
              ticker.ceil,
              ticker.floor
            )}
          >
            {ticker.low}
          </Typography>
        </RowContent>
      </ContentBlock>
      <Line vertical />
      <ContentBlock>
        <RowContent>
          <FieldLabel>Tham chiếu</FieldLabel>
          <Typography
            fontWeight={500}
            color={colors.lightRefText}
            variant="body2"
          >
            {ticker.ref}
          </Typography>
        </RowContent>
        <RowContent>
          <FieldLabel>Trần</FieldLabel>
          <Typography
            fontWeight={500}
            color={colors.lightCeilText}
            variant="body2"
          >
            {ticker.ceil}
          </Typography>
        </RowContent>
        <RowContent>
          <FieldLabel>Sàn</FieldLabel>
          <Typography
            fontWeight={500}
            color={colors.lightFloorText}
            variant="body2"
          >
            {ticker.floor}
          </Typography>
        </RowContent>
      </ContentBlock>
    </Wrapper>
  );
};
export default PriceInfo;
