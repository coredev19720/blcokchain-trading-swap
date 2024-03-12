import { GetOrdersRes } from "@src/constraints/interface/services/response";
import { useMutation, useQuery } from "@tanstack/react-query";
import { genAccountServiceUrl } from "@/src/services/apiUrls";
import axiosInst from "../Interceptors";
import { useAppDispatch } from "@src/redux/hooks";
import { setOrders } from "@/src/redux/features/marketSlice";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
interface UseGetOrders {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  refetch: () => void;
}
const handleGetData = async (
  accountId: string,
  dispatch: Dispatch<UnknownAction>
): Promise<GetOrdersRes> => {
  try {
    const res = await axiosInst.get(genAccountServiceUrl(accountId, "order"));
    const { s, ec, d } = res.data;
    if (s === "ok") {
      dispatch(setOrders(d));
      return res.data;
    }
    throw new Error(ec);
  } catch (e) {
    throw e;
  }
};

export const useGetOrders = (accountId: string): UseGetOrders => {
  const dispatch = useAppDispatch();
  const { isError, isSuccess, isLoading, refetch } = useQuery({
    queryKey: ["orders", accountId],
    queryFn: () => handleGetData(accountId, dispatch),
    enabled: !!accountId,
  });

  return { isError, isSuccess, isLoading, refetch };
};
