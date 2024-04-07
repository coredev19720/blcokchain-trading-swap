import { AccAvailTradeRes } from "@src/constraints/interface/services/response";
import { useQuery } from "@tanstack/react-query";
import { genAccountServiceUrl } from "@/src/services/apiUrls";
import axiosInst from "../Interceptors";
import { useAppDispatch } from "@src/redux/hooks";
import { TSide } from "@/src/constraints/enum/common";
import { AccAvailTrade } from "@/src/constraints/interface/account";

interface UseGetAvailTrade {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  refetch: () => void;
  data: AccAvailTrade | undefined;
}
const handleGetData = async (
  accountId: string,
  symbol: string,
  side: TSide,
  quotePrice: number
): Promise<AccAvailTrade> => {
  try {
    const res = await axiosInst.get(
      genAccountServiceUrl(accountId, "availableTrade"),
      {
        params: {
          symbol,
          side,
          quotePrice,
        },
      }
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

export const useGetAvailTrade = (
  accountId: string,
  symbol: string,
  side: TSide,
  quotePrice: number
): UseGetAvailTrade => {
  const dispatch = useAppDispatch();
  const { isError, isSuccess, refetch, isLoading, data } = useQuery({
    queryKey: ["avail-trade", accountId],
    queryFn: () => handleGetData(accountId, symbol, side, quotePrice),
    enabled: !!accountId && !!symbol && !!side && !!quotePrice,
  });

  return { refetch, isLoading, isError, isSuccess, data };
};
