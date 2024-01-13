import Layout from "@/src/components/common/Layout";
import OrderBook from "@/src/components/container/OrderBook";

const OrderBookPage = () => {
  return (
    <Layout loading={false}>
      <OrderBook />
    </Layout>
  );
};

export default OrderBookPage;
