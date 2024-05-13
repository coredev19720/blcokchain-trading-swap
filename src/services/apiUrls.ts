const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const apiUrls = {
  refresh: `${baseUrl}/sso/oauth/token`,
  login: `${process.env.NEXT_PUBLIC_ROOT_URL}/api/login`,
  logout: `${baseUrl}/sso/logoutClient`,
  forgotPwd: `${baseUrl}/sso/genResetPass`,
  changePwd: `${baseUrl}/tran/changePass`,
  genTwoFactor: `${baseUrl}/tran/genTwoFactorAuth`,
  getPermissionInfo: `${baseUrl}/sso/info/getPermissionInfo`,
  getAuthorityInfo: `${baseUrl}/inq/authorityInfo`,
  getInstruments: `${baseUrl}/datafeed/instruments`,
  getAcounts: `${baseUrl}/accounts`,
  setCurrentAcc: `${baseUrl}/sso/info/setCurrentAccount`,
  getVerify: `${baseUrl}/sso/api/info`,
};
export const genOrderUrl = (accountId: string, path: string) =>
  `${baseUrl}/accounts/${accountId}/${path}`;
export const genAccountServiceUrl = (accountId: string, path: string) =>
  `${baseUrl}/inq/accounts/${accountId}/${path}`;

export const genInstrumentUrl = (symbol: string) => {
  return `${apiUrls.getInstruments}?symbols=${symbol}`;
};
export const getTranslogsUrl = (symbol: string) => {
  return `${baseUrl}/datafeed/translogsnaps/${symbol}`;
};
export const getIndexesUrl = (index: string) => {
  return `${baseUrl}/datafeed/indexsnaps/${index}`;
};
export default apiUrls;
