"use client";
import { IOrder, OrderInfo } from "@interface/common";
import Header from "./components/Header";
import Order from "./components/Order";
import * as S from "./styles";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { useEffect, useState } from "react";
import OrderDetail from "./components/OrderDetail";
import { TOrderActionType } from "@enum/common";
import { setOrder } from "@src/redux/features/marketSlice";
import { useGetOrders } from "@/src/services/hooks/useGetOrders";
const OrderBook = () => {
  const { onGetOrders } = useGetOrders();
  const { orders, order } = useAppSelector((state) => state.market);
  const { activeAccount } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [type, setType] = useState<TOrderActionType>(TOrderActionType.detail);
  const handleClickOrder = (order: OrderInfo, type: TOrderActionType) => {
    dispatch(setOrder(order));
    setType(type);
  };
  const handleClose = () => {
    dispatch(setOrder(null));
  };
  useEffect(() => {
    activeAccount && onGetOrders(activeAccount.id);
  }, []);
  return (
    <S.Wrapper>
      <Header />
      <S.OrderList>
        {orders.map((x) => (
          <Order data={x} key={x.orderid} handleClick={handleClickOrder} />
        ))}
      </S.OrderList>
      <OrderDetail data={order} type={type} handleClose={handleClose} />
    </S.Wrapper>
  );
};
export default OrderBook;
