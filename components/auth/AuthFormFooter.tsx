import Link from "next/link";
import { Button } from "../ui/button";

interface AuthFooterProps {
  footerLabel: string;
  footerHref: string;
}

const AuthFormFooter = ({ footerHref, footerLabel }: AuthFooterProps) => {
  return (
    <Button variant={"link"} asChild>
      <Link href={footerHref}>{footerLabel}</Link>
    </Button>
  );
};

export default AuthFormFooter;
