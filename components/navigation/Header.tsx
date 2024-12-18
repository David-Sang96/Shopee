import { auth } from "@/server/auth";
import HeaderButton from "./HeaderButton";
import HeaderLogo from "./HeaderLogo";

const Header = async () => {
  const session = await auth();
  console.log(session);

  return (
    <nav className="flex justify-between items-center py-2.5">
      <HeaderLogo />
      <HeaderButton user={session?.user} expires={session?.expires!} />
    </nav>
  );
};

export default Header;
