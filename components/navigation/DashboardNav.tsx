"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type Route = {
  label: string;
  path: string;
  icons: ReactNode;
};

type DashBoardNavProps = {
  routes: Route[];
};

const DashboardNav = ({ routes }: DashBoardNavProps) => {
  const pathname = usePathname();

  return (
    <nav className="max-sm:border-b max-sm:border-b-slate-300 mb-3 pb-2">
      <div className="flex items-center gap-2 md:gap-4 justify-center flex-wrap">
        {routes.map((route, index) => (
          <Link href={route.path} key={index}>
            <span
              className={cn(
                "flex items-center gap-1 text-gray-400 font-medium text-sm",
                pathname === route.path && "text-primary font-bold"
              )}
            >
              {route.icons} {route.label} {index !== routes.length - 1 && "|"}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default DashboardNav;
