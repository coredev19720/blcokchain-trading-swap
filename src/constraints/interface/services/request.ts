import { TOrderType, TPinAuthType, TPwdType, TSide } from "../../enum/common";

export interface LoginRequest {
  grant_type: string;
  client_id: string;
  client_secret: string;
  username: string;
  password: string;
}

export interface ForgotPasswordRequest {
  username: string;
  phone: string;
  fullname: string;
  idcode: string;
  iddate: string;
  dateofbirth: string;
}

export interface ChangePasswordRequest {
  pwtType: TPwdType;
  oldPassword: string;
  password: string;
}

//demo fix me
export interface ConfirmOTPRequest {
  username: string;
  otp: string;
}

//demo fix me
export interface CreatePwdRequest {
  pwd: string;
  confirmPwd: string;
}

export interface CreateOrderReq {
  accountId: string; // Mã tài khoản
  requestId: string; // Mã yêu cầu là một chuỗi ngẫu nhiên
  instrument: string; // Mã chứng khoán
  qty: number; // Khối lượng
  side: TSide; // Mua/Bán - 'buy' or 'sell'
  type: "limit" | "market"; // 'limit': Lệnh LO, 'market':Lệnh thị trường ATO, ATC,...
  limitPrice?: number; // Giá
  splitval?: string; // Khối lượng chẻ
  tokenid: string; // Tokeninfo lấy từ hàm 3.9
  transactionId: string; // Mã giao dịch lấy từ hàm 3.9
  code: string; // Mã xác thực 2 l
}

export interface PrecheckOrderReq {
  accountId: string;
  instrument: string; // Mã chứng khoán
  qty: number; // Khối lượng
  side: string; // Mua/Bán - 'buy' or 'sell' // fix me
  type: "limit" | "market"; // 'limit': Lệnh LO, 'market':Lệnh thị trường ATO, ATC,...
  limitPrice?: number; // Giá
  authtype?: TPinAuthType; // Loại xác thực, tra cứu bảng 3.5.3
}

export interface UpdateOrderReq {
  accountId: string;
  orderId: string;
  limitPrice?: number; // Giá
  tokenid: string; // Tokeninfo lấy từ hàm 3.9
  transactionId: string; // Mã giao dịch lấy từ hàm 3.9
  qty: number; // Khối lượng
  code: string; // mã xác thực 2 lớp.
}

export interface CancelOrderReq {
  accountId: string;
  orderId: string;
  tokenid: string; // Tokeninfo lấy từ hàm 3.9
  transactionId: string; // Mã giao dịch lấy từ hàm 3.9
  code: string; // mã xác thực 2 lớp.
}
