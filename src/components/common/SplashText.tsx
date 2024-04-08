import { styled } from "@mui/system";
import { keyframes } from "@emotion/react";
import colors from "@/src/themes/colors";
interface Props {
  key: string | number | undefined;
  trend?: "up" | "down" | "ref" | "ce" | "fl";
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
export const Wrapper = styled("div")<{
  trend?: "up" | "down" | "ref" | "ce" | "fl";
}>((props) => ({
  animation: `${splash} ${eff}, ${
    props.trend === "down"
      ? `${dAni} ${eff}, ${dtAni} ${eff}`
      : props.trend === "up"
      ? `${uAni} ${eff}, ${utAni} ${eff}`
      : props.trend === "ref"
      ? `${rAni} ${eff}, ${rtAni} ${eff}`
      : props.trend === "ce"
      ? `${cAni} ${eff}, ${ctAni} ${eff}`
      : props.trend === "fl"
      ? `${fAni} ${eff}, ${ftAni} ${eff}`
      : ""
  }`,
  animationFillMode: "forwards",
}));

const SplashText = ({ key, children, trend }: Props) => {
  return (
    <Wrapper key={key} trend={trend}>
      {children}
    </Wrapper>
  );
};
export default SplashText;
