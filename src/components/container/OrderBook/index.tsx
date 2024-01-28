"use client";
import { IOrder } from "@/src/interface/common";
import Header from "./components/Header";
import Order from "./components/Order";
import * as S from "./styles";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { useState } from "react";
import OrderDetail from "./components/Order Detail";
import { TOrderActionType } from "@/src/enum";
import { setOrder } from "@/src/redux/features/marketSlice";
const OrderBook = () => {
  const orders = useAppSelector((state) => state.market.orders);
  const order = useAppSelector((state) => state.market.order);
  const dispatch = useAppDispatch();
  const [type, setType] = useState<TOrderActionType>(TOrderActionType.detail);
  const handleClickOrder = (order: IOrder, type: TOrderActionType) => {
    dispatch(setOrder(order));
    setType(type);
  };
  const handleClose = () => {
    dispatch(setOrder(null));
  };
  return (
    <S.Wrapper>
      <Header />
      <S.OrderList>
        {orders.map((x) => (
          <Order data={x} key={x.code} handleClick={handleClickOrder} />
        ))}
      </S.OrderList>
      <OrderDetail data={order} type={type} handleClose={handleClose} />
    </S.Wrapper>
  );
};
export default OrderBook;
