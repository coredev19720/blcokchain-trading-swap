import { TMarket, TOrderKind, TOrderType, TSide } from "../enum/common";

export interface ITickerData {
  symbol: string;
  companyName: string;
  open: number;
  ref: number;
  low: number;
  high: number;
  ceil: number;
  floor: number;
  price: number;
  chg: number;
  pctChg: number;
  vol: number;
  marketValue: number;
  klnnBuy: number;
  klnnSell: number;
  marketDepth: IMarketDepth;
  market: TMarket;
}
export interface IMarketDepth {
  deals: IDealPrice[];
  historyDeals: IHistoryDeal[];
}
export interface IDealPrice {
  price: number;
  buyVol: number;
  sellVol: number;
}

export interface IMarketInfo {
  name: string;
  index: number;
  chg: number;
  pctChg: number;
  vol: number;
  value: number;
}

export interface IHistoryDeal {
  time: string;
  side: TSide;
  price: number;
  vol: number;
}

export interface MenuItem {
  label: string;
  icon: any;
  url: string;
  activeIcon: any;
}

export interface Language {
  label: string;
  value: string;
  icon: any;
}

export interface IStringOpts {
  label: string;
  value: string;
}

// export interface IOrder extends ITicket {
//   time: string;
//   execQty: number;
//   pendingQty: number;
//   code: string;
//   accountNo: string;
//   status: TTransactionStatus;
// }
