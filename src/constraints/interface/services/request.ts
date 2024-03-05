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

export interface PasswordChangeRequest {
  pwtType: string;
  oldPassword: string;
  password: string;
}