const baseUrl = process.env.NEXT_PUBLIC_AP_URL;
const apiUrls = {
  refresh: `${baseUrl}/sso/oauth/token`,
  login: `${process.env.NEXT_PUBLIC_ROOT_URL}/api/login`,
  forgotPwd: `${baseUrl}/sso/genResetPass`,
  changePwd: `${baseUrl}/tran/changePass`,
  getPermissionInfo: `${baseUrl}/sso/info/getPermissionInfo`,
  getAuthorityInfo: `${baseUrl}/inq/authorityInfo`,
  getInstruments: `${baseUrl}/datafeed/instruments`,
  getAcounts: `${baseUrl}/accounts`,
};

export const getAccountSummaryUrl = (accountId: string) =>
  `${baseUrl}/inq/accounts/${accountId}/summaryAccount`;

export const getAvailTradeUrl = (accountId: string) =>
  `${baseUrl}/inq/accounts/${accountId}/availableTrade`;

export default apiUrls;
