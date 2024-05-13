import crypto from "crypto";
import colors from "@src/themes/colors";
import { TPinAuthType } from "../constraints/enum/common";
export const uIdGen = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
export const genTrend = (
  ref?: number,
  price?: number | string,
  ceil?: number,
  floor?: number
) => {
  if (!ref || !price || !ceil || !floor || typeof price !== "number")
    return "ref";
  if (price === ceil) return "ce";
  if (price === floor) return "fl";
  if (price > ref) return "up";
  if (price < ref) return "down";
  return "ref";
};
export const genPriceColor = (
  ref?: number,
  price?: number,
  ceil?: number,
  floor?: number
) => {
  if (!ref || !price || !ceil || !floor) return colors.lightRefText;
  if (price === ceil) return colors.lightCeilText;
  if (price === floor) return colors.lightFloorText;
  if (price === ref) return colors.lightRefText;
  if (price > ref) return colors.lightUpText;
  if (price < ref) return colors.lightDownText;
  return colors.lightRefText;
};

export const genIndexTrend = (chg: number) => {
  if (chg > 0) return "up";
  if (chg < 0) return "down";
  return "ref";
};

export const genIndexColor = (chg: number) => {
  if (chg > 0) return colors.lightUpText;
  if (chg < 0) return colors.lightDownText;
  return colors.lightRefText;
};
export const genTextWithPrefix = (val: number) => {
  if (val > 0) return `+${val}`;
  if (val < 0) return `${val}`;
  return val;
};

export const formatBigNumber = (val: number | undefined) => {
  if (!val) return "-";
  if (val >= 1000000000) return `${(val / 1000000000).toFixed(1)}B`;
  if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
  if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
  return val;
};

export const formatNumber = (number: number, decimal = 0, defaultVal = "-") => {
  if (number === 0) return defaultVal;
  return number
    ? number.toLocaleString("en-US", {
        minimumFractionDigits: decimal,
        maximumFractionDigits: decimal,
      })
    : "-";
};

export const unFormatNumber = (number: number | string): number => {
  if (typeof number === "string") {
    return Number(number.split(".").join("").split(",").join(""));
  }
  return number;
};

export const findDiffIndex = (str1: string, str2: string) => {
  const minLength = Math.min(str1.length, str2.length);

  for (let i = 0; i < minLength; i++) {
    if (str1[i] !== str2[i]) {
      return i;
    }
  }
  return null;
};

export const genValidPrice = (val: number, floorPrice: number) => {
  if (val < floorPrice) return (floorPrice / 1000).toFixed(2);
  return (val / 1000).toFixed(2);
};

export const lastSymLocalKey: string = process.env.NEXT_PUBLIC_LAST_SYM_KEY
  ? process.env.NEXT_PUBLIC_LAST_SYM_KEY
  : "lastSym";
export const setLastSymbolToLocalStorage = (symbol: string) => {
  window.localStorage.setItem(lastSymLocalKey, symbol);
};

export const genChgTextClass = (chg: number) => {
  if (chg > 0) return colors.lightUpText;
  if (chg < 0) return colors.lightDownText;
  return "text.primary";
};

export const generateUniqueId = () => {
  return crypto.randomBytes(8).toString("hex");
};

export const genOTPLenth = (type?: TPinAuthType) => {
  const otpLen = Number(process.env.NEXT_PUBLIC_OTP_LEN);
  const pinLen = Number(process.env.NEXT_PUBLIC_PIN_LEN);
  if (!type) return otpLen;
  return type === TPinAuthType.SMSOTP ? otpLen : pinLen;
};

export const removeCommas = (val: string) => {
  return val.replace(/,/g, "");
};
