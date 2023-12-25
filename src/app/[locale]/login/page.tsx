import Layout from "@/src/components/common/Layout";
import Login from "@/src/components/container/Login";

const LoginPage = () => {
  return (
    <Layout loading={false}>
      <Login />
    </Layout>
  );
};

export default LoginPage;
