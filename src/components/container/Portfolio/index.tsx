"use client";
import { PortItem } from "@interface/market";
import * as S from "./styles";
import { useAppSelector, useAppDispatch } from "@src/redux/hooks";
import { useEffect, useState } from "react";
import DataTable from "./components/DataTable";
import PortInfo from "./components/PortInfo";
import { PageHeader, Loading } from "@components/common";
import { useTranslations } from "next-intl";
import { useGetPortfolio } from "@/src/services/hooks";
import { setPorts } from "@src/redux/features/marketSlice";

const Portfolio = () => {
  const dispatch = useAppDispatch();
  const { activeAccount } = useAppSelector((state) => state.user);
  const { ports } = useAppSelector((state) => state.market);
  const { isLoading, data } = useGetPortfolio(activeAccount?.id ?? "");
  const t = useTranslations("portfolio");
  const [port, setPort] = useState<PortItem | null>(null);
  const [isShowPrice, setIsShowPrice] = useState<boolean>(false);
  useEffect(() => {
    if (data && data.length > 0) {
      const sortedData = data.toSorted(
        (a, b) => b.costPriceAmt - a.costPriceAmt
      );
      dispatch(setPorts(sortedData));
    }
  }, [data]);

  const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsShowPrice(event.target.checked);
  };

  return (
    <S.Wrapper>
      <PageHeader title={t("fn_port_txt_title")} portRefresh />
      <S.Content>
        <PortInfo />
        <DataTable
          ports={ports || []}
          port={port}
          setPort={setPort}
          isShowPrice={isShowPrice}
        />
        <S.TogglePrice
          label={t("fn_port_cta_viewPrice")}
          control={
            <S.PriceSwitch checked={isShowPrice} onChange={handleSwitch} />
          }
        />
      </S.Content>
      {isLoading && <Loading />}
    </S.Wrapper>
  );
};
export default Portfolio;
