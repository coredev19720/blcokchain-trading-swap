const baseUrl = process.env.NEXT_PUBLIC_AP_URL;
const apiUrls = {
  login: `${process.env.NEXT_PUBLIC_ROOT_URL}/api/login`,
  forgotPwd: `${baseUrl}/sso/genResetPass`,
  changePwd: `${baseUrl}/tran/changePass`,
};
export default apiUrls;
