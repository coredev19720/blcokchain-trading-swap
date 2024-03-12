import {
  TAccountType,
  TMarket,
  TOrderKind,
  TOrderStatus,
  TOrderType,
  TSide,
  TTransactionStatus,
  TViSide,
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

export interface OrderInfo {
  custodycd: string; // Số lưu ký
  txdate: string; // Ngày đặt lệnh
  afacctno: string; // Số tiểu khoản
  orderid: string; // Số hiệu lệnh
  txtime: string; // Thời gian đặt (HH24:MI:SS)
  symbol: string; // Mã chứng khoán
  allowcancel: string; // Có được Hủy lệnh không (Y: có, N: không)
  allowamend: string; // Có được Sửa lệnh không (Y: có, N: không)
  side: TViSide; // Mua/Bán tiếng việt
  en_side: TSide; // Mua/Bán tiếng anh
  price: number; // Giá đặt
  pricetype: string; // Loại giá. Tra cứu select * from allcode where cdname ='PRICETYPE' and cdtype = 'OD'
  via: string; // Kênh giao dịch
  qtty: number; // Khối lượng đặt
  execqtty: number; // Khối lượng khớp
  execamt: number; // Giá trị khớp
  execprice: number; // Giá khớp
  remainqtty: number; // Khối lượng chờ khớp
  remainamt: number; // Giá trị chờ khớp
  status: string; // Trạng thái tiếng việt
  en_status: TOrderStatus; // Trạng thái tiếng anh
  tlname: string; // User đặt lệnh
  hosesession: string; // Phiên đặt lệnh
  cancelqtty: number; // Khối lượng hủy
  adjustqtty: number; // Khối lượng sửa
  isdisposal: string; // Có phải là lệnh bán xử lý (Y: có, N: không)
  rootorderid: string; // Số hiệu lệnh gốc
  timetype: string; // Kiểu lệnh (Trong ngày, Điều kiện)
  timetypevalue: string; // Mã kiểu lệnh(T: Trong ngày, G: Điều kiện)
  feedbackmsg: string; // Thông tin trả về
  quoteqtty: string; // Khối lượng đặt
  odtimestamp: string; // Giờ cập nhật
  matchtype: string; // Loại khớp tiếng việt
  en_matchtype: string; // Loại khớp tiếng anh
  avgprice: number; // Giá khớp trung bình
  tradeplace: string; // Sàn giao dịch
}

export interface OrderWaitMatchedInfo {
  exectype: string; // Mã loại lệnh Mua/Bán. Tra cứu select * from allcode where cdname ='EXECTYPE' and cdtype = 'OD';
  matchtype: string; // Loại khớp
  pricetype: string; // Loại giá. Tra cứu select * from allcode where cdname ='PRICETYPE' and cdtype = 'OD'
  afacctno: number; // Số tiểu khoản
  symbol: number; // Mã chứng khoán
  orderqtty: number; // KL đặt
  quoteprice: number; // Giá đặt
  status: string; // Trạng thái
  en_status: string; // Trạng thái tiếng anh
  orderid: string; // Số hiệu lệnh
  hosesession: string; // Phiên đặt lệnh
  remainqtty: number; // Khối lượng chờ khớp
  cancelqtty: number; // Khối lượng hủy
  adjustqtty: number; // Khối lượng sửa
  tradeplace: string; // Sàn (HNX, UPCOM, HOSE)
  desc_exectype: string; // Loại lệnh
  iscancel: string; // Được hủy không?
  isdisposal: string; // Có phải là lệnh bán xử lý (N: không, Y: Có)
  isadmend: string; // Được sửa không? (N: không, Y: Có)
  foacctno: string; // Số hiệu lệnh fomast (dự trữ)
  odtimestamp: string; // Giờ cập nhật
  orstatusvalue: string; // Mã trạng thái. Tra cứu select * from allcode where cdname ='ORSTATUS' and cdtype = 'OD';
  confirmed: string; // Trạng thái xác nhận lệnh
  execqtty: number; // Khối lượng khớp
  execamt: number; // Giá trị khớp
  orstatus: string; // Trạng thái lệnh
  execprice: number; // Giá khớp
  txtime: string; // Thời gian đặt (HH24:MI:SS)
  txdate: string; // Ngày giao dịch
  via: string; // Kênh đặt lệnh
  feedbackmsg: string; // Thông tin trả về
  timetype: string; // Kiểu lệnh (Trong ngày, Điều kiện)
  timetypevalue: string; // Mã kiểu lệnh(T: Trong ngày, G: Điều kiện)
  remainamt: number; // Giá trị chờ khớp
}

export interface PortItem {
  accountID: string;
  symbol: string;
  total: number;
  trade: number;
  blocked: number;
  vsdMortgage: number;
  restrict: number;
  receivingRight: number;
  receivingT0: number;
  receivingT1: number;
  receivingT2: number;
  costPrice: number;
  withDraw: number;
  mortgage: number;
  basicPrice: number;
  isSell: "Y" | "N";
  sectype: string;
  pnlamt: number;
  pnlrate: string;
  closeprice: string;
  sending: number;
  alldeposit: number;
  mrratiorate: number;
  costPriceAmt: number;
  basicPriceAmt: number;
  totalpnl: number;
  otherqtty: number;
  mortCty: number;
}
