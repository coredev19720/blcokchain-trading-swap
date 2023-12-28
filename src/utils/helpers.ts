import { tickerOpts } from "../constants/dumpData";
import colors from "@/src/themes/colors";
export const uIdGen = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const validTicker = (val: string) => {
  const validTicker = tickerOpts.find((ticker) => ticker.value === val);
  if (validTicker) return true;
  return false;
};

export const genTextColor = (
  ref: number,
  price: number,
  ceil: number,
  floor: number
) => {
  if (price === ceil) return colors.lightCeilText;
  if (price === floor) return colors.lightFloorText;
  if (price === ref) return colors.lightRefText;
  if (price > ref) return colors.lightUpText;
  if (price < ref) return colors.lightDownText;
  return colors.lightRefText;
};

export const genTextWithPrefix = (val: number) => {
  if (val > 0) return `+${val}`;
  if (val < 0) return `-${val}`;
  return val;
};

export const formatBigNumber = (val: number) => {
  if (val > 1000000000) return `${(val / 1000000000).toFixed(1)}B`;
  if (val > 1000000) return `${(val / 1000000).toFixed(1)}M`;
  if (val > 1000) return `${(val / 1000).toFixed(1)}K`;
  return val;
};
