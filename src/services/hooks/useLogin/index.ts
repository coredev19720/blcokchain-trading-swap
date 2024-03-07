import { LoginResponse } from "@src/constraints/interface/services/response";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import apiUrls from "@/src/services/apiUrls";
interface UseLogin {
  onLogin: (data: { u: string; p: string }) => void;
}
const handleLogin = async (data: {
  u: string;
  p: string;
}): Promise<LoginResponse> => {
  try {
    const res = await axios.post(apiUrls.login, { data });
    return res.data;
  } catch (e) {
    throw e;
  }
};

const handleLoginSuccess = (data: LoginResponse) => {
  console.log(data);
};

const handleLoginError = (error: unknown) => {
  console.log(error);
};
export const useLogin = (): UseLogin => {
  const { mutate: onLogin } = useMutation({
    mutationFn: handleLogin,
    onSuccess: handleLoginSuccess,
    onError: handleLoginError,
  });

  return { onLogin };
};
