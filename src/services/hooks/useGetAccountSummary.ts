import { GetAccSummaryRes } from "@src/constraints/interface/services/response";
import { useQuery } from "@tanstack/react-query";
import { genAccountServiceUrl } from "@/src/services/apiUrls";
import axiosInst from "../Interceptors";
import { useAppDispatch } from "@src/redux/hooks";
import { setAccountSummary } from "@src/redux/features/userSlice";
import { AccSummary } from "@/src/constraints/interface/account";
interface UseGetAccountSummary {
  refetch: () => void;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  data: AccSummary | undefined;
}
const handleGetData = async (
  accountId: string,
  dispatch: any
): Promise<AccSummary> => {
  try {
    const res = await axiosInst.get(
      genAccountServiceUrl(accountId, "summaryAccount")
    );
    const { d, s, ec } = res.data;
    if (s === "ok") {
      dispatch(
        setAccountSummary({
          id: accountId,
          ...res.data.d,
        })
      );
      return {
        id: accountId,
        ...res.data.d,
      };
    }
    throw new Error(ec);

    return res.data;
  } catch (e) {
    throw e;
  }
};

export const useGetAccountSummary = (
  accountId: string
): UseGetAccountSummary => {
  const dispatch = useAppDispatch();
  const { refetch, isError, isSuccess, isLoading, data } = useQuery({
    queryKey: [`account-summary-${accountId}`],
    queryFn: () => handleGetData(accountId, dispatch),
    enabled: !!accountId,
  });

  return { refetch, isError, isSuccess, isLoading, data };
};
