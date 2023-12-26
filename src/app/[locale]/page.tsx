import Layout from "@/src/components/common/Layout";
import Dashboard from "@/src/components/container/Dashboard";

const DashboardPage = () => {
  return (
    <Layout loading={false}>
      <Dashboard />
    </Layout>
  );
};

export default DashboardPage;
