import { Typography } from "@mui/material";
import { Wrapper } from "./styles";
import LoginForm from "./comonents/LoginForm";
const Content = () => {
  const handleLogin = () => {
    console.log("login");
  };
  return (
    <Wrapper>
      <Typography>Đăng nhập</Typography>
      <LoginForm onSubmit={handleLogin} />
    </Wrapper>
  );
};
export default Content;
