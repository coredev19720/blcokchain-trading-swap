"use client";
import dynamic from "next/dynamic";
import { styled } from "@mui/system";
import colors from "@/src/themes/colors";
import { ReactElement } from "react";
import { PageWrapper } from "@/src/styles/common";
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
      <PageWrapper>{children}</PageWrapper>
      {loading && <Loading />}
    </Wrapper>
  );
};

export default Layout;
