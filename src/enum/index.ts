export type TMarket = "HOSE" | "HNX" | "UPCOM";
export type TStockType = "stock" | "etf" | "warrant" | "bond" | "fund";
export type TOrderType = "LO" | "MP";
export type TOrderStatus = "open" | "done" | "cancel";
export type TOrderSide = "buy" | "sell";
export type TOrderTimeInForce = "IOC" | "FOK" | "GTC";
export type TOrderValidity = "DAY" | "GTC";
export type TOrderRejectReason =
  | "invalid"
  | "not_enough_money"
  | "not_enough_stock"
  | "not_enough_balance"
  | "not_enough_position"
  | "not_enough_order";

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

export enum TOrderKind {
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
