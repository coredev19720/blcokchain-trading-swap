import { styled } from "@mui/system";
export const DealWrapper = styled("div")(() => ({
  display: "flex",
  gap: 8,
  height: 211,
}));
export const BestDeal = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  width: "calc(50% - 4px)",
  minWidth: "calc(50% - 4px)",
}));
export const HistoryDeals = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  width: "calc(50% - 4px)",
  minWidth: "calc(50% - 4px)",
}));
export const Wrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  overflow: "auto",
  flex: 1,
}));
export const InforSection = styled("div")(({ theme }) => ({
  flex: 1,
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: theme.spacing(0, 4),
}));
