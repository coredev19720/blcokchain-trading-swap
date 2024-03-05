import colors from "@src/themes/colors";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import Image from "next/image";

export const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  background: colors.tintRest,
}));

export const MenuItem = styled("div")(({ theme }) => ({
  transition: "all 0.2s ease-in-out",
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: theme.spacing(2),
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  width: "20%",
  height: 60,
}));

export const MenuImage = styled(Image)(() => ({
  transition: "all 0.2s ease-in-out",
}));

export const MenuText = styled(Typography)(() => ({
  transition: "all 0.2s ease-in-out",
}));
