import * as S from "./styles";
import { SlideLine } from "@/src/styles/common";
import { Backdrop, Slide, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import colors from "@/src/themes/colors";
import { useEffect, useState } from "react";
import { IPortItem } from "@/src/interface/table";
import RowContent from "@/src/components/common/RowContent";
import { formatNumber } from "@/src/utils/helpers";
import Line from "@/src/components/common/Line";

interface IProps {
  data: IPortItem | null;
  handleClose: () => void;
}
const PortItemDetail = ({ data, handleClose }: IProps) => {
  const t = useTranslations("portfolio");
  const [startY, setStartY] = useState(null);
  const [currentY, setCurrentY] = useState(null);
  const [isSliding, setIsSliding] = useState(false);
  useEffect(() => {
    const handleTouchStart = (e: any) => {
      setStartY(e.touches[0].clientY);
      setCurrentY(e.touches[0].clientY);
      setIsSliding(true);
    };

    const handleTouchMove = (e: any) => {
      if (!isSliding) return;
      setCurrentY(e.touches[0].clientY);
    };

    const handleTouchEnd = () => {
      if (!isSliding) return;

      setIsSliding(false);

      // Check if the slide-down gesture is significant
      if (currentY && startY) {
        const deltaY = currentY - startY;
        if (deltaY > 50) {
          handleClose();
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isSliding, currentY, startY]);
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
          <Typography fontWeight={600} color="text.primary">
            {t("fn_port_detail_txt_title")}
          </Typography>
          <S.Content>
            <Typography variant="h5" fontWeight={600} color="text.primary">
              {data?.symbol}
            </Typography>
          </S.Content>
          <S.Content>
            {/* Khoi luong */}
            <RowContent
              leftTxt={t("en_cu_stock_detail_totalQty")}
              rightTxt={data?.qty}
            />
            {/* Kha dung */}
            <RowContent
              leftTxt={t("en_cu_stock_detail_sellableQty")}
              rightTxt={data?.tradableQty}
            />
            {/* Gia von */}
            <RowContent
              leftTxt={t("en_cu_stock_detail_boPrice")}
              rightTxt={data?.price}
            />
            {/* Gia tri von */}
            <RowContent
              leftTxt={t("en_cu_stock_detail_boValue")}
              rightTxt={formatNumber(data ? data?.price * data?.qty * 1000 : 0)}
            />
            <Line />
            {/* Gia thi truong */}
            <RowContent
              leftTxt={t("en_cu_stock_detail_mktprice")}
              rightTxt={data?.marketPrice}
            />
            {/* Gia tri thi truong */}
            <RowContent
              leftTxt={t("en_cu_stock_detail_mktValue")}
              rightTxt={formatNumber(
                data ? data.marketPrice * data.qty * 1000 : 0
              )}
            />
            <Line />
            {/* lai lo du tinh */}
            <RowContent
              leftTxt={t("en_cu_stock_detail_absolutePL")}
              rightTxt={data?.tradableQty}
            />
            {/* % lai lo du tinh */}
            <RowContent
              leftTxt={t("en_cu_stock_detail_percentPL")}
              rightTxt={data?.tradableQty}
            />
          </S.Content>
          <S.Actions>
            <S.Action variant="contained" color="success">
              {t("fn_port_detail_cta_sell")}
            </S.Action>
            <S.Action variant="contained" color="error">
              {t("fn_port_detail_cta_buy")}
            </S.Action>
          </S.Actions>
        </S.Wrapper>
      </Slide>
    </Backdrop>
  );
};
export default PortItemDetail;
