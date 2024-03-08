import { useMutation } from "@tanstack/react-query";
import apiUrls from "@/src/services/apiUrls";
import { ChangePasswordRequest } from "@/src/constraints/interface/services/request";
import { BaseResponse } from "@/src/constraints/interface/services/response";
import axiosInst from "../Interceptors";
interface UseLogin {
  onChangePwd: (data: ChangePasswordRequest) => void;
  isError: boolean;
  isSuccess: boolean;
}

const handleChangePwd = async (
  data: ChangePasswordRequest
): Promise<BaseResponse> => {
  try {
    const res = await axiosInst.post(apiUrls.changePwd, data);
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const usePostChangePwd = (): UseLogin => {
  const {
    mutate: onChangePwd,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: handleChangePwd,
  });

  return { onChangePwd, isError, isSuccess };
};
