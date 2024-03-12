import { AccAvailTradeRes } from "@src/constraints/interface/services/response";
import { useMutation } from "@tanstack/react-query";
import { genAccountServiceUrl } from "@/src/services/apiUrls";
import axiosInst from "../Interceptors";
import { useAppDispatch } from "@src/redux/hooks";
import { setAccountAvailTrade } from "@src/redux/features/userSlice";

interface UseGetAvailTrade {
  onGetAvailTrade: (accountId: string) => void;
  isError: boolean;
  isSuccess: boolean;
}
const handleGetData = async (accountId: string): Promise<AccAvailTradeRes> => {
  try {
    const res = await axiosInst.get(
      genAccountServiceUrl(accountId, "availableTrade")
    );
    return res.data;
  } catch (e) {
    throw e;
  }
};

const handleSuccess = (data: AccAvailTradeRes, dispatch: any) => {
  dispatch(setAccountAvailTrade(data.d));
};

const handleError = (error: unknown) => {
  console.log("error", error);
};
export const useGetAvailTrade = (): UseGetAvailTrade => {
  const dispatch = useAppDispatch();
  const {
    mutate: onGetAvailTrade,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: handleGetData,
    onSuccess: (data: AccAvailTradeRes) => handleSuccess(data, dispatch),
    onError: handleError,
  });

  return { onGetAvailTrade, isError, isSuccess };
};
