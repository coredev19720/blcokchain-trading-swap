import { WaitMatchedOrd } from "@interface/market";
import { useQuery } from "@tanstack/react-query";
import { genAccountServiceUrl } from "@/src/services/apiUrls";
import axiosInst from "../../Interceptors";
interface UseGetWaitMatchedOrds {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  refetch: () => void;
  data?: WaitMatchedOrd[];
}
const handleGetData = async (accountId: string): Promise<WaitMatchedOrd[]> => {
  try {
    const res = await axiosInst.get(
      genAccountServiceUrl(accountId, "waitMatchedOrder")
    );
    const { s, ec, d } = res.data;
    if (s === "ok") {
      //unimplemented
      return d;
    }
    throw new Error(ec);
  } catch (e) {
    throw e;
  }
};

export const useGetWaitMatchedOrders = (
  accountId: string
): UseGetWaitMatchedOrds => {
  const { isError, isSuccess, isLoading, refetch, data } = useQuery({
    queryKey: ["wait-matched-orders", accountId],
    queryFn: () => handleGetData(accountId),
    enabled: !!accountId,
  });

  return { isError, isSuccess, isLoading, refetch, data };
};
