import { useQuery } from "@tanstack/react-query";
import apiUrls from "@/src/services/apiUrls";
import axiosInst from "../Interceptors";
import { useAppDispatch } from "@src/redux/hooks";
import { setStocks } from "@/src/redux/features/marketSlice";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { GetStocksRes } from "@/src/constraints/interface/services/response";

//not use
interface UseGetInstruments {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  refetch: () => void;
}
const handleGetData = async (
  dispatch: Dispatch<UnknownAction>
): Promise<GetStocksRes> => {
  try {
    const res = await axiosInst.get(apiUrls.getInstruments);
    const { d, s, ec } = res.data;
    if (s === "ok") {
      dispatch(setStocks(d));
      return res.data;
    }
    throw new Error(ec);
  } catch (e) {
    throw e;
  }
};
export const useGetInstruments = (): UseGetInstruments => {
  const dispatch = useAppDispatch();
  const { isError, isSuccess, isLoading, refetch } = useQuery({
    queryKey: ["instruments"],
    queryFn: () => handleGetData(dispatch),
    enabled: false,
  });

  return { refetch, isLoading, isError, isSuccess };
};
