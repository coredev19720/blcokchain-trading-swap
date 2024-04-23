import {
  HNXOrderType,
  HOSEOrderType,
  TMarket,
  TSide,
  UPCOMOrderType,
} from "../enum/common";

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
  market: TMarket;
}
export interface IBestDeal {
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

export interface IHNXOrderTypeOpts {
  label: HNXOrderType;
  value: HNXOrderType;
}

export interface IHOSEOrderTypeOpts {
  label: HOSEOrderType;
  value: HOSEOrderType;
}

export interface IUPCOMOrderTypeOpts {
  label: UPCOMOrderType;
  value: UPCOMOrderType;
}
