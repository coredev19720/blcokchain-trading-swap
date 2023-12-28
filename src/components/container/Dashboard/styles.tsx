import { styled } from "@mui/system";

export const Wrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  height: "100%",
  gap: 16,
}));

export const HelpLinkWraper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: theme.spacing(2, 4),
}));
