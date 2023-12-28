import { tickerOpts } from "../constants/dumpData";

export const uIdGen = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const validTicker = (val: string) => {
  const validTicker = tickerOpts.find((ticker) => ticker.value === val);
  if (validTicker) return true;
  return false;
};
