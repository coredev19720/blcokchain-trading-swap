import { useMutation } from "@tanstack/react-query";
import { genOrderUrl } from "@/src/services/apiUrls";
import { CancelOrderReq } from "@/src/constraints/interface/services/request";
import { CancelOrderRes } from "@/src/constraints/interface/services/response";
import axiosInst from "../../Interceptors";
interface UseCancelOrder {
  onCancelOrder: (data: CancelOrderReq) => void;
  isError: boolean;
  isSuccess: boolean;
  error: unknown;
}

const handleCancelOrder = async (
  data: CancelOrderReq
): Promise<CancelOrderRes> => {
  try {
    const { accountId, orderId, ...rest } = data;
    const res = await axiosInst.delete(
      genOrderUrl(data.accountId, `orders/${data.orderId}`),
      { data: rest }
    );
    const { s, ec } = res.data;
    if (s !== "ok") throw new Error(ec);
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const useCancelOrder = (): UseCancelOrder => {
  const {
    mutate: onCancelOrder,
    isError,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: handleCancelOrder,
  });

  return { onCancelOrder, isError, isSuccess, error };
};
