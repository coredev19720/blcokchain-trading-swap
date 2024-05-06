import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import colors from "@src/themes/colors";
import { Variant } from "@mui/material/styles/createTypography";
interface Props {
  children: React.ReactNode;
  required?: boolean;
  variant?: Variant;
  noellipsis?: boolean;
}
const Label = styled(Typography)<Props>(({ theme, noellipsis }) => ({
  color: theme.palette.text.secondary,
  whiteSpace: !noellipsis ? "normal" : "nowrap",
  overflow: !noellipsis ? "normal" : "hidden",
  textOverflow: !noellipsis ? "normal" : "ellipsis",
  fontWeight: 400,
}));
const Wrapper = styled("div")({ display: "flex" });
const Dot = styled(Typography)({
  marginLeft: 4,
  color: colors.sr50,
});

const FieldLabel = ({ children, required, variant, noellipsis }: Props) => {
  return (
    <Wrapper>
      <Label variant={variant ?? "subtitle2"} noellipsis={noellipsis}>
        {children}
      </Label>
      {required && <Dot>*</Dot>}
    </Wrapper>
  );
};
export default FieldLabel;
