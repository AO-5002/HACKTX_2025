"use client";

import { useRouter } from "next/navigation";
import { Wallet, Heart, Search, Table2 } from "lucide-react";
import Dock from "./Dock";

function Navbar() {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push("/" + path);
  };

  const items = [
    {
      icon: <Table2 height={18} width={18} />,
      label: "Dashboard",
      onClick: () => navigateTo("dashboard/1"),
    },
    {
      icon: <Wallet height={18} width={18} />,
      label: "Home",
      onClick: () => navigateTo("home"),
    },
    {
      icon: <Heart height={18} width={18} />,
      label: "Archive",
      onClick: () => navigateTo(`analytics/${1}/match`),
    },
    {
      icon: <Search height={18} width={18} />,
      label: "Profile",
      onClick: () => navigateTo("profile"),
    },
  ];

  return <Dock items={items} baseItemSize={36} magnification={60} />;
}

export { Navbar };
