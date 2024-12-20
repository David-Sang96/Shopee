"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Session } from "next-auth";
import { useState } from "react";
import { Icons } from "../icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import ProfileUpdateForm from "./ProfileUpdateForm";
import SettingsCard from "./SettingsCard";

type ProfileCardProps = {
  session: Session;
};

const ProfileCard = ({ session }: ProfileCardProps) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width : 768px)");

  return (
    <SettingsCard>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Avatar className="size-14">
            <AvatarImage
              src={session.user?.image || ""}
              alt="profile picture"
              aria-label="user profile picture"
            />
            <AvatarFallback className="bg-primary font-semibold text-white">
              {session.user?.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="">
            <h2 className="font-semibold text-lg">{session.user?.name}</h2>
            <p className="font-medium text-sm text-muted-foreground">
              {session.user?.email}
            </p>
          </div>
        </div>
        {isDesktop ? (
          <Dialog onOpenChange={setOpen} open={open}>
            <DialogTrigger asChild>
              <Button
                size={"sm"}
                aria-label="Edit"
                className="bg-white text-black hover:bg-white"
              >
                <Icons.edit
                  aria-hidden="true"
                  style={{ width: 20, height: 20 }}
                />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] w-[93%] max-sm:px-2 max-sm:py-4 gap-0">
              <DialogHeader className="pb-2">
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <ProfileUpdateForm
                name={session.user?.name as string}
                email={session.user?.email as string}
                setOpen={setOpen}
                open={open}
              />
              <DialogFooter className="pt-2">
                <DialogClose asChild>
                  <Button variant={"outline"} className="w-full">
                    Cancel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <Drawer onOpenChange={setOpen} open={open}>
            <DrawerTrigger asChild>
              <Button
                size={"sm"}
                aria-label="Edit"
                className="bg-white text-black hover:bg-white"
              >
                <Icons.edit
                  aria-hidden="true"
                  style={{ width: 20, height: 20 }}
                />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle> Edit profile </DrawerTitle>
                <DrawerDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DrawerDescription>
              </DrawerHeader>
              <ProfileUpdateForm
                name={session.user?.name as string}
                email={session.user?.email as string}
                setOpen={setOpen}
                open={open}
              />
              <DrawerFooter className="pt-2">
                <DrawerClose>
                  <Button variant="outline" className="w-full">
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </SettingsCard>
  );
};

export default ProfileCard;
