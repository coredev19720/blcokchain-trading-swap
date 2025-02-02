import * as S from "./styles";
import { SlideLine } from "@src/styles/common";
import { Backdrop, Slide, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { PortItem } from "@interface/market";
import Line from "@components/common/Line";
import RowContent from "@components/common/RowContent";
import { formatNumber, setLastSymbolToLocalStorage } from "@src/utils/helpers";
import { setSelectedStock, setTicket } from "@src/redux/features/marketSlice";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { TSide } from "@enum/common";
import { useRouter } from "next/navigation";
import { handleSlideDown } from "@src/utils/behaviors";
import colors from "@/src/themes/colors";
interface IProps {
  data: PortItem | null;
  handleClose: () => void;
}
const PortItemDetail = ({ data, handleClose }: IProps) => {
  const t = useTranslations("portfolio");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { ticket, stocks } = useAppSelector((state) => state.market);
  const [startY, setStartY] = useState<number | null>(null);
  const [currentY, setCurrentY] = useState<number | null>(null);
  const [isSliding, setIsSliding] = useState(false);
  useEffect(() => {
    handleSlideDown({
      setStartY,
      setCurrentY,
      setIsSliding,
      handleClose,
      isSliding,
      currentY,
      startY,
    });
  }, [isSliding, currentY, startY]);

  const handleClickAction = (side: TSide) => {
    const stock = stocks.find((t) => t.symbol === data?.symbol);
    if (stock) {
      setLastSymbolToLocalStorage(stock.symbol);
      dispatch(setSelectedStock(stock));
      dispatch(
        setTicket({
          ...ticket,
          symbol: stock.symbol,
          price: "0", // unimplemented
          side: side,
        })
      );
      handleClose();
      router.push("trading");
    }
  };
  const genTextColor = (value: number | undefined) => {
    if (value === undefined) return "text.primary";
    if (value > 0) return colors.lightUpText;
    if (value < 0) return colors.lightDownText;
    return "text.primary";
  };
  return (
    <Backdrop open={!!data} onClick={handleClose}>
      <Slide
        direction="up"
        in={!!data}
        mountOnEnter
        unmountOnExit
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <S.Wrapper>
          <SlideLine />
          <Typography fontWeight={600}>
            {t("fn_port_detail_txt_title")}
          </Typography>
          <S.Content>
            <Typography variant="h5" fontWeight={600}>
              {data?.symbol}
            </Typography>
          </S.Content>
          <S.Content>
            {/* Khoi luong */}
            <RowContent
              leftTxt={t("en_cu_stock_detail_totalQty")}
              rightTxt={data?.total}
            />
            {/* Kha dung */}
            <RowContent
              leftTxt={t("en_cu_stock_detail_sellableQty")}
              rightTxt={data?.trade}
            />
            {/* Gia von */}
            <RowContent
              leftTxt={t("en_cu_stock_detail_boPrice")}
              rightTxt={data?.costPrice}
            />
            {/* Gia tri von */}
            <RowContent
              leftTxt={t("en_cu_stock_detail_boValue")}
              rightTxt={formatNumber(data ? data.costPriceAmt : 0)}
            />
            <Line />
            {/* Gia thi truong */}
            {/* mapping */}
            <RowContent
              leftTxt={t("en_cu_stock_detail_mktprice")}
              rightTxt={data?.basicPriceAmt}
            />
            {/* Gia tri thi truong */}
            <RowContent
              leftTxt={t("en_cu_stock_detail_mktValue")}
              rightTxt={formatNumber(data ? data.basicPriceAmt : 0)}
            />
            <Line />
            {/* lai lo du tinh */}
            <RowContent
              leftTxt={t("en_cu_stock_detail_absolutePL")}
              rightTxt={data?.pnlamt}
              rightColor={genTextColor(data?.pnlamt)}
            />
            {/* % lai lo du tinh */}
            <RowContent
              leftTxt={t("en_cu_stock_detail_percentPL")}
              rightTxt={`${data?.pnlrate}%`}
              rightColor={genTextColor(data?.pnlamt)}
            />
          </S.Content>
          <S.Actions>
            <S.Action
              disabled={data?.trade === 0}
              variant="contained"
              color="error"
              onClick={() => handleClickAction(TSide.sell)}
            >
              {t("fn_port_detail_cta_sell")}
            </S.Action>
            <S.Action
              variant="contained"
              color="success"
              onClick={() => handleClickAction(TSide.buy)}
            >
              {t("fn_port_detail_cta_buy")}
            </S.Action>
          </S.Actions>
        </S.Wrapper>
      </Slide>
    </Backdrop>
  );
};
export default PortItemDetail;
