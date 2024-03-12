import { LoginResponse } from "@src/constraints/interface/services/response";
import { useMutation } from "@tanstack/react-query";
import apiUrls from "@/src/services/apiUrls";
import Cookies from "js-cookie";
import axiosInst from "../Interceptors";
interface UseLogin {
  onLogin: (data: {
    u: string;
    p: string;
    t: number;
    captchaToken: string;
  }) => void;
  isError: boolean;
  isSuccess: boolean;
}
const handleLogin = async (data: {
  u: string;
  p: string;
  t: number;
  captchaToken: string;
}): Promise<LoginResponse> => {
  try {
    //fix me
    // const validateCaptcha = await axios.post(
    //   process.env.NEXT_PUBLIC_RECAPTCHA_VERIFY_URL as string,
    //   {
    //     secret: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    //     response: data.captchaToken,
    //   }
    // );
    // console.log("validateCaptcha", validateCaptcha.data);
    const res = await axiosInst.post(apiUrls.login, {
      data: { u: data.u, p: data.p },
    });
    console.log("res", res);
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

const handleLoginSuccess = (data: LoginResponse) => {
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
  } = useMutation({
    mutationFn: handleLogin,
    onSuccess: handleLoginSuccess,
    onError: handleLoginError,
  });

  return { onLogin, isError, isSuccess };
};
