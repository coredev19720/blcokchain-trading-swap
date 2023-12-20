import Layout from "@/src/components/common/Layout";
import Login from "@/src/components/container/Login";

const LoginPage = (props: any) => {
  return (
    <Layout loading={false}>
      <Login {...props} />
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

export default LoginPage;
