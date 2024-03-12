import { GetPortfolioRes } from "@src/constraints/interface/services/response";
import { useMutation } from "@tanstack/react-query";
import { genAccountServiceUrl } from "@/src/services/apiUrls";
import axiosInst from "../Interceptors";
import { useAppDispatch } from "@src/redux/hooks";
import { setPorts } from "@/src/redux/features/marketSlice";
interface UseGetPortfolio {
  onGetPortfolio: (accountId: string) => void;
  isError: boolean;
  isSuccess: boolean;
}
const handleGetData = async (accountId: string): Promise<GetPortfolioRes> => {
  try {
    const res = await axiosInst.get(
      genAccountServiceUrl(accountId, "securitiesPortfolio")
    );
    return res.data;
  } catch (e) {
    throw e;
  }
};

const handleSuccess = (data: GetPortfolioRes, dispatch: any) => {
  dispatch(setPorts(data.d));
};

const handleError = (error: unknown) => {
  console.log("error", error);
};
export const useGetPortfolio = (): UseGetPortfolio => {
  const dispatch = useAppDispatch();
  const {
    mutate: onGetPortfolio,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: handleGetData,
    onSuccess: (data: GetPortfolioRes) => handleSuccess(data, dispatch),
    onError: handleError,
  });

  return { onGetPortfolio, isError, isSuccess };
};
