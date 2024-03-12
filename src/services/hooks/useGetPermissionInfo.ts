import { GetAccPermissionRes } from "@src/constraints/interface/services/response";
import { useMutation } from "@tanstack/react-query";
import apiUrls from "@/src/services/apiUrls";
import axiosInst from "../Interceptors";
import { useAppDispatch } from "@src/redux/hooks";
import { setPermissions } from "@src/redux/features/userSlice";
interface UseGetPermissionInfo {
  onGetPermission: () => void;
  isError: boolean;
  isSuccess: boolean;
}
const handleGetPermission = async (): Promise<GetAccPermissionRes> => {
  try {
    const res = await axiosInst.get(apiUrls.getPermissionInfo);
    const { accounts } = res.data;
    return accounts;
  } catch (e) {
    throw e;
  }
};

const handleSuccess = (data: GetAccPermissionRes, dispatch: any) => {
  dispatch(setPermissions(data.d.accounts));
};

const handleError = (error: unknown) => {
  console.log("error", error);
};
export const useGetPermissionInfo = (): UseGetPermissionInfo => {
  const dispatch = useAppDispatch();
  const {
    mutate: onGetPermission,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: handleGetPermission,
    onSuccess: (data: GetAccPermissionRes) => handleSuccess(data, dispatch),
    onError: handleError,
  });

  return { onGetPermission, isError, isSuccess };
};
