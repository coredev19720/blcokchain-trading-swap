import { GetAccPermissionRes } from "@src/constraints/interface/services/response";
import { useMutation, useQuery } from "@tanstack/react-query";
import apiUrls from "@/src/services/apiUrls";
import axiosInst from "../Interceptors";
import { useAppDispatch } from "@src/redux/hooks";
import { setPermissions } from "@src/redux/features/userSlice";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

interface UseGetPermissionInfo {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  refetch: () => void;
}
const handleGetData = async (
  dispatch: Dispatch<UnknownAction>
): Promise<GetAccPermissionRes> => {
  try {
    const res = await axiosInst.get(apiUrls.getPermissionInfo);
    const { s, ec, d } = res.data;
    if (s === "ok") {
      dispatch(setPermissions(d));
    }
    throw new Error(ec);
  } catch (e) {
    throw e;
  }
};

export const useGetPermissionInfo = (): UseGetPermissionInfo => {
  const dispatch = useAppDispatch();
  const { isError, isSuccess, isLoading, refetch } = useQuery({
    queryKey: ["get-permissions"],
    queryFn: () => handleGetData(dispatch),
  });

  return { isError, isSuccess, isLoading, refetch };
};
