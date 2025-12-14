"use client";

import { Layout, Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

const { Sider } = Layout;

interface MenuItem {
  key: string;
  label: string;
  path: string;
}

const menuItems: MenuItem[] = [
  {
    key: "chapels",
    label: "Capelas",
    path: "/admin/chapels",
  },
  {
    key: "caravans",
    label: "Caravanas",
    path: "/admin/caravans",
  },
  {
    key: "buses",
    label: "Autocarros",
    path: "/admin/buses",
  },
  {
    key: "registrations",
    label: "Inscrições",
    path: "/admin/registrations",
  },
];

export const AdminSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const selectedKey = useMemo(() => {
    const item = menuItems.find((item) => pathname?.startsWith(item.path));
    return item?.key || "";
  }, [pathname]);

  const handleMenuClick = ({ key }: { key: string }) => {
    const item = menuItems.find((item) => item.key === key);
    if (item) {
      router.push(item.path);
    }
  };

  return (
    <Sider
      width={200}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div className="p-4 text-white text-lg font-semibold">
        Gestão do Templo
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menuItems.map((item) => ({
          key: item.key,
          label: item.label,
        }))}
        onClick={handleMenuClick}
      />
    </Sider>
  );
};
