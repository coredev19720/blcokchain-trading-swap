"use client";
import { styled } from "@mui/system";
import colors from "@/src/themes/colors";
import { ReactNode } from "react";
import { PageWrapper, MainContent } from "@/src/styles/common";
import { ToastContainer } from "react-toastify";
import Menu from "./Menu";
import { publicUrls } from "@/src/constants/routes";
import { usePathname, useParams } from "next/navigation";
const Wrapper = styled("main")(({ theme }) => ({
  height: "100%",
  width: "100%",
  overflow: "hidden",
  background: theme.palette.mode === "light" ? colors.p300 : colors.dn50,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const params = useParams();
  let isPublic = publicUrls.some((x) => `/${params?.locale}/${x}` === pathname);

  return (
    <Wrapper>
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
        theme="light"
      />
    </Wrapper>
  );
}
