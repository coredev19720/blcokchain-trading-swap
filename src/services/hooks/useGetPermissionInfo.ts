import { AccountsPermissions } from "@src/constraints/interface/services/response";
import { useMutation } from "@tanstack/react-query";
import apiUrls from "@/src/services/apiUrls";
import axiosInst from "../Interceptors";
import { useAppDispatch } from "@src/redux/hooks";
import { setPermission } from "@src/redux/features/userSlice";
interface UseGetPermissionInfo {
  onGetPermission: () => void;
  isError: boolean;
  isSuccess: boolean;
}
const handleGetPermission = async (): Promise<AccountsPermissions[]> => {
  try {
    const res = await axiosInst.get(apiUrls.getPermissionInfo);
    const { accounts } = res.data;
    console.log(" res.data", res.data);
    return accounts;
  } catch (e) {
    throw e;
  }
};

const handleSuccess = (data: AccountsPermissions[], dispatch: any) => {
  dispatch(setPermission(data));
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
    onSuccess: (data: AccountsPermissions[]) => handleSuccess(data, dispatch),
    onError: handleError,
  });

  return { onGetPermission, isError, isSuccess };
};
