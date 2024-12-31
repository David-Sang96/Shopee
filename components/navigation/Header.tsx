import { auth } from "@/server/auth";
import HeaderButton from "./HeaderButton";
import HeaderLogo from "./HeaderLogo";
import { ThemeToggler } from "./ThemeToggler";

const Header = async () => {
  const session = await auth();

  return (
    <nav className="flex justify-between items-center py-2.5">
      <HeaderLogo />
      <div className="flex items-center gap-3">
        <ThemeToggler />
        <HeaderButton user={session?.user} expires={session?.expires!} />
      </div>
    </nav>
  );
};

export default Header;
