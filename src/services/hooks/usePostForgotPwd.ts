import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import apiUrls from "@/src/services/apiUrls";
import { ChangePasswordRequest } from "@/src/constraints/interface/services/request";
import { BaseResponse } from "@/src/constraints/interface/services/response";
interface UseLogin {
  onChangePwd: (data: ChangePasswordRequest) => void;
  isError: boolean;
  isSuccess: boolean;
}

const handleChangePwd = async (
  data: ChangePasswordRequest
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
