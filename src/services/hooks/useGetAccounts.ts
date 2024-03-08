import {
  AccountDetails,
  AccountInfo,
  AccountsResponse,
} from "@src/constraints/interface/services/response";
import { useMutation } from "@tanstack/react-query";
import apiUrls from "@/src/services/apiUrls";
import axiosInst from "../Interceptors";
import { useAppDispatch } from "@src/redux/hooks";
import { setAccounts, setActiveAccount } from "@src/redux/features/userSlice";
interface UseGetAccounts {
  onGetAccounts: () => void;
  isError: boolean;
  isSuccess: boolean;
}
const handleGetData = async (): Promise<AccountInfo[]> => {
  try {
    const res = await axiosInst.get(apiUrls.getAcounts);
    const { d } = res.data;
    return d;
  } catch (e) {
    throw e;
  }
};

const handleSuccess = (data: AccountInfo[], dispatch: any) => {
  dispatch(setAccounts(data));
  dispatch(setActiveAccount(data[0]));
};

const handleError = (error: unknown) => {
  console.log("error", error);
};
export const useGetAccounts = (): UseGetAccounts => {
  const dispatch = useAppDispatch();
  const {
    mutate: onGetAccounts,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: handleGetData,
    onSuccess: (data: AccountInfo[]) => handleSuccess(data, dispatch),
    onError: handleError,
  });

  return { onGetAccounts, isError, isSuccess };
};
