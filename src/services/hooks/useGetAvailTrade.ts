import { AccAvailTradeRes } from "@src/constraints/interface/services/response";
import { useMutation, useQuery } from "@tanstack/react-query";
import { genAccountServiceUrl } from "@/src/services/apiUrls";
import axiosInst from "../Interceptors";
import { useAppDispatch } from "@src/redux/hooks";
import { setAccountAvailTrade } from "@src/redux/features/userSlice";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

interface UseGetAvailTrade {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  refetch: () => void;
}
const handleGetData = async (
  accountId: string,
  dispatch: Dispatch<UnknownAction>
): Promise<AccAvailTradeRes> => {
  try {
    const res = await axiosInst.get(
      genAccountServiceUrl(accountId, "availableTrade")
    );
    const { s, ec, d } = res.data;
    if (s === "ok") {
      dispatch(setAccountAvailTrade(d));
      return res.data;
    }
    throw new Error(ec);
  } catch (e) {
    throw e;
  }
};

export const useGetAvailTrade = (accountId: string): UseGetAvailTrade => {
  const dispatch = useAppDispatch();
  const { isError, isSuccess, refetch, isLoading } = useQuery({
    queryKey: ["avail-trade", accountId],
    queryFn: () => handleGetData(accountId, dispatch),
    enabled: !!accountId,
  });

  return { refetch, isLoading, isError, isSuccess };
};
