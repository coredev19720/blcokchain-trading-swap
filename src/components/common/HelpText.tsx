import React, { ReactElement } from "react";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import colors from "@/src/themes/colors";
interface IProps {
  txt: string;
  icon?: ReactElement;
  stt?: "info" | "primary" | "secondary" | "warning" | "success" | "error";
  icoPos?: "left" | "right";
}
const Wrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  marginTop: 4,
  gap: 4,
});
const colorMapping = {
  info: colors.sb60,
  primary: colors.dn30,
  secondary: colors.mn80,
  warning: colors.sy60,
  success: colors.sg70,
  error: colors.sr60,
};
const HelpText = ({ txt, icon, stt, icoPos }: IProps) => {
  return (
    <Wrapper>
      {icoPos !== "right" && icon}
      <Typography
        color={colorMapping[stt as keyof typeof colorMapping] || "secondary"}
        variant="subtitle2"
      >
        {txt}
      </Typography>
      {icoPos === "right" && icon}
    </Wrapper>
  );
};
export default HelpText;
