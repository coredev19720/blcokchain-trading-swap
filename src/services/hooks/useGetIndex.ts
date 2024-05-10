import { useQuery } from "@tanstack/react-query";
import { getIndexesUrl } from "@/src/services/apiUrls";
import axiosInst from "../Interceptors";
import { IndexRTData } from "@/src/constraints/interface/market";
interface UseGetIndex {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  data: IndexRTData[] | undefined;
  refetch: () => void;
}
const onGetData = async (indexes: string[]): Promise<IndexRTData[]> => {
  const promiseArr = indexes.map((index) => {
    const url = getIndexesUrl(index);
    return axiosInst.get(url);
  });
  return Promise.all(promiseArr)
    .then((values) => {
      const data: IndexRTData[] = values.map((value) => {
        const {
          indexChange,
          indexPercentChange,
          marketCode,
          marketIndex,
          totalValue,
        } = value.data.d[0];
        return {
          MC: marketCode ?? "",
          MI: marketIndex ?? 0,
          ICH: indexChange ?? 0,
          IPC: indexPercentChange ?? 0,
          TVS: totalValue ?? 0,
        };
      });
      const result: IndexRTData[] = [];
      indexes.forEach((index) => {
        const indexData = data.find((d) => d.MC === index);
        if (indexData) {
          result.push(indexData);
        }
      });
      return result;
    })
    .catch((e) => {
      throw e;
    });
};

export const useGetIndexes = (indexes: string[]): UseGetIndex => {
  const { refetch, isError, isSuccess, isLoading, data } = useQuery({
    queryKey: [
      "get-translogs",
      {
        symbol: indexes.join(","),
      },
    ],
    queryFn: () => onGetData(indexes),
    enabled: !!indexes.length,
  });

  return { isError, isSuccess, refetch, data, isLoading };
};
