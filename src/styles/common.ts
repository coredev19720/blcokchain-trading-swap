import { styled } from "@mui/system";

export const PageWrapper = styled("div")(({ theme }) => ({
  maxWidth: 600,
  height: "100vh",
  width: "100%",
  display: "flex",
  flexDirection: "column",
}));

export const MainContent = styled("div")(({ theme }) => ({
  flex: 1,
  maxHeight: "calc(100vh - 117px)",
}));

export const RowContent = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: theme.spacing(2),
}));

export const ColContent = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));
