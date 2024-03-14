import { useMutation } from "@tanstack/react-query";
import apiUrls from "@/src/services/apiUrls";
import Cookies from "js-cookie";
import axiosInst from "../Interceptors";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
interface UseLogout {
  onLogout: () => void;
  isPending: boolean;
}
const handleLogout = async (router: AppRouterInstance) => {
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
    router.push("login");
  }
};
export const useLogout = (): UseLogout => {
  const router = useRouter();
  const { mutate: onLogout, isPending } = useMutation({
    mutationFn: () => handleLogout(router),
  });

  return { onLogout, isPending };
};
