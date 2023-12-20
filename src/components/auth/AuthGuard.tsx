import { useRouter } from "next/router";
import { Dispatch, ReactNode } from "react";
import { ReactChild, useEffect, useState } from "react";
import Cookies from "universal-cookie";
interface IProps {
  children: React.ReactElement;
}
function AuthGuard({ children }: IProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const cookies = new Cookies();

  useEffect(() => {
    authCheck(router.asPath);
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);
    router.events.on("routeChangeComplete", authCheck);
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

  function authCheck(url: string) {
    const publicPaths = ["login"];
    const path = url.split("?")[0].split("/")[1];
    if (
      publicPaths.includes(path) ||
      (process.env.ACCESS_TOKEN_COOKIE &&
        cookies.get(process.env.ACCESS_TOKEN_COOKIE))
    ) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
      router.push({
        pathname: "/login",
        query: { returnUrl: router.asPath },
      });
    }
  }

  return authorized && children;
}

export default AuthGuard;
