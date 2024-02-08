import localFont from "next/font/local";

export const sfpro = localFont({
  src: [
    {
      path: "./sf-pro-display-light.woff2",
      weight: "300",
    },
    {
      path: "./sf-pro-display-regular.woff2",
      weight: "400",
    },
    {
      path: "./sf-pro-display-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./sf-pro-display-semibold.woff2",
      weight: "500",
    },
    {
      path: "./sf-pro-display-bold.woff2",
      weight: "600",
    },
    {
      path: "./sf-pro-display-black.otf",
      weight: "900",
    },
  ],
  style: "normal",
  fallback: ["system-ui", "arial"],
});
