import Layout from "@/app/components/common/Layout";
import Dashboard from "@/app/components/container/Dashboard";

const DashboardPage = (props: any) => {
  return (
    <Layout loading={false}>
      <Dashboard {...props} />
    </Layout>
  );
};

export async function getServerSideProps(context: any) {
  const { query } = context;
  return {
    props: {
      query,
    },
  };
}

export default DashboardPage;
