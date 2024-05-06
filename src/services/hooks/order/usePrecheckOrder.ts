import { useMutation } from "@tanstack/react-query";
import { genOrderUrl } from "@/src/services/apiUrls";
import { PrecheckOrderReq } from "@/src/constraints/interface/services/request";
import axiosInst from "../../Interceptors";
import { PreCheckData } from "@/src/constraints/interface/market";
interface UsePrecheckOrder {
  onPrecheckOrder: (data: PrecheckOrderReq) => void;
  isError: boolean;
  isSuccess: boolean;
  error: unknown;
  data: PreCheckData | undefined;
}

const handlePrecheckOrder = async (
  data: PrecheckOrderReq
): Promise<PreCheckData> => {
  try {
    const res = await axiosInst.post(
      genOrderUrl(data.accountId, "precheckOrder"),
      data
    );
    const { s, ec, d } = res.data;
    if (s !== "ok") throw new Error(ec);
    return d;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const usePrecheckOrder = (): UsePrecheckOrder => {
  const {
    mutate: onPrecheckOrder,
    isError,
    isSuccess,
    data,
    error,
  } = useMutation({
    mutationFn: handlePrecheckOrder,
  });

  return { onPrecheckOrder, isError, isSuccess, error, data };
};
