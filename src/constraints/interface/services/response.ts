export interface BaseResponse{
    s: string;
    errcode: string | number;
    errmsg: string;
    ec:string |number;
    em:string
}

export interface LoginResponse extends BaseResponse{
  access_token: string;
  refresh_token: string;
  expires_in: number;
  sessionID: string;
  token_type: string;
}