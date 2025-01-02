import { LogIn, ShoppingBasket } from "lucide-react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiBarChartAlt2, BiPackage } from "react-icons/bi";
import { BsTruck } from "react-icons/bs";
import { FaGithub, FaListOl } from "react-icons/fa";
import { FaCheck, FaListUl } from "react-icons/fa6";
import { FcGoogle, FcReadingEbook } from "react-icons/fc";
import { FiLogOut } from "react-icons/fi";
import { GrBold, GrFormPrevious } from "react-icons/gr";
import { HiOutlineClipboardCheck } from "react-icons/hi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoKeyOutline, IoSettingsOutline } from "react-icons/io5";
import { LiaUserEditSolid } from "react-icons/lia";
import { LuHeading1, LuSlidersHorizontal } from "react-icons/lu";
import {
  MdFormatItalic,
  MdOutlineAttachMoney,
  MdOutlineNavigateNext,
} from "react-icons/md";
import { RiArrowUpDownLine } from "react-icons/ri";
import { RxCross2, RxStrikethrough } from "react-icons/rx";
import { TfiEmail } from "react-icons/tfi";

export const Icons = {
  login: LogIn,
  shoppingBasket: ShoppingBasket,
  google: FcGoogle,
  github: FaGithub,
  truck: BsTruck,
  setting: IoSettingsOutline,
  logout: FiLogOut,
  edit: LiaUserEditSolid,
  key: IoKeyOutline,
  check: FaCheck,
  cross: RxCross2,
  readingBook: FcReadingEbook,
  email: TfiEmail,
  create: AiOutlinePlusCircle,
  chart: BiBarChartAlt2,
  order: HiOutlineClipboardCheck,
  product: BiPackage,
  moneySign: MdOutlineAttachMoney,
  bold: GrBold,
  italic: MdFormatItalic,
  strike: RxStrikethrough,
  orderList: FaListOl,
  unOrderList: FaListUl,
  h1: LuHeading1,
  filter: LuSlidersHorizontal,
  arrowUpDown: RiArrowUpDownLine,
  next: MdOutlineNavigateNext,
  previous: GrFormPrevious,
  add: IoIosAddCircleOutline,
};
