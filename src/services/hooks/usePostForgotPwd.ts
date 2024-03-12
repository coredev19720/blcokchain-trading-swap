import { useMutation } from "@tanstack/react-query";
import apiUrls from "@/src/services/apiUrls";
import { ForgotPasswordRequest } from "@/src/constraints/interface/services/request";
import { BaseRes } from "@/src/constraints/interface/services/response";
import axiosInst from "../Interceptors";
interface UsePortForgotPwd {
  onForgotPwd: (data: ForgotPasswordRequest) => void;
  isError: boolean;
  isSuccess: boolean;
  error: unknown;
}

const handleForgotPwd = async (
  data: ForgotPasswordRequest
): Promise<BaseRes> => {
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

export const usePostForgotPwd = (): UsePortForgotPwd => {
  const {
    mutate: onForgotPwd,
    isError,
    isSuccess,
    data,
    error,
  } = useMutation({
    mutationFn: handleForgotPwd,
  });

  return { onForgotPwd, isError, isSuccess, error };
};
