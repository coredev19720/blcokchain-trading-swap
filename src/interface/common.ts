import {
  TAccountType,
  TMarket,
  TOrderKind,
  TOrderType,
  TSide,
  TTransactionStatus,
} from "../enum";

export interface IUserInfo {
  name: string;
  email: string;
}

export interface ILoginForm {
  username: string;
  pwd: string;
  expireTime: number;
}

export interface ITickerOpt {
  title: string;
  value: string;
}

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

export interface IMenuItem {
  label: string;
  icon: any;
  url: string;
  activeIcon: any;
}

export interface IAccount {
  type: TAccountType;
  accountNo: string;
  totalAsset: number;
  cashPayables: number;
  receivingCash: number;
  buyingPower: number;
  cashBalance: number;
  coh: number;
  accessEquity: number;
  portValue: number;
}

export interface ILang {
  label: string;
  value: string;
  icon: any;
}

export interface ITicket {
  symbol: string;
  side: TSide;
  price: number;
  vol: number;
  kind: TOrderKind;
  type: TOrderType;
  market: TMarket;
}

export interface IStringOpts {
  label: string;
  value: string;
}
export interface IOrder extends ITicket {
  time: string;
  execQty: number;
  pendingQty: number;
  code: string;
  accountNo: string;
  status: TTransactionStatus;
}
