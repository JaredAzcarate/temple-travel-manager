"use client";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { useAuth } from "@/hooks/auth/useAuth";
import { useAuthState } from "@/hooks/auth/useAuthState";
import { isAdmin } from "@/utils/auth/role.utils";
import type { MenuProps } from "antd";
import { Avatar, Button, Dropdown, Layout, Menu, Typography } from "antd";
import { usePathname, useRouter } from "next/navigation";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const adminMenuItems: MenuProps["items"] = [
  {
    key: "/admin",
    label: "Dashboard",
  },
  {
    key: "/admin/caravans",
    label: "Caravanas",
  },
  {
    key: "/admin/chapels",
    label: "Capillas",
  },
  {
    key: "/admin/users",
    label: "Usuarios",
  },
  {
    key: "/admin/buses",
    label: "Autobuses",
  },
];

const chapelMenuItems: MenuProps["items"] = [
  {
    key: "/admin",
    label: "Dashboard",
  },
  {
    key: "/admin/caravans",
    label: "Caravanas",
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuthState();
  const { logout } = useAuth();

  const menuItems =
    user && isAdmin(user.role) ? adminMenuItems : chapelMenuItems;

  const handleMenuClick = ({ key }: { key: string }) => {
    router.push(key);
  };

  const handleLogout = async () => {
    await logout();
  };

  const userMenuItems: MenuProps["items"] = [
    {
      key: "logout",
      label: "Cerrar Sesión",
      danger: true,
      onClick: handleLogout,
    },
  ];

  if (pathname === "/admin/login" || pathname === "/admin/register") {
    return <>{children}</>;
  }

  return (
    <AuthGuard>
      <Layout className="min-h-screen">
        <Sider width={250} className="fixed left-0 top-0 h-screen" theme="dark">
          <div className="m-4 mb-6">
            <Text className="text-lg font-bold text-white">
              Gestión Caravanas
            </Text>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[pathname || "/admin"]}
            items={menuItems}
            onClick={handleMenuClick}
          />
        </Sider>

        <Layout className="ml-[250px]">
          <Header className="flex items-center justify-between bg-white px-6 shadow-sm">
            <div>
              <Text className="text-xl font-semibold">
                Panel de Administración
              </Text>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <Text className="block font-medium">{user?.name}</Text>
                <Text type="secondary" className="text-xs">
                  {user?.role === "ADMIN" ? "Administrador" : "Capilla"}
                </Text>
              </div>
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <Button type="text" className="flex items-center gap-2">
                  <Avatar>{user?.name?.[0]?.toUpperCase() || "U"}</Avatar>
                </Button>
              </Dropdown>
            </div>
          </Header>

          <Content className="p-6">{children}</Content>
        </Layout>
      </Layout>
    </AuthGuard>
  );
}
