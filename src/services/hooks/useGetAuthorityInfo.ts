import { GetAuthorInfoRes } from "@src/constraints/interface/services/response";
import { useMutation } from "@tanstack/react-query";
import apiUrls from "@/src/services/apiUrls";
import axiosInst from "../Interceptors";
import { useAppDispatch } from "@src/redux/hooks";
import { setAuthorInfo } from "@src/redux/features/userSlice";
interface UseGetAuthorityInfo {
  onGetAuthorityInfo: () => void;
  isError: boolean;
  isSuccess: boolean;
}
const handleGetAuthorityInfo = async (): Promise<GetAuthorInfoRes> => {
  try {
    const res = await axiosInst.get(apiUrls.getAuthorityInfo);
    const { d, s, ec } = res.data;
    if (s === "ok") {
      return res.data;
    }
    throw new Error(ec);
  } catch (e) {
    throw e;
  }
};

const handleSuccess = (data: GetAuthorInfoRes, dispatch: any) => {
  dispatch(setAuthorInfo(data.d));
};

const handleError = (error: unknown) => {
  console.log("error", error);
};
export const useGetAuthorityInfo = (): UseGetAuthorityInfo => {
  const dispatch = useAppDispatch();
  const {
    mutate: onGetAuthorityInfo,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: handleGetAuthorityInfo,
    onSuccess: (data: GetAuthorInfoRes) => handleSuccess(data, dispatch),
    onError: handleError,
  });

  return { onGetAuthorityInfo, isError, isSuccess };
};
