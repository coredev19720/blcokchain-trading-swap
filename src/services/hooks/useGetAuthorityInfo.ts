import { GetAuthorInfoRes } from "@src/constraints/interface/services/response";
import { useQuery } from "@tanstack/react-query";
import apiUrls from "@/src/services/apiUrls";
import axiosInst from "../Interceptors";
import { useAppDispatch } from "@src/redux/hooks";
import { setAuthorInfo } from "@src/redux/features/userSlice";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
interface UseGetAuthorityInfo {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  refetch: () => void;
}
const handleGetData = async (
  dispatch: Dispatch<UnknownAction>
): Promise<GetAuthorInfoRes> => {
  try {
    const res = await axiosInst.get(apiUrls.getAuthorityInfo);
    const { d, s, ec } = res.data;
    if (s === "ok") {
      dispatch(setAuthorInfo(d));
      return res.data;
    }
    throw new Error(ec);
  } catch (e) {
    throw e;
  }
};

export const useGetAuthorityInfo = (): UseGetAuthorityInfo => {
  const dispatch = useAppDispatch();
  const { isError, isSuccess, isLoading, refetch } = useQuery({
    queryKey: ["authority-info"],
    queryFn: () => handleGetData(dispatch),
    enabled: false,
  });

  return { isError, isSuccess, isLoading, refetch };
};
