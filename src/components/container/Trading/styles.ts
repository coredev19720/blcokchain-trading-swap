import colors from "@/src/themes/colors";
import { styled } from "@mui/system";

export const Wrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  height: "100%",
}));

export const MainContent = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
}));
export const AccStatus = styled("div")(({ theme }) => ({
  display: "flex",
  gap: 16,
  padding: theme.spacing(0, 4),
}));

export const ButtonWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 4),
  paddingBottom: 16,
}));
