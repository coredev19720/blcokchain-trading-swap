import { useQuery } from "@tanstack/react-query";
import { getTranslogsUrl } from "@/src/services/apiUrls";
import axiosInst from "../Interceptors";
import { GetTransLogsReq } from "@/src/constraints/interface/services/request";
import { TranslogDataRes } from "@/src/constraints/interface/market";
interface UseGetTranslogs {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  data: TranslogDataRes | undefined;
  refetch: () => void;
}
const onGetData = async (data: GetTransLogsReq): Promise<TranslogDataRes> => {
  try {
    const { symbol, ...rest } = data;
    const url = getTranslogsUrl(symbol);
    const res = await axiosInst.get(url, {
      params: rest,
    });
    const { s, d, ec } = res.data;
    if (s === "ok") {
      return d;
    }
    throw new Error(ec);
  } catch (e) {
    throw e;
  }
};

export const useGetTranslogs = (params: GetTransLogsReq): UseGetTranslogs => {
  const { refetch, isError, isSuccess, isLoading, data } = useQuery({
    queryKey: ["get-translogs", params.symbol],
    queryFn: () => onGetData(params),
    enabled: !!params.symbol,
  });

  return { isError, isSuccess, refetch, isLoading, data };
};
