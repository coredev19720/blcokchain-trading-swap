import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import colors from "@src/themes/colors";
import { Variant } from "@mui/material/styles/createTypography";
interface Props {
  children: React.ReactNode;
  required?: boolean;
  variant?: Variant;
  noEllipsis?: boolean;
}
const Label = styled(Typography)<Props>(({ noEllipsis }) => ({
  color: colors.mn70,
  whiteSpace: !noEllipsis ? "normal" : "nowrap",
  overflow: !noEllipsis ? "normal" : "hidden",
  textOverflow: !noEllipsis ? "normal" : "ellipsis",
  fontWeight: 400,
}));
const Wrapper = styled("div")({ display: "flex" });
const Dot = styled(Typography)({
  marginLeft: 4,
  color: colors.sr50,
});

const FieldLabel = ({ children, required, variant, noEllipsis }: Props) => {
  return (
    <Wrapper>
      <Label variant={variant || "subtitle2"} noEllipsis={noEllipsis}>
        {children}
      </Label>
      {required && <Dot>*</Dot>}
    </Wrapper>
  );
};
export default FieldLabel;
