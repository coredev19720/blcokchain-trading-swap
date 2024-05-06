import {
  GetAccountsRes,
  GetAuthorInfoRes,
  GetStocksRes,
  GetAccPermissionRes,
} from "@src/constraints/interface/services/response";
import { useQuery } from "@tanstack/react-query";
import apiUrls from "@/src/services/apiUrls";
import axiosInst from "../Interceptors";
import { useDispatch } from "react-redux";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import {
  setAccounts,
  setActiveAccount,
  setAuthorInfo,
  setPermissions,
} from "@/src/redux/features/userSlice";
import { setStocks } from "@/src/redux/features/marketSlice";
interface UseFetchInitData {
  isError: boolean;
  isSuccess: boolean;
  refetch: () => void;
  isLoading: boolean;
  data: any;
}
const handleGetData = async (
  dispatch: Dispatch<UnknownAction>
): Promise<any> => {
  const accPromise = axiosInst.get(apiUrls.getAcounts);
  const authoInfoPromise = axiosInst.get(apiUrls.getAuthorityInfo);
  const instrumentPromise = axiosInst.get(apiUrls.getInstruments);
  const permissionPromise = axiosInst.get(apiUrls.getPermissionInfo);
  return Promise.all([
    accPromise,
    authoInfoPromise,
    instrumentPromise,
    permissionPromise,
  ])
    .then((values) => {
      const accRes: GetAccountsRes = values[0].data;
      const authInfo: GetAuthorInfoRes = values[1].data;
      const stocks: GetStocksRes = values[2].data;
      const permissions: GetAccPermissionRes = values[3].data;
      const { d: accounts } = accRes;
      dispatch(setAccounts(accounts));
      dispatch(setAuthorInfo(authInfo.d));
      dispatch(
        setStocks(
          stocks.d.map((stock) => ({
            symbol: stock.symbol,
            FullName: stock.FullName,
          }))
        )
      );
      dispatch(setPermissions(permissions.d?.accounts));
      // dispatch(setActiveAccount(accounts[0]));
      return values;
    })
    .catch((e) => {
      throw e;
    });
};

export const useFetchInitData = (): UseFetchInitData => {
  const dispatch = useDispatch();
  const { refetch, isError, isSuccess, isLoading, data } = useQuery({
    queryKey: ["fectch-init-data"],
    queryFn: () => handleGetData(dispatch),
    enabled: false,
  });

  return { isError, isSuccess, refetch, isLoading, data };
};
