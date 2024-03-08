import Cookies from "js-cookie";
export const headerPrepare = () => {
  const cookieToken = Cookies.get(
    process.env.NEXT_PUBLIC_TOKEN_COOKIE_NAME as string
  );
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookieToken}`,
    },
  };
};
