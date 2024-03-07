import Cookies from "js-cookie";
export const headerPrepare = () => {
  const cookieToken = Cookies.get(process.env.NEXT_PUBLIC_TOKEN as string);
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookieToken}`,
    },
  };
};
