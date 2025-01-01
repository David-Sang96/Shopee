import { Icons } from "@/components/icons";
import DashboardNav from "@/components/navigation/DashboardNav";
import { auth } from "@/server/auth";
import { ReactNode } from "react";

const publicRoutes = [
  {
    label: "Orders",
    path: "/dashboard/orders",
    icons: <Icons.order />,
  },
  {
    label: "Settings",
    path: "/dashboard/settings",
    icons: <Icons.setting />,
  },
];

const privateRoutes = [
  {
    label: "Analytics",
    path: "/dashboard/analytics",
    icons: <Icons.chart />,
  },
  {
    label: "Product Form",
    path: "/dashboard/create-product",
    icons: <Icons.create />,
  },
  {
    label: "Products",
    path: "/dashboard/products",
    icons: <Icons.product />,
  },
];

const DashBoardLayout = async ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  const session = await auth();
  const routes =
    session?.user.role === "admin"
      ? [...privateRoutes, ...publicRoutes]
      : publicRoutes;
  return (
    <>
      <DashboardNav routes={routes} />
      <section className="max-w-6xl mx-auto">{children}</section>
    </>
  );
};

export default DashBoardLayout;
