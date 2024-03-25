import { LoginRes } from "@src/constraints/interface/services/response";
import { useMutation } from "@tanstack/react-query";
import apiUrls from "@/src/services/apiUrls";
import Cookies from "js-cookie";
import axiosInst from "../Interceptors";
import axios from "axios";
interface UseLogin {
  onLogin: (data: {
    u: string;
    p: string;
    t: number;
    captchaToken: string;
  }) => void;
  isError: boolean;
  isSuccess: boolean;
  isPending: boolean;
}
const handleLogin = async (data: {
  u: string;
  p: string;
  t: number;
  captchaToken: string;
}): Promise<LoginRes> => {
  try {
    const res = await axiosInst.post(apiUrls.login, {
      data: { u: data.u, p: data.p, c: data.captchaToken },
    });
    if (res.data.access_token) {
      window.localStorage.setItem(
        process.env.NEXT_PUBLIC_IDLE_STO_NAME || "idle_time",
        data.t.toString()
      );
      return res.data;
    }
    throw new Error(res.data.ec);
  } catch (e) {
    throw e;
  }
};

const handleLoginSuccess = (data: LoginRes) => {
  if (data.access_token) {
    Cookies.set(
      process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME as string,
      data.access_token,
      {
        expires: data.expires_in,
        path: "/",
      }
    );
    Cookies.set(
      process.env.NEXT_PUBLIC_REFRESH_TOKEN_COOKIE_NAME as string,
      data.refresh_token,
      {
        expires: data.expires_in,
        path: "/",
      }
    );
  }
  if (!data.access_token) {
    console.log("error", data);
  }
};

const handleLoginError = (error: unknown) => {
  console.log("error", error);
};
export const useLogin = (): UseLogin => {
  const {
    mutate: onLogin,
    isError,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: handleLogin,
    onSuccess: handleLoginSuccess,
    onError: handleLoginError,
  });

  return { onLogin, isError, isSuccess, isPending };
};
