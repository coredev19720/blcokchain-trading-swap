"use client";
import { MatchedOrd, OrderInfo, WaitMatchedOrd } from "@interface/market";
import Header from "./components/Header";
import Order from "./components/Order";
import * as S from "./styles";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { useEffect, useState } from "react";
import OrderDetail from "./components/OrderDetail";
import { TOrderActionType } from "@enum/common";
import { useGetOrders } from "@/src/services/hooks/order/useGetOrders";
import Loading from "../../common/Loading";
// import { useGetMatchedOrds } from "@/src/services/hooks/order/useGetMatchedOrders";
// import { useGetWaitMatchedOrds } from "@/src/services/hooks/order/useGetWaitMatchedOrders";
const OrderBook = () => {
  const { activeAccount } = useAppSelector((state) => state.user);
  const {
    refetch: refecthOrds,
    data: ordersData,
    isLoading: ordsIsLoading,
  } = useGetOrders(activeAccount?.id || "");
  // const {
  //   refetch: refetchMatchedOrds,
  //   data: matchedOrdsData,
  //   isLoading: matchedOrdsLoading,
  // } = useGetMatchedOrds(activeAccount?.id || "");
  // const {
  //   refetch: refetchWaitMatchedOrds,
  //   data: waitMatchedOrdsData,
  //   isLoading: waitMatchedOrdsIsLoading,
  // } = useGetWaitMatchedOrds(activeAccount?.id || "");
  const [type, setType] = useState<TOrderActionType>(TOrderActionType.detail);
  const [ords, setOrds] = useState<OrderInfo[] | []>([]);
  const [ord, setOrd] = useState<OrderInfo | null>(null);
  // const [matchedOrds, setMatchedOrds] = useState<MatchedOrd[] | []>([]);
  // const [waitMatchecdOrds, setWaitMatchedOrds] = useState<
  //   WaitMatchedOrd[] | []
  // >([]);
  const handleClickOrder = (order: OrderInfo, type: TOrderActionType) => {
    setOrd(order);
    setType(type);
  };
  const handleClose = () => {
    setOrd(null);
  };

  useEffect(() => {
    if (ordersData) {
      setOrds(prepareData(ordersData));
    }
  }, [ordersData]);

  // useEffect(() => {
  //   if (matchedOrds) {
  //     setMatchedOrds(matchedOrds);
  //   }
  // }, [matchedOrds]);

  // useEffect(() => {
  //   if (waitMatchecdOrds) {
  //     setWaitMatchedOrds(waitMatchecdOrds);
  //   }
  // }, [waitMatchecdOrds]);
  const prepareData = (data: OrderInfo[]) => {
    const editableData: OrderInfo[] = [];
    const matchedData: OrderInfo[] = [];
    const sortedData = data.sort((a, b) => {
      return (
        new Date(b.odtimestamp).getTime() - new Date(a.odtimestamp).getTime()
      );
    });
    sortedData.forEach((x) => {
      if (x.allowamend === "Y" || x.allowcancel === "Y") {
        editableData.push(x);
      } else {
        matchedData.push(x);
      }
    });
    return [...editableData, ...matchedData];
  };
  return (
    <S.Wrapper>
      <Header />
      <S.OrderList>
        {ords.map((x) => (
          <Order data={x} key={x.orderid} handleClick={handleClickOrder} />
        ))}
      </S.OrderList>
      <OrderDetail data={ord} type={type} handleClose={handleClose} />
      {/* {(ordsIsLoading || waitMatchedOrdsIsLoading || matchedOrdsLoading) && (
        <Loading />
      )} */}
      {ordsIsLoading && <Loading />}
    </S.Wrapper>
  );
};
export default OrderBook;
