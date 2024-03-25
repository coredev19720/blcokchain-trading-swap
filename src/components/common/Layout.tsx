"use client";

import { styled } from "@mui/system";
import colors from "@src/themes/colors";
import { ReactNode, useState, useEffect, use } from "react";
import { PageWrapper, MainContent } from "@src/styles/common";
import { ToastContainer } from "react-toastify";
import Menu from "./Menu";
import { publicUrls } from "@src/constants/routes";
import { usePathname, useParams } from "next/navigation";
import { getInitColorSchemeScript } from "@mui/material/styles";
import { useColorScheme } from "@mui/material/styles";
const Wrapper = styled("main")(({ theme }) => {
  return {
    height: "100%",
    width: "100%",
    overflow: "hidden",
    background: theme.palette.common.background,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
});

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const params = useParams();
  let isPublic = publicUrls.some((x) => `/${params?.locale}/${x}` === pathname);
  const { mode } = useColorScheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <Wrapper>
      {getInitColorSchemeScript()}
      <PageWrapper>
        <MainContent>{children}</MainContent>
        {!isPublic && <Menu />}
      </PageWrapper>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
        theme={mode === "dark" ? "dark" : "light"}
      />
    </Wrapper>
  );
}
