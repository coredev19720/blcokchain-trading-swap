import { useMutation } from "@tanstack/react-query";
import apiUrls from "@/src/services/apiUrls";
import { SetCurrentAccReq } from "@/src/constraints/interface/services/request";
import { SetCurrentAccRes } from "@/src/constraints/interface/services/response";
import axiosInst from "../Interceptors";
interface UseSetCurrentAcc {
  onSetCurrentAcc: (data: SetCurrentAccReq) => void;
  isError: boolean;
  isSuccess: boolean;
  error: unknown;
  data: SetCurrentAccRes | undefined;
}

//unimplemented
const onSetCurrentAccount = async (
  data: SetCurrentAccReq
): Promise<SetCurrentAccRes> => {
  try {
    const res = await axiosInst.post(apiUrls.setCurrentAcc, data);
    const { s, ec } = res.data;
    if (s !== "ok") throw new Error(ec);
    return res.data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const useSetCurrentAcc = (): UseSetCurrentAcc => {
  const {
    mutate: onSetCurrentAcc,
    isError,
    isSuccess,
    data,
    error,
  } = useMutation({
    mutationFn: onSetCurrentAccount,
  });

  return { onSetCurrentAcc, isError, isSuccess, error, data };
};
