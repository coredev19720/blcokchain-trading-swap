export type TMarket = "HOSE" | "HNX" | "UPCOM";
export type TOrderStatus = "open" | "done" | "cancel";

export enum TSide {
  SELL = "SELL",
  BUY = "BUY",
}

export enum TAccountType {
  CASH = "CASH",
  MARGIN = "MARGIN",
  MARGIN_CASH = "MARGIN_CASH",
  MARGIN_STOCK = "MARGIN_STOCK",
}

export type Language = "en" | "vi";

export enum TReduxAction {
  SET_TICKER = "SET_TICKER",
}
export type TOrderKind = "normal" | "";
export enum TOrderType {
  LO = "LO",
  MP = "MP",
  MAK = "MAK",
  MOK = "MOK",
  MTL = "MTL",
  RP = "RP",
  PLO = "PLO",
  ATO = "ATO",
  ATC = "ATC",
}
