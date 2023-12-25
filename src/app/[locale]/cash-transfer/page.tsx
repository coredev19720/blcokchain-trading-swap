import Layout from "@/src/components/common/Layout";
import CashTransfer from "@/src/components/container/CashTransfer";

const LoginPage = () => {
  return (
    <Layout loading={false}>
      <CashTransfer />
    </Layout>
  );
};

export default LoginPage;
