import { useMutation } from "@tanstack/react-query";
import apiUrls from "@/src/services/apiUrls";
import { GenTwoFactorReq } from "@/src/constraints/interface/services/request";
import { GenTwoFactorRes } from "@/src/constraints/interface/services/response";
import axiosInst from "../Interceptors";
interface UseGenTwoFactorAuth {
  onGenTwoFactor: (data: GenTwoFactorReq) => void;
  isError: boolean;
  isSuccess: boolean;
  error: unknown;
  data: GenTwoFactorRes | undefined;
}

//unimplemented
const onGenTwoFactorAuth = async (
  data: GenTwoFactorReq
): Promise<GenTwoFactorRes> => {
  try {
    const res = await axiosInst.post(apiUrls.genTwoFactor, data);
    const { s, ec } = res.data;
    if (s !== "ok") throw new Error(ec);
    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const useGenTwoFactorAuth = (): UseGenTwoFactorAuth => {
  const {
    mutate: onGenTwoFactor,
    isError,
    isSuccess,
    data,
    error,
  } = useMutation({
    mutationFn: onGenTwoFactorAuth,
  });

  return { onGenTwoFactor, isError, isSuccess, error, data };
};
