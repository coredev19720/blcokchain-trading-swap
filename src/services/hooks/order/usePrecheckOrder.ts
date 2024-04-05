import { useMutation } from "@tanstack/react-query";
import { genOrderUrl } from "@/src/services/apiUrls";
import { PrecheckOrderReq } from "@/src/constraints/interface/services/request";
import { PrecheckOrderRes } from "@/src/constraints/interface/services/response";
import axiosInst from "../../Interceptors";
interface UsePrecheckOrder {
  onPrecheckOrder: (data: PrecheckOrderReq) => void;
  isError: boolean;
  isSuccess: boolean;
  error: unknown;
  data: PrecheckOrderRes | undefined;
}

const handlePrecheckOrder = async (
  data: PrecheckOrderReq
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
