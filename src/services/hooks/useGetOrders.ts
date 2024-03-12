import { GetOrdersResponse } from "@src/constraints/interface/services/response";
import { useMutation } from "@tanstack/react-query";
import { genAccountServiceUrl } from "@/src/services/apiUrls";
import axiosInst from "../Interceptors";
import { useAppDispatch } from "@src/redux/hooks";
import { setOrders } from "@/src/redux/features/marketSlice";
interface UseGetOrders {
  onGetOrders: (accountId: string) => void;
  isError: boolean;
  isSuccess: boolean;
}
const handleGetData = async (accountId: string): Promise<GetOrdersResponse> => {
  try {
    const res = await axiosInst.get(genAccountServiceUrl(accountId, "order"));
    return res.data;
  } catch (e) {
    throw e;
  }
};

const handleSuccess = (data: GetOrdersResponse, dispatch: any) => {
  dispatch(setOrders(data.d));
};

const handleError = (error: unknown) => {
  console.log("error", error);
};
export const useGetOrders = (): UseGetOrders => {
  const dispatch = useAppDispatch();
  const {
    mutate: onGetOrders,
    data,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: handleGetData,
    onSuccess: (data: GetOrdersResponse) => handleSuccess(data, dispatch),
    onError: handleError,
  });

  return { onGetOrders, isError, isSuccess };
};
