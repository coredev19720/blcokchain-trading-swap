import React from "react";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import colors from "@/src/themes/colors";

const Label = styled(Typography)(() => ({
  color: colors.mn70,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));
const Wrapper = styled("div")({ display: "flex" });
const Dot = styled(Typography)({
  marginLeft: 4,
  color: colors.sr50,
});

const FieldLabel = ({ children, required, variant }: any) => {
  return (
    <Wrapper>
      <Label variant={variant || "subtitle2"}>{children}</Label>
      {required && <Dot>*</Dot>}
    </Wrapper>
  );
};
export default FieldLabel;
