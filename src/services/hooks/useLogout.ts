import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import apiUrls from "@/src/services/apiUrls";
import Cookies from "js-cookie";
interface UseLogout {
  onLogout: () => void;
  isError: boolean;
  isSuccess: boolean;
}
const handleLogout = async () => {
  //unimplement
  try {
    // const res = await axios.post(apiUrls.login, {
    //   data: { u: data.u, p: data.p },
    // });
    // if (res.data.access_token) {
    //   return res.data;
    // }
    throw new Error("unimplement");
  } catch (e) {
    throw e;
  } finally {
    Cookies.remove(process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME as string);
    Cookies.remove(process.env.NEXT_PUBLIC_REFRESH_TOKEN_COOKIE_NAME as string);
  }
};
export const useLogout = (): UseLogout => {
  const {
    mutate: onLogout,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: handleLogout,
  });

  return { onLogout, isError, isSuccess };
};
