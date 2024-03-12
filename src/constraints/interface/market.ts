export interface Stock {
  symbol: string;
  FullName: string;
  ceiling: number;
  floor: number;
  reference: number;
  exchange: string;
  StockType: string;
  //fix me
  price: number;
  open: number;
  high: number;
  low: number;
  chg: number;
  pctChg: number;
}
