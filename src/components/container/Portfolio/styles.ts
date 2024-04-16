import { FormControlLabel, Switch } from "@mui/material";
import { styled } from "@mui/system";

export const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));
export const Content = styled("div")(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4),
  alignItems: "flex-end",
  flex: 1,
  overflow: "auto",
}));
export const OrderList = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  flex: 1,
}));

export const TogglePrice = styled(FormControlLabel)(({ theme }) => ({
  flexDirection: "row-reverse",
  marginRight: 0,
  "& .MuiFormControlLabel-label": {
    marginRight: 32,
    marginLeft: 0,
  },
}));
export const PriceSwitch = styled(Switch)(({ theme }) => ({}));
