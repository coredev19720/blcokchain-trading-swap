import React from "react";
import colors from "@/src/themes/colors";
import { styled } from "@mui/system";
interface IProps {
  margin?: number;
  vertical?: boolean;
}
const Wrapper = styled("div")<IProps>(({ theme, margin, vertical }) => ({
  height: vertical ? "100%" : 1,
  width: vertical ? 1 : "100%",
  backgroundColor: colors.ln10,
  ...(margin && { marginTop: `${margin}px`, marginBottom: `${margin}px` }),
}));
const Line = ({ margin, vertical }: IProps) => {
  return <Wrapper margin={margin} vertical={vertical} />;
};

export default Line;
