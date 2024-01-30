import { styled } from "@mui/system";

export const Wrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  gap: 16,
}));

export const Content = styled("div")(({ theme }) => ({}));
