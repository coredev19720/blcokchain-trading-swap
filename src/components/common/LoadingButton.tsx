import { Button, CircularProgress } from "@mui/material";

type Props = {
  text: string;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
  variant?: "text" | "outlined" | "contained";
  loading?: boolean;
  fullWidth?: boolean;
};
const LoadingButton = ({
  text,
  onClick,
  size,
  variant,
  loading,
  fullWidth,
}: Props) => {
  return (
    <Button
      fullWidth={fullWidth}
      variant={variant ?? "contained"}
      onClick={onClick}
      size={size ?? "medium"}
      disabled={loading}
    >
      {loading ? <CircularProgress style={{ color: "inherit" }} /> : text}
    </Button>
  );
};

export default LoadingButton;
