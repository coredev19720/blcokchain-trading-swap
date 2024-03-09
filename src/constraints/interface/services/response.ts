export interface BaseResponse {
  s: string;
  errcode: string | number;
  errmsg: string;
  ec: string | number;
  em: string;
}

export interface LoginResponse extends BaseResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  sessionID: string;
  token_type: string;
}

//permission
export interface GetPermissionInfoResponse extends BaseResponse {
  d: {
    accounts: AccountsPermissions[];
  };
}

export interface AccountPermissions {
  CASHTRANS: string[];
  STOCKTRANS: string[];
  GROUP_ORDER: string[];
  ADWINPUT: string[];
  RESETPASS: string[];
  ISSUEINPUT: string[];
  COND_ORDER: string[];
  ORDINPUT: string[];
  DEPOSIT: string[];
  CASHTRANSENDDATE: string[];
  COMMON?: string[];
}

export interface AccountsPermissions {
  [key: string]: AccountPermissions;
}

export interface AccountInfo {
  cftype: string;
  custodycd: string;
  id: string;
  name: string;
  corebank: string;
  accounttype: string;
  mrtype: string;
  producttype: string;
  autoadv: string;
}

export interface CustomerInfo {
  custodycd: string; // Số tài khoản
  dateofbirth: string; // Ngày sinh
  fullname: string; // Họ và tên
  sex: string; // Giới tính - 001: Nam; 002: Nữ; 000: Không xác định
  idcode: string; // Tradingcode, CMT/CCCD, giấy phép ĐKKD
  iddate: string; // Cấp ngày của tradingcode, CMT/CCCD, giấy phép ĐKKD
  idplace: string; // Nơi cấp của tradingcode, CMT/CCCD, giấy phép ĐKKD
  address: string; // Địa chỉ
  mobilesms: string; // Số điện thoại
  email: string; // Email
  opndate: string; // Ngày mở tài khoản
  cfafullname: string; // Họ và tên ủy quyền
  cfaidcode: string; // Số giấy tờ của ủy quyền
  cfaiddate: string; // Cấp ngày của ủy quyền
  cfaidplace: string; // Nơi cấp của ủy quyền
  cfaaddress: string; // Địa chỉ của ủy quyền
  cfamobilesms: string; // Số điện thoại của ủy quyền
  cfauth01: number; // Mua/Bán (1: được ủy quyền, 0: không được ủy quyền)
  cfauth02: number; // Gửi/Rút/Chuyển tiền (1: được ủy quyền, 0: không được ủy quyền)
  cfauth03: number; // Gửi/Rút/Chuyển CK, Đăng ký quyền mua (1: được ủy quyền, 0: không được ủy quyền)
  cfauth04: number; // Ứng trước tiền bán (1: được ủy quyền, 0: không được ủy quyền)
  cfauth05: number; // Cầm cố (1: được ủy quyền, 0: không được ủy quyền)
  cfauth06: number; // Margin (1: được ủy quyền, 0: không được ủy quyền)
  valdate: string; // Ngày hiệu lực của Ủy quyền
  expdate: string; // Ngày hết hiệu lực của Ủy quyền
  isbankaccount: string; // Có phải tài khoản corebank không? Y: có; N: không
  bankaccount_name: string; // Tên tài khoản corebank
  bankaccount_account: string; // Số tài khoản corebank
  bankaccount_bank: string; // Ngân hàng thụ hưởng corebank
  bankaccount_branch: string; // Chi nhánh ngân hàng thụ hưởng corebank
  isbenefitaccount1: string; // Có tài khoản thụ hưởng chuyển tiền thứ 1 không? Y: có; N: không
  benefitaccount_name1: string; // Tên tài khoản thụ thưởng chuyển tiền thứ 1
  benefitaccount_account1: string; // Số tài khoản thụ hưởng chuyển tiền thứ 1
  benefitaccount_bank1: string; // Ngân hàng thụ hưởng của TK chuyển tiền thứ 1
  benefitaccount_branch1: string; // Chi nhánh ngân hàng thụ hưởng của TK chuyển tiền thứ 1
  isbenefitaccount2: string; // Có tài khoản thụ hưởng chuyển tiền thứ 2 không? Y: có; N: không
  benefitaccount_name2: string; // Tên tài khoản thụ thưởng chuyển tiền thứ 2
  benefitaccount_account2: string; // Số tài khoản thụ hưởng chuyển tiền thứ 2
  benefitaccount_bank2: string; // Ngân hàng thụ hưởng của TK chuyển tiền thứ 2
  benefitaccount_branch2: string; // Chi nhánh ngân hàng thụ hưởng của TK chuyển tiền thứ 2
  isbenefitaccount3: string; // Có tài khoản thụ hưởng chuyển tiền thứ 3 không? Y: có; N: không
  benefitaccount_name3: string; // Tên tài khoản thụ thưởng chuyển tiền thứ 3
  benefitaccount_account3: string; // Số tài khoản thụ hưởng chuyển tiền thứ 3
  benefitaccount_bank3: string; // Ngân hàng thụ hưởng của TK chuyển tiền thứ 3
  benefitaccount_branch3: string; // Chi nhánh ngân hàng thụ hưởng của TK chuyển tiền thứ 3
}

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

export interface AccountSummary {
  ismargin: string; // Là tiểu khoản Margin (N: không, Y: Có)
  balance: number; // Tiền mặt thực có
  cibalance: number; // Tiền không kỳ hạn
  tdbalance: number; // Tiền có kỳ hạn
  avladvance: number; // Số tiền có thể ứng
  intbalance: number; // Lãi tiền gửi cộng dồn
  totalseamt: number; // Tổng giá trị chứng khoán
  totalbuyamt: number; // Chứng khoán mua đã khớp tính theo giá tham chiếu
  dfqttyamt: number; // Chứng khoán cầm cố
  totalodamt: number; // Tổng phải trả
  trfbuyamt: number; // Chậm trả T3
  secureamt: number; // Nợ ký quỹ trong ngày
  t0amt: number; // Nợ bảo lãnh
  mramt: number; // Nợ đã phát vay margin
  rcvadvamt: number; // Nợ ứng trước
  dfodamt: number; // Nợ vay cầm cố
  tdodamt: number; // Nợ vay cầm cố tiền gửi
  depofeeamt: number; // Phí lưu ký đến hạn
  depofeeamtacr: number; // Phí lưu ký cộng dồn
  netassval: number; // Tài sản thực có (Tiền tại BMSC + Tổng giá trị chứng khoán - Phải trả)
  cibalance2: number; // Tiền mặt thực có + Tiền hold
  mrcrlimit: number; // HM đảm bảo
  bankavlbal: number; // Số dư khả dụng NH
  totalodamt2: number; // Nợ phải trả
  mrcrlimitmax: number; // HM vay tối đa
  advanceline: number; // Hạn mức bảo lãnh
  bankinqirydt: string; // Thời gian truy vấn cuối
  holdbalance: number; // Số tiền hold
  cash_receiving_t1: number; // Tiền chờ về T1
  avlwithdraw: number; // Số tiền rút trên sức mua
  callamt: number; // Số tiền call
  cash_receiving_t2: number; // Tiền chờ về T2
  cash_receiving_t3: number; // Tiền chờ về T3
  careceiving: number; // Quyền chờ về
  pp: number; // Sức mua cơ bản
  marginrate: number; // Tỷ lệ margin
  afstatus: string; // Trạng thái tiểu khoản
  add_to_mrcrate: number; // Dự tính p/v trong ngày
  add_to_mrirate: number; // Dự tính p/m trong ngày
  se_to_mrcrate: number; // Dự tính thoát HM trong ngày
  se_to_mrirate: number; // Dự tính thoát M trong ngày
  se_to_mrcrateub: number; // Dự tính thoát HM trên giá trị trong ngày
  se_to_mrirateub: number; // Dự tính thoát M trên giá trị trong ngày
  baldefovd: number; // Số tiền được rút
  buyqtty: number; // Giá trị mua
  margin_execbuyamt: number; // Dự tính p/v trong ngày
  rptmrirate: number; // Tỷ lệ an toàn
  rptmrmrate: number; // Tỷ lệ duy trì
  rptmrlrate: number; // Tỷ lệ xử lý
  rptmrcrate: number; // Tỷ lệ thoát call
  rptmrwrate: number; // Tỷ lệ cảnh báo
  addvnd: number; // Số tiền nộp thêm
  receivingamt: number; // Số tiền bán chờ về
  addamount: number; // Số tiền nộp thêm
  addamounti: number; // Số tiền nộp thêm (lãi)
  bamt: number; // Giá trị mua
  dclamtlimit: number; // HM đảm bảo
  clamtlimit: number; // HM phải trả
  afstatus_en: string; // Trạng thái tiểu khoản tiếng anh
}

export interface AccountAvailTrade {
  ppse: number; // Sức mua cơ bản (khi chưa nhập mã CK)
  maxqtty: number; // Số lượng mua tối đa
  trade: number; // Số lượng GD
  mrratioloan: string; // Tỷ lệ vay MR
  pp0: number; // Sức mua (khi đã nhập mã CK)
  balance: number; // Tiền mặt thực có
  cash_pending_send: number; // Tiền chờ thanh toán
  mortgage: number; // Thế chấp
  marginrate: number; // Tỷ lệ thực tế
}
