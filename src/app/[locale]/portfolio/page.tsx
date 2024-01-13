import Layout from "@/src/components/common/Layout";
import Portfolio from "@/src/components/container/Portfolio";

const PortfolioPage = () => {
  return (
    <Layout loading={false}>
      <Portfolio />
    </Layout>
  );
};

export default PortfolioPage;
