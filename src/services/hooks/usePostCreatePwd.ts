import { useMutation } from "@tanstack/react-query";
import apiUrls from "@/src/services/apiUrls";
import { CreatePwdRequest } from "@/src/constraints/interface/services/request";
import { BaseResponse } from "@/src/constraints/interface/services/response";
import axiosInst from "../Interceptors";

//unimplemented
interface UsePostCreatePwd {
  onCreatePwd: (data: CreatePwdRequest) => void;
  isError: boolean;
  isSuccess: boolean;
  error: unknown;
}

const handleCreatePwd = async (
  data: CreatePwdRequest
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

export const usePostCreatePwd = (): UsePostCreatePwd => {
  const {
    mutate: onCreatePwd,
    isError,
    isSuccess,
    data,
    error,
  } = useMutation({
    mutationFn: handleCreatePwd,
  });

  return { onCreatePwd, isError, isSuccess, error };
};
