import { useQuery } from "@tanstack/react-query";
import apiUrls from "@/src/services/apiUrls";
import axiosInst from "../Interceptors";
import { AccVerifyInfo } from "@/src/constraints/interface/account";
import { useAppDispatch } from "@/src/redux/hooks";
import { setVerifyInfo } from "@/src/redux/features/userSlice";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
interface UseGetVerifyInfo {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  refetch: () => void;
  data: AccVerifyInfo | undefined;
}
const onGetData = async (
  dispatch: Dispatch<UnknownAction>
): Promise<AccVerifyInfo> => {
  try {
    const url = apiUrls.getVerify;
    const res = await axiosInst.get(url);
    const { s, d, ec } = res.data;
    if (s === "ok") {
      const data: AccVerifyInfo = {
        username: d.username,
        isVerified: d.isVerified,
      };
      dispatch(setVerifyInfo(data));
      return d;
    }
    throw new Error(ec);
  } catch (e) {
    throw e;
  }
};

export const useGetVerifyInfo = (): UseGetVerifyInfo => {
  const dispatch = useAppDispatch();
  const { refetch, isError, isSuccess, isLoading, data } = useQuery({
    queryKey: ["get-verify-info"],
    queryFn: () => onGetData(dispatch),
    staleTime: 0,
  });

  return { isError, isSuccess, refetch, isLoading, data };
};
