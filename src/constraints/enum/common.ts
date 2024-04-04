export enum TMarket {
  HOSE = "HOSE",
  HNX = "HNX",
  UPCOM = "UPCOM",
}
export enum TOrderStatus {
  cancel = "cancel",
  open = "open",
  done = "done",
  "Matcheh all" = "Matcheh all",
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
export type TOrderKind = "normal" | "";
export enum TOrderType {
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

export enum TTransactionStatus {
  open = "open",
  filled = "filled",
  canceled = "canceled",
  partial_filled = "partial filled",
}

export enum TOrderActionType {
  detail = "detail",
  cancel = "cancel",
  update = "update",
}

export enum TAuthType {
  password = "password",
  refresh_token = "refresh_token",
}

export enum TPwdType {
  LOGINPWD = "LOGINPWD",
  TRADINGPWD = "TRADINGPWD",
}

export enum TPinAuthType {
  OTP = 1,
  SMSOTP = 5,
  DIGI_SIGN = 4,
}

export enum TShortSide {
  s = "s",
  b = "b",
}
export enum TSide {
  buy = "buy",
  sell = "sell",
}

export enum TViSide {
  mua = "mua",
  ban = "bán",
}

export enum TOrderStatus {
  Open = "Open", // Mở
  Send = "Send", // Đã gửi
  Canceled = "Canceled", // Đã hủy
  Rejected = "Rejected", // Từ chối
  Admending = "Admending", // Đang sửa
  Matched = "Matched", // Đã khớp
  Expired = "Expired", // Hết hiệu lực
  Canceling = "Canceling", // Đang hủy
  Successful = "Successful", // Hoàn thành
  Pending = "Pending", // Chờ gửi, Chờ duyệt, Chờ xử lý
  Admended = "Admended", // Đã sửa
  Sending = "Sending", // Đang gửi
  MatchedAll = "Matched All", // Khớp hết
  WaitForConfirmation = "Wait For Confirmation", // Chờ xác nhận
  WaitBankDeposits = "Wait Bank Deposits", // Chờ ký quỹ ngân hàng
}

export enum TradeType {
  CASHTRANS = "CASHTRANS",
  STOCKTRANS = "STOCKTRANS",
  GROUP_ORDER = "GROUP_ORDER",
  ADWINPUT = "ADWINPUT",
  RESETPASS = "RESETPASS",
  ISSUEINPUT = "ISSUEINPUT",
  COND_ORDER = "COND_ORDER",
  ORDINPUT = "ORDINPUT",
  DEPOSIT = "DEPOSIT",
  CASHTRANSENDDATE = "CASHTRANSENDDATE",
}
