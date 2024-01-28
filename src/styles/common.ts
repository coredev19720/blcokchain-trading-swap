import { styled } from "@mui/system";
import colors from "../themes/colors";

export const PageWrapper = styled("div")(({ theme }) => ({
  maxWidth: 600,
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
}));

export const MainContent = styled("div")(({ theme }) => ({
  flex: 1,
  maxHeight: "calc(100% - 60px)",
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

export const FlexContent = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  gap: 8,
}));

export const SlideLine = styled("div")(({ theme }) => ({
  width: "100%",
  height: 12,
  position: "relative",
  "&::before": {
    position: "absolute",
    content: '""',
    width: 36,
    height: 4,
    borderRadius: 4,
    backgroundColor:
      theme.palette.mode === "dark" ? colors.p100 : colors.neutral1,
    left: "50%",
    transform: "translateX(-50%)",
    top: 12,
  },
}));
export const FieldBlock = styled("div")(() => ({
  display: "flex",
  gap: 4,
  flexDirection: "column",
}));
