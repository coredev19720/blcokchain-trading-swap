"use client";
import { IOrder } from "@/src/interface/common";
import Header from "./components/Header";
import Order from "./components/Order";
import * as S from "./styles";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { useState } from "react";
import OrderDetail from "./components/Order Detail";
import { TOrderActionType } from "@/src/enum";
const OrderBook = () => {
  const transactions = useAppSelector((state) => state.market.transactions);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [type, setType] = useState<TOrderActionType>(TOrderActionType.detail);
  const handleClickOrder = (order: IOrder, type: TOrderActionType) => {
    setSelectedOrder(order);
  };
  const handleClose = () => {
    setSelectedOrder(null);
  };
  return (
    <S.Wrapper>
      <Header />
      <S.OrderList>
        {transactions.map((x) => (
          <Order data={x} key={x.code} handleClick={handleClickOrder} />
        ))}
      </S.OrderList>
      {selectedOrder && (
        <OrderDetail
          data={selectedOrder}
          type={type}
          handleClose={handleClose}
        />
      )}
    </S.Wrapper>
  );
};
export default OrderBook;
