import { GetAccountsRes } from "@src/constraints/interface/services/response";
import { useQuery } from "@tanstack/react-query";
import apiUrls from "@/src/services/apiUrls";
import axiosInst from "../Interceptors";
interface UseGetAccounts {
  isError: boolean;
  isSuccess: boolean;
  refetch: () => void;
  isLoading: boolean;
  data: GetAccountsRes | undefined;
}
const handleGetData = async (): Promise<GetAccountsRes> => {
  try {
    const res = await axiosInst.get(apiUrls.getAcounts);
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const useGetAccounts = (): UseGetAccounts => {
  const { refetch, isError, isSuccess, isLoading, data } = useQuery({
    queryKey: ["get-accounts"],
    queryFn: handleGetData,
    enabled: false,
  });

  return { isError, isSuccess, refetch, isLoading, data };
};
