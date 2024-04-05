import { usePreviousValue } from "@/src/hooks/usePrevious";
import { styled } from "@mui/system";
import { keyframes } from "@emotion/react";
interface Props {
  val: number;
  trend?: "up" | "down" | "ref" | "ceil" | "floor";
  children?: React.ReactNode;
}

const splashAnimation = keyframes`  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }`;
export const Wrapper = styled("div")(() => ({
  animation: `${splashAnimation} 0.7s ease-in-out`,
}));

const SplashText = ({ val, children, trend }: Props) => {
  return <Wrapper key={val}>{children}</Wrapper>;
};
export default SplashText;
