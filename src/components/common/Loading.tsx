import { CircularProgress } from "@mui/material";
import { styled } from "@mui/system";

const Wrapper = styled("div")({
  width: "100vw",
  height: "100vh",
  position: "fixed",
  top: 0,
  left: 0,
  background: "none",
  zIndex: 9999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
const Content = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  background:
    theme.palette.mode === "dark"
      ? "rgba(255,255,255,0.15)"
      : "rgba(0,0,0,0.15)",
  borderRadius: 999,
  height: 56,
  width: 56,
}));

const Loading = () => {
  return (
    <Wrapper>
      <Content>
        <CircularProgress color="primary" />
      </Content>
    </Wrapper>
  );
};

export default Loading;
