import * as S from "./styles";
import { IOrder } from "@interface/common";
import { formatNumber } from "@src/utils/helpers";
import { useTranslations } from "next-intl";
import dayjs from "dayjs";
import {RowContent,Line} from "@components/common";
interface IProps {
  data: IOrder | null;
}

const Detail = ({ data }: IProps) => {
  const t = useTranslations("order_book");
  return (
    <>
      <S.Content>
        <RowContent leftTxt={t("en_ord_order_type")} rightTxt={data?.type} />
        <RowContent
          leftTxt={t("en_ord_order_status")}
          rightTxt={data?.status}
        />
        <Line />
        <RowContent
          leftTxt={t("en_ord_order_qty")}
          rightTxt={formatNumber(data?.vol || 0)}
        />
        <RowContent
          leftTxt={t("en_ord_order_value")}
          rightTxt={formatNumber(data ? data.vol * data.price : 0)}
        />
        <RowContent
          leftTxt={t("en_ord_match_qty")}
          rightTxt={formatNumber(data?.execQty || 0)}
        />
        <Line />
        <RowContent
          leftTxt={t("en_ord_match_remainQty")}
          rightTxt={formatNumber(data?.pendingQty || 0)}
        />
        <RowContent
          leftTxt={t("en_ord_match_value")}
          rightTxt={formatNumber(data ? data.execQty * data.price : 0)}
        />
      </S.Content>
      <RowContent
        leftTxt={t("en_ord_order_custodyCd")}
        rightTxt={data?.code}
        isChild
      />
      <RowContent
        leftTxt={t("en_ord_order_accNo")}
        rightTxt={data?.accountNo}
        isChild
      />
      <RowContent
        leftTxt={t("en_ord_order_timestamp")}
        rightTxt={
          data?.time ? dayjs(data.time).format("YYYY-MM-DD HH:mm:ss") : "-"
        }
        isChild
      />
    </>
  );
};
export default Detail;
