"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type Route = {
  name: string;
  path: string;
  icon: JSX.Element;
};

type DashboardNavigationBarProps = {
  routes: Route[];
};

const DashboardNavigationBar = ({ routes }: DashboardNavigationBarProps) => {
  const pathName = usePathname();
  const editMode = useSearchParams().get("edit_id") || null;

  return (
    <nav className="flex justify-center gap-3 flex-wrap max-sm:gap-1.5 mb-5">
      {routes.map((route, idx) => (
        <Link key={idx} href={route.path}>
          <span
            className={cn(
              "flex items-center text-sm hover:text-primary",
              route.path === pathName && "text-primary font-medium"
            )}
          >
            {route.icon}{" "}
            {editMode ? route.name.replace("Create", "Update") : route.name}{" "}
            {routes.length - 1 !== idx && "|"}
          </span>
        </Link>
      ))}
    </nav>
  );
};

export default DashboardNavigationBar;
