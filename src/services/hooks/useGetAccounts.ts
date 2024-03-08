import {
  AccountsResponse,
  GetPermissionInfoResponse,
  LoginResponse,
} from "@src/constraints/interface/services/response";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import apiUrls from "@/src/services/apiUrls";
import Cookies from "js-cookie";
import { headerPrepare } from "../func";
interface UseGetAccounts {
  onGetAccounts: () => void;
  isError: boolean;
  isSuccess: boolean;
}
const handleGetData = async (): Promise<AccountsResponse> => {
  try {
    const res = await axios.get(apiUrls.getPermissionInfo, headerPrepare());
    console.log(res.data);
    return res.data;
  } catch (e) {
    throw e;
  }
};

const handleSuccess = (data: AccountsResponse) => {
  console.log(data);
};

const handleError = (error: unknown) => {
  console.log("error", error);
};
export const useGetAccounts = (): UseGetAccounts => {
  const {
    mutate: onGetAccounts,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: handleGetData,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  return { onGetAccounts, isError, isSuccess };
};
