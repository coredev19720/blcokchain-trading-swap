import { styled } from "@mui/system";

export const Wrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

export const ContentWrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  flex: 1,
}));

export const HelpLinkWraper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  padding: theme.spacing(2, 4),
}));
export const ButtonWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 4),
  marginBottom: theme.spacing(4),
  width: "100%",
}));
