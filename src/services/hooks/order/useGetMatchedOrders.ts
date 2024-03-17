import { useQuery } from "@tanstack/react-query";
import { genAccountServiceUrl } from "@/src/services/apiUrls";
import axiosInst from "../../Interceptors";
import { MatchedOrd } from "@/src/constraints/interface/market";
interface UseGetMatchedOrds {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  refetch: () => void;
  data: MatchedOrd[] | undefined;
}
const handleGetData = async (accountId: string): Promise<MatchedOrd[]> => {
  try {
    const res = await axiosInst.get(
      genAccountServiceUrl(accountId, "matchedOrder")
    );
    const { s, ec, d } = res.data;
    if (s === "ok") {
      return d;
    }
    throw new Error(ec);
  } catch (e) {
    throw e;
  }
};

export const useGetMatchedOrds = (accountId: string): UseGetMatchedOrds => {
  const { isError, isSuccess, isLoading, refetch, data } = useQuery({
    queryKey: ["matched-orders", accountId],
    queryFn: () => handleGetData(accountId),
    enabled: !!accountId,
  });

  return { isError, isSuccess, isLoading, refetch, data };
};
