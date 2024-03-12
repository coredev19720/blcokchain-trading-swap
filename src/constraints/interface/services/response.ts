import {
  AccAvailTrade,
  AccInfo,
  AccSummary,
  AccsPermissions,
  AuthorInfo,
} from "../account";
import { OrderInfo, OrderWaitMatchedInfo, PortItem } from "../common";
import { Stock } from "../market";

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
  d: {
    txdate: string; // Ngày đặt lệnh
    warningcode: string; // Mã cảnh báo
    warningdesc: string; // Diễn giải cảnh báo
    tokenid: string; // Tokeninfo cho xác thực OTP/TOKEN/MATRIX của tài khoản
    transactionId: string; // Mã giao dịch
  };
}

export interface GetOrdersRes extends BaseRes {
  d: OrderInfo[];
}

export interface GetWaitMatchedOrdersRes extends BaseRes {
  d: OrderWaitMatchedInfo[];
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
