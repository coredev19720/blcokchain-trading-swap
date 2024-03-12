import {
  GetAccountsRes,
  GetAuthorInfoRes,
  GetInstrumentsRes,
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
      const accounts: GetAccountsRes = values[0].data;
      const authoInfo: GetAuthorInfoRes = values[1].data;
      const instruments: GetInstrumentsRes = values[2].data;
      const permissions: GetAccPermissionRes = values[3].data;
      dispatch(setAccounts(accounts.d));
      dispatch(setAuthorInfo(authoInfo.d));
      dispatch(setStocks(instruments.d));
      dispatch(setPermissions(permissions.d?.accounts));
      dispatch(setActiveAccount(accounts.d[0]));
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
