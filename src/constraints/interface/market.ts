import {
  TMarket,
  TOrderKind,
  TOrderStatus,
  TOrderType,
  TSide,
  TViSide,
} from "../enum/common";

export interface  Stock {
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

export interface MatchedOrd {
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

export interface BaseOrd {
  txdate: string; // Ngày đặt lệnh
  afacctno: string; // Số tiểu khoản
  orderid: string; // Số hiệu lệnh
  txtime: string; // Thời gian đặt (HH24:MI:SS)
  symbol: string; // Mã chứng khoán
  execqtty: number; // Khối lượng khớp
  execamt: number; // Giá trị khớp
  execprice: number; // Giá khớp
  remainqtty: number; // Khối lượng chờ khớp
  remainamt: number; // Giá trị chờ khớp
  status: string; // Trạng thái tiếng việt
  en_status: string; // Trạng thái tiếng anh
  hosesession: string; // Phiên đặt lệnh
  cancelqtty: number; // Khối lượng hủy
  adjustqtty: number; // Khối lượng sửa
  odtimestamp: string; // Giờ cập nhật
  tradeplace: string; // Sàn giao dịch
}

export interface OrderInfo extends BaseOrd {
  custodycd: string; // Số lưu ký
  allowcancel: string; // Có được Hủy lệnh không (Y: có, N: không)
  allowamend: string; // Có được Sửa lệnh không (Y: có, N: không)
  side: TViSide; // Mua/Bán tiếng việt
  en_side: TSide; // Mua/Bán tiếng anh
  price: number; // Giá đặt
  pricetype: string; // Loại giá. Tra cứu select * from allcode where cdname ='PRICETYPE' and cdtype = 'OD'
  via: string; // Kênh giao dịch
  qtty: number; // Khối lượng đặt
  en_status: TOrderStatus; // Trạng thái tiếng anh
  tlname: string; // User đặt lệnh
  isdisposal: string; // Có phải là lệnh bán xử lý (Y: có, N: không)
  rootorderid: string; // Số hiệu lệnh gốc
  timetype: string; // Kiểu lệnh (Trong ngày, Điều kiện)
  timetypevalue: string; // Mã kiểu lệnh(T: Trong ngày, G: Điều kiện)
  feedbackmsg: string; // Thông tin trả về
  quoteqtty: string; // Khối lượng đặt
  matchtype: string; // Loại khớp tiếng việt
  en_matchtype: string; // Loại khớp tiếng anh
  avgprice: number; // Giá khớp trung bình
}

export interface WaitMatchedOrd extends BaseOrd {
  exectype: string; // Mã loại lệnh Mua/Bán. Tra cứu select * from allcode where cdname ='EXECTYPE' and cdtype = 'OD';
  matchtype: string; // Loại khớp
  pricetype: string; // Loại giá. Tra cứu select * from allcode where cdname ='PRICETYPE' and cdtype = 'OD'
  orderqtty: number; // KL đặt
  quoteprice: number; // Giá đặt
  desc_exectype: string; // Loại lệnh
  iscancel: string; // Được hủy không?
  isdisposal: string; // Có phải là lệnh bán xử lý (N: không, Y: Có)
  isadmend: string; // Được sửa không? (N: không, Y: Có)
  foacctno: string; // Số hiệu lệnh fomast (dự trữ)
  orstatusvalue: string; // Mã trạng thái. Tra cứu select * from allcode where cdname ='ORSTATUS' and cdtype = 'OD';
  confirmed: string; // Trạng thái xác nhận lệnh
  orstatus: string; // Trạng thái lệnh
  via: string; // Kênh đặt lệnh
  feedbackmsg: string; // Thông tin trả về
  timetype: string; // Kiểu lệnh (Trong ngày, Điều kiện)
  timetypevalue: string; // Mã kiểu lệnh(T: Trong ngày, G: Điều kiện)
}

export interface MatchedOrd extends BaseOrd {
  afacctname: string; // Tên tiểu khoản
  exectype: string; // Loại giao dịch
  en_exectype: string; // Loại giao dịch tiếng anh
  exectypecd: string; // Mã loại giao dịch
  avgexecprice: number; // Giá đặt
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
  rootorderid: string; // Số hiệu lệnh gốc
  tradeplacecd: string; // Mã sàn
  last_change: string; // Lần cuối chỉnh sửa
  taxrate: number; // Thuế suất
  quoteprice: number; // Giá đặt
  orderqtty: number; // Số lượng đặt
  pricetype: string; // Loại lệnh
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
export interface InsRTData {
  Id: string; // identify
  SB: string; // Symbol: Mã chứng khoán
  SI: string; // StockId
  FN: string; // FullName: Tên mã
  TD: string; // Tradingdate: ngày giao dịch
  ST: string; // StockType
  CL: number; // Ceiling: giá trần
  FL: number; // Floor: giá sàn
  RE: number; // Reference: giá tham chiếu
  B3: number; // bidPrice3: top 3 giá mua tốt nhất
  V3: number; // volPrice3: top 3 khối lượng mua tốt nhất
  B2: number; // bidPrice2: top 3 giá mua tốt nhất
  V2: number; // volPrice2: top 3 khối lượng mua tốt nhất
  B1: number; // bidPrice1: top 3 giá mua tốt nhất
  V1: number; // volPrice1: top 3 khối lượng mua tốt nhất
  CP: number; // closePrice: giá khớp cuối
  CV: number; // closeVol: khối lượng khớp cuối
  CH: number; // Change: thay đổi so với giá tham chiếu
  CHP: number; // changePercent: phần trăm thay đổi so với giá tham chiếu
  S1: number; // offerPrice1: top 3 giá bán tốt nhất
  U1: number; // offerVol1 top 3 khối lượng bán tốt nhất
  S2: number; // offerPrice2: top 3 giá bán tốt nhất
  U2: number; // offerVol2 top 3 khối lượng bán tốt nhất
  S3: number; // offerPrice3: top 3 giá bán tốt nhất
  U3: number; // offerVol3 top 3 khối lượng bán tốt nhất
  TT: number; // totalTrading: tổng khổi lượng giao dịch
  TV: number; // totalTradingValue: tổng giá trị giao dịch
  AP: number; // averagePrice: giá trung binh
  OP: number; // Open: giá mở cửa
  HI: number; // High: giá cao nhất
  LO: number; // Low: giá thấp nhất
  FB: number; // foreignBuy: nước ngoài mua
  FS: number; // foreignSell: nước ngoài bán
  FR: number; // foreignRemain
  FO: number; // foreignRoom: room nước ngoài
  TO: number; // TOTAL_OFFER_QTTY
  TB: number; // TOTAL_BID_QTTY
  PP: number; // PRIOR_PRICE
  SS: string; // Status
  P1: string; // priceOne
  PMQ: number; // PT_MATCH_QTTY: khối lượng khớp lệnh thỏa thuận
  PMP: number; // PT_MATCH_PRICE: giá khớp lệnh thỏa thuận
  PTQ: number; // PT_TOTAL_TRADED_QTTY: khối lượng giao dịch thỏa thuận
  PTV: number; // PT_TOTAL_TRADED_VALUE: giá trị giao dịch thỏa thuận
  FC: string; // FloorCode
  P2: string; // priceTwo
  OI: string; // openInterest
  OIC: string; // openInterestChange
  FTD: string; // firstTradingDate
  LTD: string; // lastTradingDate
  ULS: string; // underlyingSymbol
  TSI: string; // tradingSessionID
  LS: string; // ListedShare
  CWT: string; // CoveredWarrantType
  EX: string; // Exchange: sàn giao dịch
  EP: string; // ExercisePrice
  ER: string; // ExerciseRatio
  IN: string; // IssuerName
  MD: string; // MaturityDate
}
export interface TradeRTData {
  IID: string; // Indentity
  SM: string; // Sequence MSG
  TD: string; // Ngày giao dịch
  SB: string; // Mã CK
  FT: string; // Thời gian
  FMP: number; // Giá khớp
  FCV: number; // Giá trị thay đổi
  FV: number; // KL khớp
  AVO: number; // KL tích lũy
  AVA: number; // Giá trị tích lũy
}
export interface AccountRTData {
  custodycd: string; // số lưu ký
  accountno: string; // số tài khoản giao dịch
  orderid: string; // Số hiệu lệnh
  code: string; // Mã CK
  lastchange: string; // Thời gian
  subside: string; // Loại lệnh
  side_desc: string; // Diễn giải loại lệnh
  subtypecd: string; // Loại giá
  ordertype_desc: string; // diễn giải loại giá
  validity: string; // validity
  dataval: string; // dataval
  status: string; // Trạng thái lệnh
  orderqtty: number; // Số lượng đặt
  orderprice: number; // Giá đặt
  matchprice: number; // giá khớp
  matchqtty: number; // số lượng khớp
  odsent: string; // Thời gian đặt
  execamt: number; // Giá trị khớp
  remain_qtty: number; // SL chờ khớp
  cancel_qtty: number; // SL hủy
  admend_qtty: number; // SL sửa
  confirmid: string; // SHL sở confirm
  originorderid: string; // SHL gốc
  txdate: string; // Ngày yêu cầu
  feeamt: number; // Phí
  tax: number; // Thuế
  tradingfee: number; // Phần tram phí
  via: string; // Kênh đặt lệnh
  norp: string; // Lệnh thỏa thuận hay ko?
}
