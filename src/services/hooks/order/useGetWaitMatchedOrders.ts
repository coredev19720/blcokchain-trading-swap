import { GetWaitMatchedOrdersRes } from "@src/constraints/interface/services/response";
import { useQuery } from "@tanstack/react-query";
import { genAccountServiceUrl } from "@/src/services/apiUrls";
import axiosInst from "../../Interceptors";
import { useAppDispatch } from "@src/redux/hooks";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
interface UseGetWaitMatchedOrders {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  refetch: () => void;
}
const handleGetData = async (
  accountId: string,
  dispatch: Dispatch<UnknownAction>
): Promise<GetWaitMatchedOrdersRes> => {
  try {
    const res = await axiosInst.get(
      genAccountServiceUrl(accountId, "waitMatchedOrder")
    );
    const { s, ec, d } = res.data;
    if (s === "ok") {
      //unimplemented
      return res.data;
    }
    throw new Error(ec);
  } catch (e) {
    throw e;
  }
};

export const useGetWaitMatchedOrders = (
  accountId: string
): UseGetWaitMatchedOrders => {
  const dispatch = useAppDispatch();
  const { isError, isSuccess, isLoading, refetch } = useQuery({
    queryKey: ["get-matched-orders", accountId],
    queryFn: () => handleGetData(accountId, dispatch),
    enabled: !!accountId,
  });

  return { isError, isSuccess, isLoading, refetch };
};
