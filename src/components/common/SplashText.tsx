import { styled } from "@mui/system";
import { keyframes } from "@emotion/react";
import colors from "@/src/themes/colors";
import React from "react";
import { usePreviousValue } from "@/src/hooks/usePreviousValue";
type Trend = "up" | "down" | "ref" | "ce" | "fl";
interface Props {
  val: string | number | undefined;
  trend?: Trend;
  children?: React.ReactNode;
}
const splash = keyframes`  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }`;

const dAni = keyframes`
  0% {
    background-color: ${colors.lightDownText};
  }
  100% {
    background-color: transparent;
  }
`;

const uAni = keyframes`
  0% {
    background-color: ${colors.lightUpText};
  }
  100% {
    background-color: transparent;
  }
`;

const rAni = keyframes`
  0% {
    background-color: ${colors.lightRefText};
  }
  100% {
    background-color: transparent;
  }
`;

const cAni = keyframes`
  0% {
    background-color: ${colors.lightCeilText};
  }
  100% {
    background-color: transparent;
  }
`;

const fAni = keyframes`
  0% {
    background-color: ${colors.lightFloorText};
  }
  100% {
    background-color: transparent;
  }
`;

const dtAni = keyframes`
  0% {
    color: white;
  }
  100% {
    color: ${colors.lightDownText};
  }
`;
const utAni = keyframes`
  0% {
    color: white;
  }
  100% {
    color: ${colors.lightUpText};
  }
`;
const rtAni = keyframes`
  0% {
    color: white;
  }
  100% {
    color: ${colors.lightRefText};
  }
`;
const ctAni = keyframes`
  0% {
    color: white;
  }
  100% {
    color: ${colors.lightCeilText};
  }
`;
const ftAni = keyframes`
  0% {
    color: white;
  }
  100% {
    color: ${colors.lightFloorText};
  }
`;
const eff = "0.7s ease-in-out ";
const genAni = (trend?: Trend) => {
  if (!trend) return "";
  switch (trend) {
    case "down":
      return `${dAni} ${eff}, ${dtAni} ${eff}`;
    case "up":
      return `${uAni} ${eff}, ${utAni} ${eff}`;
    case "ref":
      return `${rAni} ${eff}, ${rtAni} ${eff}`;
    case "ce":
      return `${cAni} ${eff}, ${ctAni} ${eff}`;
    case "fl":
      return `${fAni} ${eff}, ${ftAni} ${eff}`;
    default:
      return "";
  }
};
export const Wrapper = styled("div")<{
  trend?: "up" | "down" | "ref" | "ce" | "fl";
}>((props) => ({
  animation: `${splash} ${eff}, ${genAni(props.trend)}`,
  animationFillMode: "forwards",
  display: "inline-block",
}));

const genColor = (trend: "up" | "down" | "ref" | "ce" | "fl") => {
  switch (trend) {
    case "down":
      return colors.lightDownText;
    case "up":
      return colors.lightUpText;
    case "ref":
      return colors.lightRefText;
    case "ce":
      return colors.lightCeilText;
    case "fl":
      return colors.lightFloorText;
    default:
      return "white";
  }
};

const SplashText = ({ val, children, trend }: Props) => {
  const previous = usePreviousValue(val);
  return (
    <Wrapper
      key={val}
      trend={previous ? trend : undefined}
      style={{ color: trend && genColor(trend) }}
    >
      {children}
    </Wrapper>
  );
};
export default React.memo(SplashText, (prev, next) => prev.val === next.val);
