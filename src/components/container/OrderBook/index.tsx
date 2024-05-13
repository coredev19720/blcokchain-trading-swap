"use client";
import { OrderInfo } from "@interface/market";
import Header from "./components/Header";
import Order from "./components/Order";
import * as S from "./styles";
import { useAppSelector } from "@src/redux/hooks";
import { useEffect, useState } from "react";
import OrderDetail from "./components/OrderDetail";
import { TOrderActionType } from "@enum/common";
import { useGetOrders } from "@/src/services/hooks";
import Loading from "../../common/Loading";
import { useTranslations } from "next-intl";
import { useGetVerifyInfo } from "@/src/services/hooks/useGetVerifyInfo";
const OrderBook = () => {
  const {} = useGetVerifyInfo();

  const { activeAccount, permissions, verifyInfo } = useAppSelector(
    (state) => state.user
  );
  const activePermission =
    activeAccount && permissions ? permissions[activeAccount.id] : null;
  const { data: ordersData, isLoading: ordsIsLoading } = useGetOrders(
    activeAccount?.id ?? ""
  );
  const [type, setType] = useState<TOrderActionType>(TOrderActionType.detail);
  const [ords, setOrds] = useState<OrderInfo[] | []>([]);
  const [ord, setOrd] = useState<OrderInfo | null>(null);

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

  const prepareData = (data: OrderInfo[]) => {
    const editableData: OrderInfo[] = [];
    const matchedData: OrderInfo[] = [];
    const sortedData = data.toSorted(
      (a, b) =>
        new Date(b.odtimestamp).getTime() - new Date(a.odtimestamp).getTime()
    );
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
      {ord && (
        <OrderDetail
          data={ord}
          type={type}
          handleClose={handleClose}
          activeAccount={activeAccount}
          activePermission={activePermission}
          verifyInfo={verifyInfo}
        />
      )}
      {ordsIsLoading && <Loading />}
    </S.Wrapper>
  );
};
export default OrderBook;
