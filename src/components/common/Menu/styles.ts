import colors from "@/src/themes/colors";
import { styled } from "@mui/system";
import Image from "next/image";

export const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
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
}));

export const MenuImage = styled(Image)(() => ({}));
