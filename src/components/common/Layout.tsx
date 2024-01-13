"use client";
import dynamic from "next/dynamic";
import { styled } from "@mui/system";
import colors from "@/src/themes/colors";
import { ReactElement, useEffect } from "react";
import { PageWrapper, MainContent } from "@/src/styles/common";
import { ToastContainer } from "react-toastify";
import Menu from "./Menu";
import Header from "./Header";
const Loading = dynamic(() => import("@/src/components/common/Loading"));

interface Props {
  children: ReactElement;
  loading: boolean;
}

const Wrapper = styled("main")(({ theme }) => ({
  height: "100vh",
  width: "100vw",
  overflow: "hidden",
  background: theme.palette.mode === "light" ? colors.p300 : colors.dn50,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const Layout = (props: Props) => {
  const { children, loading } = props;

  return (
    <Wrapper>
      <Header />
      <PageWrapper>
        <MainContent>{children}</MainContent>
        <Menu />
      </PageWrapper>
      {loading && <Loading />}
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
};

export default Layout;
