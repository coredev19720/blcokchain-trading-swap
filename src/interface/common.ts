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
  chgPer: number;
  vol: number;
}
