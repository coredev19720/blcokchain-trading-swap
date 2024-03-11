import { useMutation } from "@tanstack/react-query";
import apiUrls from "@/src/services/apiUrls";
import Cookies from "js-cookie";
import axiosInst from "../Interceptors";
interface UseLogout {
  onLogout: () => void;
  isError: boolean;
  isSuccess: boolean;
}
const handleLogout = async () => {
  //unimplement
  try {
    const res = await axiosInst.delete(apiUrls.logout);
    if (res.status !== 204) {
      throw new Error("Failed to logout");
    }
    return res.data;
  } catch (e) {
    throw e;
  } finally {
    Cookies.remove(process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME as string);
    Cookies.remove(process.env.NEXT_PUBLIC_REFRESH_TOKEN_COOKIE_NAME as string);
    const locale = Cookies.get("NEXT_LOCALE");
    console.log(locale);
    window.location.href = `/${locale}/login`;
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
