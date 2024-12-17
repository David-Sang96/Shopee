import Link from "next/link";
import { Icons } from "../icons";

const HeaderLogo = () => {
  return (
    <Link href={"/"} className="text-primary">
      <Icons.shoppingBasket className="size-9 md:size-10" />
    </Link>
  );
};

export default HeaderLogo;
