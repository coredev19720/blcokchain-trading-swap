"use client";
import dynamic from "next/dynamic";
import { styled } from "@mui/system";
import colors from "@/src/themes/colors";
import { ReactElement, ReactNode, useEffect } from "react";
import { PageWrapper, MainContent } from "@/src/styles/common";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";
import Menu from "./Menu";
const Loading = dynamic(() => import("@/src/components/common/Loading"));

const Wrapper = styled("main")(({ theme }) => ({
  height: "100vh",
  width: "100vw",
  overflow: "hidden",
  background: theme.palette.mode === "light" ? colors.p300 : colors.dn50,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Wrapper>
      <PageWrapper>
        <MainContent>{children}</MainContent>
        <Menu />
      </PageWrapper>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
        theme="light"
      />
    </Wrapper>
  );
}
