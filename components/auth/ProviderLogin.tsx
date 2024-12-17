"use client";

import { signIn } from "next-auth/react";
import { Icons } from "../icons";
import { Button } from "../ui/button";

const ProviderLogin = () => {
  return (
    <div className="flex flex-col w-full gap-2">
      <Button
        variant={"outline"}
        onClick={() => signIn("google", { redirect: false, callbackUrl: "/" })}
      >
        Login with google
        <Icons.google aria-hidden="true" />
      </Button>
      <Button
        variant={"outline"}
        onClick={() => signIn("github", { redirect: false, callbackUrl: "/" })}
      >
        Login with github
        <Icons.github aria-hidden="true" />
      </Button>
    </div>
  );
};

export default ProviderLogin;
