import {
  TMarket,
  TOrderKind,
  TOrderStatus,
  TOrderType,
  TSide,
  TViSide,
} from "../enum/common";

export interface Stock {
  symbol: string;
  FullName: string;
  ceiling: number;
  floor: number;
  reference: number;
  exchange: string;
  StockType: string;
  //fix me
  price: number;
  open: number;
  high: number;
  low: number;
  chg: number;
  pctChg: number;
}

export interface MatchedOrder {
  txdate: string; // Ngày đặt lệnh
  afacctno: string; // Số tiểu khoản
  afacctname: string; // Tên tiểu khoản
  exectype: string; // Loại giao dịch
  en_exectype: string; // Loại giao dịch tiếng anh
  exectypecd: string; // Mã loại giao dịch
  symbol: string; // Mã chứng khoán
  execqtty: number; // Số lượng đặt
  avgexecprice: number; // Giá đặt
  execamt: number; // Số tiền mua
  feeacr: number; // Phí
  totalamt: number; // Tổng
  bexecqtty: number; // Số lượng mua
  bavgexecprice: number; // Giá mua
  bexecamt: number; // Tổng mua tạm tính
  bfeeacr: number; // Phí mua
  btotalamt: number; // Tổng mua
  sexecqtty: number; // Giá bán
  savgexecprice: number; // Số lượng bán
  sexecamt: number; // Bán tạm tính
  sfeeacr: number; // Phí bán
  staxright: number; // Thuế
  stotalamt: number; // Tổng bán
  feerate: number; // % thuế
  orderid: string; // Số hiệu lệnh
  rootorderid: string; // Số hiệu lệnh gốc
  tradeplace: string; // Sàn giao dịch
  tradeplacecd: string; // Mã sàn
  last_change: string; // Lần cuối chỉnh sửa
  txtime: string; // Thời gian giao dịch
  taxrate: number; // Thuế suất
  quoteprice: number; // Giá đặt
  orderqtty: number; // Số lượng đặt
  pricetype: string; // Loại lệnh
  remainqtty: number; // Số lượng còn lại
  remainamt: number; // Tổng còn
  status: string; // Trạng thái
  en_status: string; // Trạng thái tiếng anh
  status_code: string; // Mã trạng thái
}

export interface PreCheckData {
  txdate: string; // Ngày đặt lệnh
  warningcode: string; // Mã cảnh báo
  warningdesc: string; // Diễn giải cảnh báo
  tokenid: string; // Tokeninfo cho xác thực OTP/TOKEN/MATRIX của tài khoản
  transactionId: string; // Mã giao dịch
}

export interface BaseOrderInterface {
  txdate: string; // Ngày đặt lệnh
  afacctno: string; // Số tiểu khoản
  orderid: string; // Số hiệu lệnh
  symbol: string; // Mã chứng khoán
  pricetype: string; // Loại giá. Tra cứu select * from allcode where cdname ='PRICETYPE' and cdtype = 'OD'
  execqtty: number; // Khối lượng khớp
  remainqtty: number; // Khối lượng chờ khớp
  status: string; // Trạng thái tiếng việt
  en_status: string; // Trạng thái tiếng anh
  tradeplace: string; // Sàn giao dịch
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

export interface WaitMatchedOrder {
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

export interface MatchedOrder {
  txdate: string; // Ngày đặt lệnh
  afacctno: string; // Số tiểu khoản
  afacctname: string; // Tên tiểu khoản
  exectype: string; // Loại giao dịch
  en_exectype: string; // Loại giao dịch tiếng anh
  exectypecd: string; // Mã loại giao dịch
  symbol: string; // Mã chứng khoán
  execqtty: number; // Số lượng đặt
  avgexecprice: number; // Giá đặt
  execamt: number; // Số tiền mua
  feeacr: number; // Phí
  totalamt: number; // Tổng
  bexecqtty: number; // Số lượng mua
  bavgexecprice: number; // Giá mua
  bexecamt: number; // Tổng mua tạm tính
  bfeeacr: number; // Phí mua
  btotalamt: number; // Tổng mua
  sexecqtty: number; // Giá bán
  savgexecprice: number; // Số lượng bán
  sexecamt: number; // Bán tạm tính
  sfeeacr: number; // Phí bán
  staxright: number; // Thuế
  stotalamt: number; // Tổng bán
  feerate: number; // % thuế
  orderid: string; // Số hiệu lệnh
  rootorderid: string; // Số hiệu lệnh gốc
  tradeplace: string; // Sàn giao dịch
  tradeplacecd: string; // Mã sàn
  last_change: string; // Lần cuối chỉnh sửa
  txtime: string; // Thời gian giao dịch
  taxrate: number; // Thuế suất
  quoteprice: number; // Giá đặt
  orderqtty: number; // Số lượng đặt
  pricetype: string; // Loại lệnh
  remainqtty: number; // Số lượng còn lại
  remainamt: number; // Tổng còn
  status: string; // Trạng thái
  en_status: string; // Trạng thái tiếng anh
  status_code: string; // Mã trạng thái
}

export interface PortItem {
  accountID: string; // Số tiểu khoản
  symbol: string; // Mã chứng khoán
  total: number; // Tổng
  trade: number; // KLGD khả dụng
  blocked: number; // Phong tỏa
  vsdMortgage: number; // Cầm cố VSD
  restrict: number; // HCCN
  receivingRight: number; // Quyền chờ về
  receivingT0: number; // Chờ về T0
  receivingT1: number; // Chờ về T1
  receivingT2: number; // Chờ về T2
  costPrice: number; // Giá vốn
  withDraw: number; // CK chờ rút
  mortgage: number; // KL cầm cố
  basicPrice: number; // Giá tham chiếu
  isSell: "Y" | "N"; // Mã CK này có được bán không(Y: Có, N: không)
  sectype: string; // Mã loại chứng khoán. Tra cứu: select * from allcode where cdname = 'SECTYPE' and cdtype = 'SA'
  pnlamt: number; // Lãi lỗ dự tính
  pnlrate: string; // % lãi lỗ dự tính
  closeprice: string; // Giá khớp gần nhất
  sending: number; // Chờ giao
  alldeposit: number; // Chờ lưu ký
  mrratiorate: number; // Tỷ lệ tính tài sản
  costPriceAmt: number; // Giá trị vốn
  basicPriceAmt: number; // Giá trị thị trường
  totalpnl: number; // Tổng số lượng CK để tính giá trị vốn
  otherqtty: number; // KL khác(hiện chỉ có KL chờ chuyển ra ngoài)
  mortCty: number; // Cầm cố CTY
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
