const baseUrl = process.env.NEXT_PUBLIC_AP_URL;
const apiUrls = {
  refresh: `${baseUrl}/sso/oauth/token`,
  login: `${process.env.NEXT_PUBLIC_ROOT_URL}/api/login`,
  forgotPwd: `${baseUrl}/sso/genResetPass`,
  changePwd: `${baseUrl}/tran/changePass`,
  getPermissionInfo: `${baseUrl}/sso/info/getPermissionInfo`,
  getAcounts: `${baseUrl}/accounts`,
};
export default apiUrls;
