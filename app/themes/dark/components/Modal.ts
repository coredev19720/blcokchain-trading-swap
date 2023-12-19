import colors from "../../colors";

const Modal = {
  styleOverrides: {
    root: {
      "&.MuiModal-root": {
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(255,255,255, 0.2)",
        },
        "& .MuiBox-root": {
          backgroundColor: colors.dn40,
        }
      },
    },
  },
}
export default Modal;