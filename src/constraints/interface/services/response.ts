import {
  AccAvailTrade,
  AccInfo,
  AccSummary,
  AccsPermissions,
  AuthorInfo,
} from "../account";
import { MatchedOrd, PortItem } from "../market";
import { PreCheckData, Stock, OrderInfo, WaitMatchedOrd } from "../market";

export interface BaseRes {
  s: string;
  errcode: string | number;
  errmsg: string;
  ec: string | number;
  em: string;
}

export interface BaseErrorRes {
  s: string;
  errcode: string | number;
  errmsg: string;
  ec: string | number;
  em: string;
}

export interface LoginRes extends BaseRes {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  sessionID: string;
  token_type: string;
}

//permission
export interface PermissionInfoRes extends BaseRes {
  d: {
    accounts: AccsPermissions[];
  };
}

export interface CreateOrderRes extends BaseRes {
  d: {
    orderid: string;
  };
}

export interface PrecheckOrderRes extends BaseRes {
  d: PreCheckData;
}

export interface UpdateOrderRes extends BaseRes {
  d: PreCheckData;
}

export interface GetOrdersRes extends BaseRes {
  d: OrderInfo[];
}

export interface GetWaitMatchedOrdsRes extends BaseRes {
  d: WaitMatchedOrd[];
}

export interface GetMatchedOrdsRes extends BaseRes {
  d: MatchedOrd[];
}

export interface GetPortfolioRes extends BaseRes {
  d: PortItem[];
}

export interface GetAccountsRes extends BaseRes {
  d: AccInfo[];
}

export interface GetAccSummaryRes extends BaseRes {
  d: AccSummary;
}

export interface GetAccPermissionRes extends BaseRes {
  d: {
    accounts: AccsPermissions;
  };
}

export interface GetAuthorInfoRes extends BaseRes {
  d: AuthorInfo;
}

export interface AccAvailTradeRes extends BaseRes {
  d: AccAvailTrade;
}

export interface GetInstrumentsRes extends BaseRes {
  d: Stock[];
}
