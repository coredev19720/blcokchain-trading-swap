import { styled } from "@mui/system";
import { Warning, Error, Info, CheckCircle } from "@mui/icons-material";
import { Typography } from "@mui/material";
import colors from "@/src/themes/colors";
interface Props {
  type: "warning" | "error" | "info" | "success";
  message: string;
}
const genIconColor = (type: string) => {
  return colors.sy60;
  switch (type) {
    case "warning":
      // return colors.sy70;
      return colors.p300;
    case "error":
      return colors.sr60;
    case "success":
      return colors.sg70;
    default:
      return colors.sb60;
  }
};

const genBgColor = (type: string) => {
  return "rgba(255, 249, 235, 0.5)";
  switch (type) {
    case "warning":
      return colors.sy40;
    case "error":
      return colors.sr40;
    case "success":
      return colors.sg40;
    default:
      return colors.sb40;
  }
};
const genBorderColor = () => {
  return colors.sy60;
};

const genTextColor = () => {
  return colors.mn70;
};

const Wrapper = styled("div")<Props>(({ theme, type }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  color: genTextColor(),
  background: genBgColor(type),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  border: `1px solid ${genBorderColor()}`,
}));
const NotiContent = ({ type, message }: Props) => {
  const Icon = () => {
    switch (type) {
      case "warning":
        return <Warning color="warning" />;
      case "error":
        return <Error color="error" />;
      case "success":
        return <CheckCircle color="success" />;
      default:
        return <Info color="info" />;
    }
  };

  return (
    <Wrapper type={type} message={message}>
      <Icon />
      <Typography variant="body2" color="inherit">
        {message}
      </Typography>
    </Wrapper>
  );
};
export default NotiContent;
