"use client";
import Content from "./components/Content";
import Header from "@components/container/Login/Header";
import { Wrapper } from "./styles";
const Login = () => {
  return (
    <Wrapper>
      <Header />
      <Content />
    </Wrapper>
  );
};
export default Login;
