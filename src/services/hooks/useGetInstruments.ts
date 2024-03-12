import { Stock } from "@src/constraints/interface/market";
import { useMutation } from "@tanstack/react-query";
import apiUrls from "@/src/services/apiUrls";
import axiosInst from "../Interceptors";
import { useAppDispatch } from "@src/redux/hooks";
import { setStocks } from "@/src/redux/features/marketSlice";
interface UseGetInstruments {
  onGetInstruments: () => void;
  isError: boolean;
  isSuccess: boolean;
}
const handleGetData = async (): Promise<Stock[]> => {
  try {
    const res = await axiosInst.get(apiUrls.getInstruments);
    const { d, s, ec } = res.data;
    if (s === "ok") {
      return d;
    }
    throw new Error(ec);
  } catch (e) {
    throw e;
  }
};

const handleSuccess = (data: Stock[], dispatch: any) => {
  dispatch(setStocks(data));
};

const handleError = (error: unknown) => {
  console.log("error", error);
};
export const useGetInstruments = (): UseGetInstruments => {
  const dispatch = useAppDispatch();
  const {
    mutate: onGetInstruments,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: handleGetData,
    onSuccess: (data: Stock[]) => handleSuccess(data, dispatch),
    onError: handleError,
  });

  return { onGetInstruments, isError, isSuccess };
};
