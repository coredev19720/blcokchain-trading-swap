import dynamic from "next/dynamic";
import { styled } from "@mui/system";
import colors from "@/app/themes/colors";
import { ReactElement } from "react";
const Loading = dynamic(() => import("@/app/components/common/Loading"));

interface Props {
  children: ReactElement;
  loading: boolean;
}

const Wrapper = styled("main")(({ theme }) => ({
  height: "100vh",
  width: "100vw",
  background: theme.palette.mode === "light" ? colors.ln20 : colors.dn50,
  display: "flex",
  flexDirection: "column",
}));

const Layout = (props: Props) => {
  const { children, loading } = props;

  return (
    <>
      {loading && <Loading />}
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default Layout;
