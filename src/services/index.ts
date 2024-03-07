import axios from "axios";

export const getAPILink = (path: string) => {
  if (!path) {
    throw new Error("Path is required");
  }
  return `${process.env.NEXT_PUBLIC_AP_URL}/${path}`;
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
