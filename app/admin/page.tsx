"use client";

import { Card, Typography, Space } from "antd";
import { useAuthState } from "@/hooks/auth/useAuthState";
import { isAdmin } from "@/utils/auth/role.utils";

const { Title, Text } = Typography;

export default function AdminDashboardPage() {
  const { user } = useAuthState();

  return (
    <div>
      <Title level={2}>Dashboard</Title>
      
      <Space direction="vertical" size="large" className="w-full">
        <Card>
          <Title level={4}>Bienvenido</Title>
          <Text>
            Hola, <strong>{user?.name}</strong>
          </Text>
          <br />
          <Text type="secondary">
            Rol: {user?.role === "ADMIN" ? "Administrador" : "Capilla"}
          </Text>
        </Card>

        <Card>
          <Title level={4}>Resumen</Title>
          <Text>El sistema de gestión de caravanas está configurado y listo para usar.</Text>
          <br />
          <Text type="secondary">
            Desde aquí podrás gestionar caravanas, capillas, usuarios y autobuses.
          </Text>
        </Card>

        {user && isAdmin(user.role) && (
          <Card>
            <Title level={4}>Funcionalidades de Administrador</Title>
            <ul>
              <li>Gestionar todas las caravanas</li>
              <li>Gestionar capillas</li>
              <li>Gestionar usuarios (ADMIN y CHAPEL)</li>
              <li>Gestionar autobuses y rutas</li>
              <li>Ver todas las registraciones</li>
              <li>Exportar PDFs</li>
            </ul>
          </Card>
        )}

        {user && !isAdmin(user.role) && (
          <Card>
            <Title level={4}>Funcionalidades de Capilla</Title>
            <ul>
              <li>Ver caravanas donde tu capilla tiene registraciones</li>
              <li>Ver registraciones de tu capilla</li>
              <li>Confirmar pagos</li>
              <li>Exportar PDFs de tu capilla</li>
            </ul>
          </Card>
        )}
      </Space>
    </div>
  );
}

