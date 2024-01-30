import { styled } from "@mui/system";
import Image from "next/image";

export const Wrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  gap: 16,
}));
export const Content = styled("div")(({ theme }) => ({}));
export const StepWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  gap: theme.spacing(4),
  padding: theme.spacing(4),
}));

export const FieldBlock = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

export const SuccessContent = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(4),
}));

export const SuccessIcon = styled(Image)(({ theme }) => ({}));
