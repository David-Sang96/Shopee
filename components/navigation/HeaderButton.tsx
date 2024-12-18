"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";

import { Icons } from "../icons";
import { Button } from "../ui/button";

const HeaderButton = ({ user }: Session) => {
  const email = user?.email;

  return (
    <div>
      {email}
      {email ? (
        <Button variant={"destructive"} onClick={() => signOut()}>
          Logout
        </Button>
      ) : (
        <Button asChild>
          <Link href={"/auth/login"}>
            <Icons.login aria-hidden="true" />
            <span>Login</span>
          </Link>
        </Button>
      )}
    </div>
  );
};

export default HeaderButton;
