import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import apiUrls from "@/src/services/apiUrls";
import Cookies from "js-cookie";
import { ForgotPasswordRequest } from "@/src/constraints/interface/services/request";
import { BaseResponse } from "@/src/constraints/interface/services/response";
interface UseLogin {
  onForgotPwd: (data: ForgotPasswordRequest) => void;
  isError: boolean;
  isSuccess: boolean;
}
const handleForgotPwd = async (
  data: ForgotPasswordRequest
): Promise<BaseResponse> => {
  try {
    const res = await axios.post(apiUrls.login, data);
    if (res.data.access_token) {
      return res.data;
    }
    throw new Error(res.data.ec);
  } catch (e) {
    throw e;
  }
};

export const usePostForgotPwd = (): UseLogin => {
  const {
    mutate: onForgotPwd,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: handleForgotPwd,
  });

  return { onForgotPwd, isError, isSuccess };
};
