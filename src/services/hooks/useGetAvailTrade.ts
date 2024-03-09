import { AccountAvailTrade } from "@src/constraints/interface/services/response";
import { useMutation } from "@tanstack/react-query";
import { getAccountSummaryUrl, getAvailTradeUrl } from "@/src/services/apiUrls";
import axiosInst from "../Interceptors";
import { useAppDispatch } from "@src/redux/hooks";
import { setAccountAvailTrade } from "@src/redux/features/userSlice";

interface UseGetAvailTrade {
  onGetAvailTrade: (accountId: string) => void;
  isError: boolean;
  isSuccess: boolean;
}
const handleGetData = async (accountId: string): Promise<AccountAvailTrade> => {
  try {
    const res = await axiosInst.get(getAvailTradeUrl(accountId));
    const { d } = res.data;
    return d;
  } catch (e) {
    throw e;
  }
};

const handleSuccess = (data: AccountAvailTrade, dispatch: any) => {
  dispatch(setAccountAvailTrade(data));
};

const handleError = (error: unknown) => {
  console.log("error", error);
};
export const useGetAvailTrade = (): UseGetAvailTrade => {
  const dispatch = useAppDispatch();
  const {
    mutate: onGetAvailTrade,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: handleGetData,
    onSuccess: (data: AccountAvailTrade) => handleSuccess(data, dispatch),
    onError: handleError,
  });

  return { onGetAvailTrade, isError, isSuccess };
};
