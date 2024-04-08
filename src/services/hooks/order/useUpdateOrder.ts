import { useMutation } from "@tanstack/react-query";
import { genOrderUrl } from "@/src/services/apiUrls";
import { UpdateOrderReq } from "@/src/constraints/interface/services/request";
import { PrecheckOrderRes } from "@/src/constraints/interface/services/response";
import axiosInst from "../../Interceptors";
interface UseUpdateOrder {
  onUpdateOrder: (data: UpdateOrderReq) => void;
  isError: boolean;
  isSuccess: boolean;
  error: unknown;
  data: PrecheckOrderRes | undefined;
}

const handleUpdateOrder = async (
  data: UpdateOrderReq
): Promise<PrecheckOrderRes> => {
  try {
    const res = await axiosInst.post(
      genOrderUrl(data.accountId, "precheckOrder"),
      data
    );
    const { s, ec } = res.data;
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
