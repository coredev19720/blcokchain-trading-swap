import { styled } from "@mui/system";

export const Wrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(4),
  gap: 16,
  display: "flex",
  flexDirection: "column",
}));
