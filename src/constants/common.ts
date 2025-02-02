import {
  Language,
  MenuItem,
  IStringOpts,
  IHNXOrderTypeOpts,
  IHOSEOrderTypeOpts,
  IUPCOMOrderTypeOpts,
} from "@interface/common";
import {
  menuIconAccount,
  menuIconTrading,
  menuIconMarket,
  menuIconOrderBook,
  menuIconPort,
  activeMenuIconMarket,
  activeMenuIconOrderBook,
  activeMenuIconPort,
  activeMenuIconTrading,
  engFlag,
  vieFlag,
} from "../images";
import { TOrderType } from "@enum/common";

export const menus: MenuItem[] = [
  {
    label: "mn_market",
    icon: menuIconMarket,
    activeIcon: activeMenuIconMarket,
    url: "market",
  },
  {
    label: "mn_watchlist",
    icon: menuIconPort,
    activeIcon: activeMenuIconPort,
    url: "portfolio",
  },
  {
    label: "mn_trade",
    icon: menuIconTrading,
    activeIcon: activeMenuIconTrading,
    url: "trading",
  },
  {
    label: "mn_ordBook",
    icon: menuIconOrderBook,
    activeIcon: activeMenuIconOrderBook,
    url: "order-book",
  },
  {
    label: "mn_account",
    icon: menuIconAccount,
    activeIcon: menuIconAccount,
    url: "account",
  },
];

export const languages: Language[] = [
  { label: "English", value: "en", icon: engFlag },
  { label: "Tiếng Việt", value: "vi", icon: vieFlag },
];
export const orderKindOpts = [
  { label: "Lệnh thông thường", value: "normal" },
  { label: "Lệnh dự kiến", value: "conditional" },
];

// export const orderTypeOpts: {
//   label: string;
//   value: TOrderType;
// }[] = Object.values(TOrderType).map((value) => ({
//   label: value,
//   value: value,
// }));

export const accountOpts: IStringOpts[] = [
  {
    label: "",
    value: "",
  },
];

export const hnxOrderTypeOpts: IHNXOrderTypeOpts[] = [
  {
    label: "ATO",
    value: "ATO",
  },
  {
    label: "ATC",
    value: "ATC",
  },
  {
    label: "LO",
    value: "LO",
  },
  {
    label: "MP",
    value: "MP",
  },
  {
    label: "MOK",
    value: "MOK",
  },
  {
    label: "MTL",
    value: "MTL",
  },
  {
    label: "RP",
    value: "RP",
  },
];
export const hoseOrderTypeOpts: IHOSEOrderTypeOpts[] = [
  {
    label: "ATO",
    value: "ATO",
  },
  {
    label: "ATC",
    value: "ATC",
  },
  {
    label: "LO",
    value: "LO",
  },
  {
    label: "MP",
    value: "MP",
  },
  {
    label: "RP",
    value: "RP",
  },
];
export const upcomOrderTypeOpts: IUPCOMOrderTypeOpts[] = [
  { label: "LO", value: "LO" },
  { label: "RP", value: "RP" },
];

export const orderTypeOpts = {
  HOSE: hoseOrderTypeOpts,
  HNX: hnxOrderTypeOpts,
  UPCOM: upcomOrderTypeOpts,
};
