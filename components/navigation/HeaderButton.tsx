"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Icons } from "../icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const HeaderButton = ({ user }: Session) => {
  const email = user?.email;

  return (
    <div>
      {email ? (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={user.image as string} alt="profile image" />
              <AvatarFallback className="bg-primary text-white font-semibold">
                {user.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="p-3">
            <div className="flex gap-2 pb-2 cursor-pointer border-2 border-black/10 shadow-md px-2 py-3 rounded-md mb-4 hover:scale-95 duration-300 ease-in-out">
              <Avatar>
                <AvatarImage src={user.image as string} alt="profile image" />
                <AvatarFallback className="bg-white font-semibold text-primary">
                  {user.name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm  ">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer group">
              <Icons.truck
                aria-hidden="true"
                style={{ width: 22, height: 22, marginRight: 3 }}
                className="group-hover:translate-x-1.5 duration-500 group-hover:text-primary"
              />
              <span className="group-hover:text-primary">My Orders</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer group ">
              <Icons.setting
                aria-hidden="true"
                style={{ width: 22, height: 22, marginRight: 3 }}
                className="group-hover:rotate-180 duration-500 group-hover:text-primary"
              />

              <span className="group-hover:text-primary"> Setting</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer group"
              onClick={() => signOut()}
            >
              <Icons.logout
                aria-hidden="true"
                style={{ width: 22, height: 22, marginRight: 3 }}
                className="group-hover:translate-x-1.5 duration-500 group-hover:text-red-500 group-hover:scale-90"
              />
              <span className="group-hover:text-red-500"> Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
