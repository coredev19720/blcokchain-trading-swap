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

//Accounts info
export interface AccountsResponse {
  d: AccountInfo[];
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

export interface AccountsDetailsResponse extends BaseResponse {
  d: AccountDetails;
}
export interface AccountDetails {
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
