import { GetPortfolioRes } from "@src/constraints/interface/services/response";
import { useQuery } from "@tanstack/react-query";
import { genAccountServiceUrl } from "@/src/services/apiUrls";
import axiosInst from "../Interceptors";
import { useAppDispatch } from "@src/redux/hooks";
import { setPorts } from "@/src/redux/features/marketSlice";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { PortItem } from "@/src/constraints/interface/common";

interface UseGetPortfolio {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  refetch: () => void;
  data: PortItem[] | undefined;
}
const handleGetData = async (
  accountId: string,
  dispatch: Dispatch<UnknownAction>
): Promise<PortItem[]> => {
  try {
    const res = await axiosInst.get(
      genAccountServiceUrl(accountId, "securitiesPortfolio")
    );
    const { s, ec, d } = res.data;
    if (s === "ok") {
      // dispatch(setPorts(d));
      return d;
    }
    throw new Error(ec);
  } catch (e) {
    throw e;
  }
};
export const useGetPortfolio = (accountId: string): UseGetPortfolio => {
  const dispatch = useAppDispatch();
  const { data, isError, isSuccess, isLoading, refetch } = useQuery({
    queryKey: [`get-portfolio-${accountId}`],
    queryFn: () => handleGetData(accountId, dispatch),
    enabled: !!accountId,
  });

  return { data, isError, isSuccess, isLoading, refetch };
};
