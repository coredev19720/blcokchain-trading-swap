import { AccountSummary } from "@src/constraints/interface/services/response";
import { useMutation } from "@tanstack/react-query";
import apiUrls, { genAccountServiceUrl } from "@/src/services/apiUrls";
import axiosInst from "../Interceptors";
import { useAppDispatch } from "@src/redux/hooks";
import { setAccountSummary } from "@src/redux/features/userSlice";
interface UseGetAccountSummary {
  onGetAccountSummary: (accountId: string) => void;
  isError: boolean;
  isSuccess: boolean;
}
const handleGetData = async (accountId: string): Promise<AccountSummary> => {
  try {
    const res = await axiosInst.get(
      genAccountServiceUrl(accountId, "summaryAccount")
    );
    const { d } = res.data;
    return d;
  } catch (e) {
    throw e;
  }
};

const handleSuccess = (data: AccountSummary, dispatch: any) => {
  dispatch(setAccountSummary(data));
};

const handleError = (error: unknown) => {
  console.log("error", error);
};
export const useGetAccountSummary = (): UseGetAccountSummary => {
  const dispatch = useAppDispatch();
  const {
    mutate: onGetAccountSummary,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: handleGetData,
    onSuccess: (data: AccountSummary) => handleSuccess(data, dispatch),
    onError: handleError,
  });

  return { onGetAccountSummary, isError, isSuccess };
};
