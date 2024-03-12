import { GetPortfolioRes } from "@src/constraints/interface/services/response";
import { useQuery } from "@tanstack/react-query";
import { genAccountServiceUrl } from "@/src/services/apiUrls";
import axiosInst from "../Interceptors";
import { useAppDispatch } from "@src/redux/hooks";
import { setPorts } from "@/src/redux/features/marketSlice";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

interface UseGetPortfolio {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  refetch: () => void;
}
const handleGetData = async (
  accountId: string,
  dispatch: Dispatch<UnknownAction>
): Promise<GetPortfolioRes> => {
  try {
    const res = await axiosInst.get(
      genAccountServiceUrl(accountId, "securitiesPortfolio")
    );
    const { s, ec, d } = res.data;
    if (s === "ok") {
      dispatch(setPorts(d));
    }
    throw new Error(ec);
  } catch (e) {
    throw e;
  }
};
export const useGetPortfolio = (accountId: string): UseGetPortfolio => {
  const dispatch = useAppDispatch();
  const { isError, isSuccess, isLoading, refetch } = useQuery({
    queryKey: ["get-portfolios", accountId],
    queryFn: () => handleGetData(accountId, dispatch),
    enabled: !!accountId,
  });

  return { isError, isSuccess, isLoading, refetch };
};
