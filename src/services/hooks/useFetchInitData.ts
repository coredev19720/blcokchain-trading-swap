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
      const authInfoRes: GetAuthorInfoRes = values[1].data;
      const stocksRes: GetStocksRes = values[2].data;
      const permissionsRes: GetAccPermissionRes = values[3].data;
      const { d: accounts } = accRes;
      const { d: authData } = authInfoRes;
      const { d: stocks } = stocksRes;
      const { d: permissions } = permissionsRes;
      accounts && dispatch(setAccounts(accounts));
      authData && dispatch(setAuthorInfo(authData));
      stocks &&
        dispatch(
          setStocks(
            stocks.map((stock) => ({
              symbol: stock.symbol,
              FullName: stock.FullName,
            }))
          )
        );
      permissions && dispatch(setPermissions(permissions.accounts));
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
