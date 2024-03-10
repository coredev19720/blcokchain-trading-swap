import { TPwdType } from "../../enum/common";

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
