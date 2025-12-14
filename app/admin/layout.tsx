"use client";

import { AdminSidebar } from "@/common/components/AdminSidebar";
import { Layout } from "antd";

const { Content } = Layout;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AdminSidebar />
      <Layout style={{ marginLeft: 200 }}>
        <Content style={{ margin: "24px 16px", padding: 24, minHeight: 280 }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
