import { CustomerInfo } from "@src/constraints/interface/services/response";
import { useMutation } from "@tanstack/react-query";
import apiUrls from "@/src/services/apiUrls";
import axiosInst from "../Interceptors";
import { useAppDispatch } from "@src/redux/hooks";
import { setCustomerInfo } from "@src/redux/features/userSlice";
interface UseGetAuthorityInfo {
  onGetAuthorityInfo: () => void;
  isError: boolean;
  isSuccess: boolean;
}
const handleGetAuthorityInfo = async (): Promise<CustomerInfo> => {
  try {
    const res = await axiosInst.get(apiUrls.getAuthorityInfo);
    const { d, s, ec } = res.data;
    if (s === "ok") {
      return d;
    }
    throw new Error(ec);
  } catch (e) {
    throw e;
  }
};

const handleSuccess = (data: CustomerInfo, dispatch: any) => {
  dispatch(setCustomerInfo(data));
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
    onSuccess: (data: CustomerInfo) => handleSuccess(data, dispatch),
    onError: handleError,
  });

  return { onGetAuthorityInfo, isError, isSuccess };
};
