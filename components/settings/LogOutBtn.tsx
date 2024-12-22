"use client";

import { signOut } from "next-auth/react";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import SettingsCard from "./SettingsCard";

const LogOutBtn = () => {
  return (
    <SettingsCard>
      <div className="text-sm text-red-500 font-medium mb-2">Danger Zone</div>
      <Button className="bg-red-500 hover:bg-red-400" onClick={() => signOut()}>
        <Icons.logout
          aria-hidden="true"
          style={{ width: 20, height: 20, marginRight: 3 }}
        />
        <span> Logout</span>
      </Button>
    </SettingsCard>
  );
};

export default LogOutBtn;
