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
  THUONG = "THUONG",
  MARGIN = "MARGIN",
}

export type Language = "en" | "vi";

export enum TReduxAction {
  SET_TICKER = "SET_TICKER",
}
export type TOrderKind = "normal" | "";
export enum TOrderType {
  LO = "LO", //Lệnh giới hạn
  MP = "MP", //Lệnh thị trường
  MAK = "MAK", //Lệnh khớp liên tục
  MOK = "MOK", //Lệnh khớp ngay
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
  PIN = "1",
  SMSOTP = "5",
  DIGI_SIGN = "4",
}

export enum TShortSide {
  s = "S",
  b = "B",
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
  CASHTRANS = "CASHTRANS", //Chuyển tiền
  STOCKTRANS = "STOCKTRANS", //Chuyển chứng khoán
  GROUP_ORDER = "GROUP_ORDER", //Đặt lệnh nhóm
  ADWINPUT = "ADWINPUT", //Ứng trước tiền bán.
  RESETPASS = "RESETPASS", //Quên mật khẩu
  ISSUEINPUT = "ISSUEINPUT", //Đăng ký quyền mua
  COND_ORDER = "COND_ORDER", //Đặt lệnh điều kiện
  ORDINPUT = "ORDINPUT", //Đặt lệnh thông thường
  DEPOSIT = "DEPOSIT", //Tra cứu giao dịch
  CASHTRANSENDDATE = "CASHTRANSENDDATE", //Chuyển khoản tiền cuối ngày.
}

export type TShortWay = "asc" | "desc" | "";

export type HNXOrderType =
  | "LO"
  | "ATO"
  | "ATC"
  | "MP"
  | "MAK"
  | "MOK"
  | "MTL"
  | "RP"
  | "PLO";
export type HOSEOrderType = "LO" | "ATO" | "ATC" | "MP" | "RP";
export type UPCOMOrderType = "LO" | "RP";
