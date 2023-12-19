import { Button } from "@mui/material";
import { styled } from "@mui/system";

export const Wrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(2, 4),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const BackButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
}));
