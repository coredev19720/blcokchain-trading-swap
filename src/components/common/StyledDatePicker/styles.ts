import colors from "@src/themes/colors";
import { styled } from "@mui/system";
export const Wrapper = styled("div")(({ theme }) => ({
  position: "relative",
  cursor: "pointer",
  "& .react-datepicker-wrapper": {
    width: "100%",
    backgroundColor: theme.palette.mode === "light" ? colors.ln20 : colors.dn30,
    "& input": {
      backgroundColor: colors.p300,
      border: `1px solid ${colors.ln30} `,
      borderRadius: 4,
      width: "100%",
      padding: theme.spacing(3, 4),
      fontSize: "1.7rem",
      lineHeight: "1.4375em",
      position: "relative",
      zIndex: 2,
      textAlign: "left",
      cursor: "pointer",
      "&:focus, &:focus-visible": {
        outlineColor: colors.sb60,
        outlineOffset: "none",
      },
    },
  },
  "& .react-datepicker": {
    padding: theme.spacing(4),
    border: 0,
    backgroundColor: theme.palette.mode === "light" ? colors.ln20 : colors.dn30,
    boxShadow: "0px 4px 12px rgba(55, 66, 77, 0.2)",
    display: "flex",
    "& .react-datepicker__triangle": {
      display: "none",
    },
  },
  "& .react-datepicker__month": {
    margin: 0,
  },
  "& .react-datepicker__month-container": {
    width: "100%",
    marginRight: 16,
    "&:last-child": {
      marginRight: 0,
    },
  },
  "& .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name":
    {
      fontSize: "1.6rem",
      width: 39,
      height: 39,
      lineHeight: "39px",
      borderRadius: "50%",
      margin: 0,
    },
  "& .react-datepicker__day, .react-datepicker__time-name": {
    color: theme.palette.mode === "light" ? colors.dn30 : colors.p300,
    fontWeight: 400,
    "&:hover": {
      color: colors.p300,
      backgroundColor:
        theme.palette.mode === "light" ? colors.sb70 : colors.sb50,
      borderRadius: "50%",
      overflow: "hidden",
    },
    "&.react-datepicker__day--disabled": {
      color: theme.palette.mode === "light" ? colors.mn20 : colors.mn80,
    },
  },
  "& .react-datepicker__header ": {
    backgroundColor: "transparent",
    border: 0,
    textAlign: "start",
    position: "inherit",
  },
  "& .react-datepicker__current-month": {
    fontSize: "1.6rem",
    color: theme.palette.mode === "light" ? colors.dn30 : colors.p300,
    textAlign: "start",
    marginBottom: theme.spacing(1),
    display: "inline-block",
  },
  "& .react-datepicker__header__dropdown": {
    display: "inline-block",
    width: 30,
    height: 20,
    verticalAlign: "top",
    "& .react-datepicker__year-read-view": {
      visibility: "visible !important",
    },
    "& .react-datepicker__year-read-view--selected-year": {
      display: "none",
    },
    "& .react-datepicker__year-read-view--down-arrow": {
      borderWidth: "1px 1px 0 0",
      top: -5,
      borderColor: theme.palette.mode === "light" ? colors.dn30 : colors.p300,
    },
  },
  "& .react-datepicker__navigation--previous": {
    left: "auto",
    right: 45,
  },
  "& .react-datepicker__day-name": {
    fontSize: "1.4rem",
    color: colors.mn50,
  },
  "& .react-datepicker__day--keyboard-selected, .react-datepicker__month-text--keyboard-selected, .react-datepicker__quarter-text--keyboard-selected, .react-datepicker__year-text--keyboard-selected":
    {
      color: colors.p300,
      backgroundColor:
        theme.palette.mode === "light" ? colors.sb70 : colors.sb50,
    },
  "& .react-datepicker__day--in-range, .react-datepicker__day--in-selecting-range":
    {
      borderRadius: 0,
      backgroundColor:
        theme.palette.mode === "light" ? colors.sb10 : colors.dn20,
      "&:hover": {
        borderRadius: "50%",
      },
    },
  "& .react-datepicker__day-names": {
    marginBottom: theme.spacing(1),
  },
  "& .react-datepicker__navigation": {
    top: 13,
  },
  "& .react-datepicker__navigation-icon": {
    "&:before": {
      borderWidth: "1px 1px 0 0",
      borderColor: theme.palette.mode === "light" ? colors.dn30 : colors.p300,
      width: 12,
      height: 12,
    },
  },
  "& .react-datepicker-popper": {
    zIndex: 3,
  },
  "& .react-datepicker-popper[data-placement^=bottom]": {
    paddingTop: 0,
  },
  "& .react-datepicker__day--today": {
    backgroundColor: "transparent",
    border: `1px solid ${colors.ln50}`,
    color: theme.palette.mode === "light" ? colors.dn30 : colors.p300,
  },
  "& .react-datepicker__day--range-start, .react-datepicker__day--range-end, .react-datepicker__day--selecting-range-start":
    {
      backgroundColor:
        theme.palette.mode === "light" ? colors.sb70 : colors.sb50,
      color: colors.p300,
      borderRadius: "50%",
    },
  "& .react-datepicker__year-dropdown, .react-datepicker__month-dropdown, .react-datepicker__month-year-dropdown":
    {
      width: "100%",
      left: 0,
      backgroundColor:
        theme.palette.mode === "light"
          ? colors.lightBackground
          : colors.darkBackground,
      border: 0,
      display: "flex",
      flexWrap: "wrap",
      top: 40,
      height: "calc(100% - 40px)",
      padding: 16,
    },
  "& .react-datepicker__year-option, .react-datepicker__month-option, .react-datepicker__month-year-option":
    {
      width: "25%",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.6rem",
      color: theme.palette.mode === "light" ? colors.dn30 : colors.p300,
      height: 40,
      "&:first-child, &:nth-last-child(-n+2)": {
        display: "none",
      },
      "&.react-datepicker__year-option--selected_year": {
        backgroundColor:
          theme.palette.mode === "light" ? colors.sb70 : colors.sb50,
        color: colors.p300,
        borderRadius: 25,
        "& .react-datepicker__year-option--selected": {
          display: "none",
        },
      },
      "&:hover": {
        backgroundColor:
          theme.palette.mode === "light" ? colors.sb70 : colors.sb50,
        color: colors.p300,
        borderRadius: 25,
      },
    },
  "& .react-datepicker__day-names, .react-datepicker__week": {
    display: "flex",
  },
}));
export const Icon = styled("span")(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(3),
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  fontSize: "1.6rem",
  color: colors.mn100,
  zIndex: 0,
}));
