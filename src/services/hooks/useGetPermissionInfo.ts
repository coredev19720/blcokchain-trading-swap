import {
  GetPermissionInfoResponse,
  LoginResponse,
} from "@src/constraints/interface/services/response";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import apiUrls from "@/src/services/apiUrls";
import Cookies from "js-cookie";
import { headerPrepare } from "../func";
interface UseGetPermissionInfo {
  onGetPermission: () => void;
  isError: boolean;
  isSuccess: boolean;
}
const handleGetPermission = async (): Promise<GetPermissionInfoResponse> => {
  try {
    const res = await axios.get(apiUrls.getPermissionInfo, headerPrepare());
    console.log(res.data);
    return res.data;
  } catch (e) {
    throw e;
  }
};

const handleSuccess = (data: GetPermissionInfoResponse) => {
  console.log(data);
};

const handleError = (error: unknown) => {
  console.log("error", error);
};
export const useGetPermissionInfo = (): UseGetPermissionInfo => {
  const {
    mutate: onGetPermission,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: handleGetPermission,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  return { onGetPermission, isError, isSuccess };
};
