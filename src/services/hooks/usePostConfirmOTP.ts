import { useMutation } from "@tanstack/react-query";
import apiUrls from "@/src/services/apiUrls";
import { ConfirmOTPRequest } from "@/src/constraints/interface/services/request";
import { BaseResponse } from "@/src/constraints/interface/services/response";
import axiosInst from "../Interceptors";
interface UsePostConfirmOTP {
  onConfirmOTP: (data: ConfirmOTPRequest) => void;
  isError: boolean;
  isSuccess: boolean;
  error: unknown;
}

//unimplemented
const handleConfirmOTP = async (
  data: ConfirmOTPRequest
): Promise<BaseResponse> => {
  try {
    const res = await axiosInst.post(apiUrls.forgotPwd, data);
    const { s, ec } = res.data;
    if (s !== "ok") throw new Error(ec);
    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const usePostConfirmOTP = (): UsePostConfirmOTP => {
  const {
    mutate: onConfirmOTP,
    isError,
    isSuccess,
    data,
    error,
  } = useMutation({
    mutationFn: handleConfirmOTP,
  });

  return { onConfirmOTP, isError, isSuccess, error };
};
