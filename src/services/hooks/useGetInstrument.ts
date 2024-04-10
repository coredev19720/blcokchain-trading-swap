import { useQuery } from "@tanstack/react-query";
import { genInstrumentUrl } from "@/src/services/apiUrls";
import axiosInst from "../Interceptors";
import { Instrument } from "@/src/constraints/interface/market";

//not use
interface UseGetInstrument {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  refetch: () => void;
  data: Instrument | undefined;
}
const handleGetData = async (symbol: string): Promise<Instrument> => {
  try {
    const res = await axiosInst.get(genInstrumentUrl(symbol));
    const { d, s, ec } = res.data;

    if (s === "ok" && d[0]) {
      return d[0];
    }
    throw new Error(ec);
  } catch (e) {
    throw e;
  }
};
export const useGetInstrument = (symbol: string): UseGetInstrument => {
  const { isError, isSuccess, isLoading, refetch, data } = useQuery({
    queryKey: ["instruments", symbol],
    queryFn: () => handleGetData(symbol),
    staleTime: 6000,
  });

  return { refetch, isLoading, isError, isSuccess, data };
};
