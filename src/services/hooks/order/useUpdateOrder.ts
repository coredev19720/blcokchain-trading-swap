import { useMutation } from "@tanstack/react-query";
import { genOrderUrl } from "@/src/services/apiUrls";
import { UpdateOrderReq } from "@/src/constraints/interface/services/request";
import { UpdateOrderRes } from "@/src/constraints/interface/services/response";
import axiosInst from "../../Interceptors";
interface UseUpdateOrder {
  onUpdateOrder: (data: UpdateOrderReq) => void;
  isError: boolean;
  isSuccess: boolean;
  error: unknown;
  data: UpdateOrderRes | undefined;
}

const handleUpdateOrder = async (
  data: UpdateOrderReq
): Promise<UpdateOrderRes> => {
  try {
    const { accountId, orderId, ...rest } = data;
    const res = await axiosInst.put(
      genOrderUrl(data.accountId, `orders/${data.orderId}`),
      { data: rest }
    );
    const { s, ec, d } = res.data;
    if (s !== "ok") throw new Error(ec);
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const useUpdateOrder = (): UseUpdateOrder => {
  const {
    mutate: onUpdateOrder,
    isError,
    isSuccess,
    data,
    error,
  } = useMutation({
    mutationFn: handleUpdateOrder,
  });

  return { onUpdateOrder, isError, isSuccess, error, data };
};
