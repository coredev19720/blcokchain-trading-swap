import { useQuery } from "@tanstack/react-query";
import { getTranslogsUrl } from "@/src/services/apiUrls";
import axiosInst from "../Interceptors";
import { GetAccountsRes } from "@src/constraints/interface/services/response";
import { GetTransLogsReq } from "@/src/constraints/interface/services/request";
interface UseGetTranslogs {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  data: GetAccountsRes | undefined;
  refetch: () => void;
}
const onGetData = async (data: GetTransLogsReq): Promise<GetAccountsRes> => {
  try {
    const { symbol, ...rest } = data;
    const url = getTranslogsUrl(symbol);
    const res = await axiosInst.get(url, {
      params: rest,
    });
    return res.data;
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
