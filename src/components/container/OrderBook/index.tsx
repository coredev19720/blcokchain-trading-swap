"use client";
import Header from "./components/Header";
import Order from "./components/Order/intext";
import * as S from "./styles";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
const OrderBook = () => {
  const transactions = useAppSelector((state) => state.market.transactions);
  return (
    <S.Wrapper>
      <Header />
      <S.OrderList>
        {transactions.map((x) => (
          <Order data={x} key={x.code} />
        ))}
      </S.OrderList>
    </S.Wrapper>
  );
};
export default OrderBook;
