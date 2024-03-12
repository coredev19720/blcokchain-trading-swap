import { GetWaitMatchedOrdersResponse } from "@src/constraints/interface/services/response";
import { useMutation } from "@tanstack/react-query";
import { genAccountServiceUrl } from "@/src/services/apiUrls";
import axiosInst from "../Interceptors";
import { useAppDispatch } from "@src/redux/hooks";
interface UseGetWaitMatchedOrders {
  onGetWaitMatchedOrders: (accountId: string) => void;
  isError: boolean;
  isSuccess: boolean;
}
const handleGetData = async (
  accountId: string
): Promise<GetWaitMatchedOrdersResponse> => {
  try {
    const res = await axiosInst.get(
      genAccountServiceUrl(accountId, "waitMatchedOrder")
    );
    const { d } = res.data;
    return d;
  } catch (e) {
    throw e;
  }
};

const handleSuccess = (data: GetWaitMatchedOrdersResponse, dispatch: any) => {
  console.log(data);
  // dispatch(setOrders(data.d));
};

const handleError = (error: unknown) => {
  console.log("error", error);
};
export const useGetWaitMatchedOrders = (): UseGetWaitMatchedOrders => {
  const dispatch = useAppDispatch();
  const {
    mutate: onGetWaitMatchedOrders,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: handleGetData,
    onSuccess: (data: GetWaitMatchedOrdersResponse) =>
      handleSuccess(data, dispatch),
    onError: handleError,
  });

  return { onGetWaitMatchedOrders, isError, isSuccess };
};
