"use client";
import { OrderInfo } from "@interface/market";
import Header from "./components/Header";
import Order from "./components/Order";
import * as S from "./styles";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { useEffect, useState } from "react";
import OrderDetail from "./components/OrderDetail";
import { TOrderActionType } from "@enum/common";
import { useGetOrders } from "@/src/services/hooks/order/useGetOrders";
import Loading from "../../common/Loading";
const OrderBook = () => {
  const { activeAccount } = useAppSelector((state) => state.user);
  const { refetch, data, isPending } = useGetOrders(activeAccount?.id || "");
  const dispatch = useAppDispatch();
  const [type, setType] = useState<TOrderActionType>(TOrderActionType.detail);
  const [orders, setOrders] = useState<OrderInfo[] | []>([]);
  const [order, setOrder] = useState<OrderInfo | null>(null);
  const handleClickOrder = (order: OrderInfo, type: TOrderActionType) => {
    setOrder(order);
    setType(type);
  };
  const handleClose = () => {
    setOrder(null);
  };

  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);
  console.log("orders", orders);
  return (
    <S.Wrapper>
      <Header />
      <S.OrderList>
        {orders.map((x) => (
          <Order data={x} key={x.orderid} handleClick={handleClickOrder} />
        ))}
      </S.OrderList>
      <OrderDetail data={order} type={type} handleClose={handleClose} />
      {isPending && <Loading />}
    </S.Wrapper>
  );
};
export default OrderBook;
