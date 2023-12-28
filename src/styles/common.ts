import { styled } from "@mui/system";

export const PageWrapper = styled("div")(({ theme }) => ({
  maxWidth: 600,
  height: "100vh",
  width: "100%",
}));

export const RowContent = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: theme.spacing(2),
}));
