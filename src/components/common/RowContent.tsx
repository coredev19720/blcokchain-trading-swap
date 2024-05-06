import React from "react";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import { formatNumber } from "@/src/utils/helpers";
interface IProps {
  leftTxt?: string;
  rightTxt?: string | number;
  isChild?: boolean;
  rightColor?: string;
  leftColor?: string;
}
const Wrapper = styled("div")<{ isChild?: boolean }>(({ isChild }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
  width: "100%",
  ...(isChild ? { paddingLeft: 16, paddingRight: 16 } : {}),
}));
const RowContent = ({
  leftTxt,
  rightTxt,
  isChild,
  rightColor,
  leftColor,
}: IProps) => {
  return (
    <Wrapper isChild={isChild}>
      <Typography variant="body2" color={leftColor ?? "text.secondary"}>
        {leftTxt}
      </Typography>
      <Typography
        variant="body2"
        fontWeight={600}
        color={rightColor ?? "text.primary"}
      >
        {typeof rightTxt === "number" ? formatNumber(rightTxt) : rightTxt}
      </Typography>
    </Wrapper>
  );
};

export default RowContent;
