import axios, { InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import apiUrls from "./apiUrls";
import { TAuthType } from "../constraints/enum/common";
const axiosInst = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const reqFullfiled = (config: InternalAxiosRequestConfig) => {
  // Do something before request is sent
  const token = Cookies.get(
    process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME as string
  );
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
    config.headers["x-via"] = "K";
    config.headers["x-lang"] = "vi";
    // config.headers["Access-Control-Allow-Origin"] = "*";
  }
  return config;
};

const reqRejected = (error: any) => {
  return Promise.reject(error);
};

const resFullfiled = (res: any) => {
  return res;
};
const resRejected = async (error: any) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    // Refresh token logic
    try {
      const refreshToken = Cookies.get(
        process.env.NEXT_PUBLIC_REFRESH_TOKEN_COOKIE_NAME as string
      );
      const response = await axios.post(apiUrls.refresh, {
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        refresh_token: refreshToken,
        grant_type: TAuthType.refresh_token,
      });
      if (!response.data.access_token || !response.data.refresh_token) {
        throw new Error("Invalid token response");
      }
      Cookies.set(
        process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME as string,
        response.data.access_token,
        {
          expires: response.data.expires_in,
          path: "/",
        }
      );
      Cookies.set(
        process.env.NEXT_PUBLIC_REFRESH_TOKEN_COOKIE_NAME as string,
        response.data.refresh_token,
        {
          expires: response.data.expires_in,
          path: "/",
        }
      );
      return axiosInst(originalRequest);
    } catch (error) {
      // Clear tokens and log out the user
      Cookies.remove(process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME as string);
      Cookies.remove(
        process.env.NEXT_PUBLIC_REFRESH_TOKEN_COOKIE_NAME as string
      );
      window.location.href = "login";
    }
  }
  // Return error if it's not related to token refresh
  return Promise.reject(error);
};

// Request interceptor
axiosInst.interceptors.request.use(reqFullfiled, reqRejected);

// Response interceptor
axiosInst.interceptors.response.use(resFullfiled, resRejected);

export default axiosInst;
