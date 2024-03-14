type HandleSlideDownProp = {
  setStartY: (y: number | null) => void;
  setCurrentY: (y: number | null) => void;
  setIsSliding: (isSliding: boolean) => void;
  handleClose: () => void;
  isSliding: boolean;
  currentY: number | null;
  startY: number | null;
};
export const handleSlideDown = ({
  setStartY,
  setCurrentY,
  setIsSliding,
  handleClose,
  isSliding,
  currentY,
  startY,
}: HandleSlideDownProp) => {
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
};
