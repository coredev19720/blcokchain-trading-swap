import { ILang, IMenuItem } from "../interface/common";
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
import { TOrderKind, TOrderType } from "../enum";

export const menus: IMenuItem[] = [
  {
    label: "mn_market",
    icon: menuIconMarket,
    activeIcon: activeMenuIconMarket,
    url: "/market",
  },
  {
    label: "mn_watchlist",
    icon: menuIconPort,
    activeIcon: activeMenuIconPort,
    url: "/portfolio",
  },
  {
    label: "mn_trade",
    icon: menuIconTrading,
    activeIcon: activeMenuIconTrading,
    url: "/trading",
  },
  {
    label: "mn_ordBook",
    icon: menuIconOrderBook,
    activeIcon: activeMenuIconOrderBook,
    url: "/order-book",
  },
  {
    label: "mn_account",
    icon: menuIconAccount,
    activeIcon: menuIconAccount,
    url: "/account",
  },
];

export const languages: ILang[] = [
  { label: "English", value: "en", icon: engFlag },
  { label: "Tiếng Việt", value: "vi", icon: vieFlag },
];
export const orderKindOpts = [
  { label: "Lệnh thông thường", value: "normal" },
  { label: "Lệnh dự kiến", value: "conditional" },
];

export const orderTypeOpts: {
  label: string;
  value: TOrderType;
}[] = Object.values(TOrderType).map((value) => ({
  label: value,
  value: value,
}));
