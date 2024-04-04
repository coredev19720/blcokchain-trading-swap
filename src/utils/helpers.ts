import colors from "@src/themes/colors";
export const uIdGen = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
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

export const genIndexColor = (chg: number) => {
  if (chg > 0) return colors.lightUpText;
  if (chg < 0) return colors.lightDownText;
  return colors.lightRefText;
};
export const genTextWithPrefix = (val: number) => {
  if (val > 0) return `+${val}`;
  if (val < 0) return `-${val}`;
  return val;
};

export const formatBigNumber = (val: number) => {
  if (val >= 1000000000) return `${(val / 1000000000).toFixed(1)}B`;
  if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
  if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
  return val;
};

export const formatNumber = (number: number, decimal = 0) => {
  if (number === 0) return "-";
  return number
    ? number.toLocaleString("en-US", {
        minimumFractionDigits: decimal,
        maximumFractionDigits: decimal,
      })
    : "-";
};

export const unFormatNumber = (number: number | string) => {
  if (typeof number === "string") {
    return number.split(".").join("").split(",").join("");
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
export const genValidPrice = (
  val: number,
  currentVal: number,
  floorPrice: number
) => {
  const valStr = val.toString();
  const currentValStr = currentVal.toString();
  const floorPriceStr = floorPrice.toString();
  if (valStr.length >= currentValStr.length || valStr.length === 1) {
    const diffIndex = findDiffIndex(valStr, floorPriceStr);
    if (diffIndex !== null) {
      const valStrArr = valStr.split("");
      const floorPriceStrArr = floorPriceStr.split("");
      if (valStrArr[diffIndex] < floorPriceStrArr[diffIndex]) {
        valStrArr[diffIndex] = floorPriceStrArr[diffIndex];
        return (floorPrice / 1000).toFixed(2);
      }
    }
  }
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
