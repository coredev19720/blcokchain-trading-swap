import { useQuery } from "@tanstack/react-query";
import { getIndexesUrl } from "@/src/services/apiUrls";
import axiosInst from "../Interceptors";
import { IndexRTData } from "@/src/constraints/interface/market";
interface UseGetIndex {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  refetch: () => void;
}
const onGetData = async (indexes: string[]) => {
  const promiseArr = indexes.map((index) => {
    const url = getIndexesUrl(index);
    return axiosInst.get(url);
  });
  return Promise.all(promiseArr)
    .then((values) => {
      const data = values.map((value) => value.data.d);
      console.log(data);
    })
    .catch((e) => {
      throw e;
    });
};

export const useGetIndexes = (indexes: string[]): UseGetIndex => {
  const { refetch, isError, isSuccess, isLoading } = useQuery({
    queryKey: [
      "get-translogs",
      {
        symbol: indexes.join(","),
      },
    ],
    queryFn: () => onGetData(indexes),
    enabled: !!indexes.length,
  });

  return { isError, isSuccess, refetch, isLoading };
};
