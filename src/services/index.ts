import axios from "axios";

export const getAPILink = (type: string, path: string) => {
  switch (type) {
    case "auth":
      return `${process.env.NEXT_PUBLIC_API_AUTH_SERVICE}/${path}`;
    default:
      return "";
  }
};

export const handleRestApi = async (options: any) => {
  const reqOptions = {
    headers: {
      "Cache-Control": "no-cache",
    },
    ...options,
  };
  return await axios(reqOptions)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
};
