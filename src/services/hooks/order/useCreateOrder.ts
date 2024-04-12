import { useMutation } from "@tanstack/react-query";
import { genOrderUrl } from "@/src/services/apiUrls";
import { CreateOrderReq } from "@/src/constraints/interface/services/request";
import { CreateOrderRes } from "@/src/constraints/interface/services/response";
import axiosInst from "../../Interceptors";
interface UseCreateOrder {
  onCreateOrder: (data: CreateOrderReq) => void;
  isError: boolean;
  isSuccess: boolean;
  error: unknown;
}

const handleCreateOrder = async (
  data: CreateOrderReq
): Promise<CreateOrderRes> => {
  try {
    const res = await axiosInst.post(
      genOrderUrl(data.accountId, "orders"),
      data
    );
    const { s, ec } = res.data;
    if (s !== "ok") throw new Error(ec);
    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const useCreateOrder = (): UseCreateOrder => {
  const {
    mutate: onCreateOrder,
    isError,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: handleCreateOrder,
  });

  return { onCreateOrder, isError, isSuccess, error };
};
