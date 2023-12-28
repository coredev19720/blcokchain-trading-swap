import { TSide } from "../enum";

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
  ticker: string;
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

export interface IHistoryDeal {
  time: string;
  side: TSide;
  price: number;
  vol: number;
}
