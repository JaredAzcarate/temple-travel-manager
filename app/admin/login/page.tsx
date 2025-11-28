"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Form, Input, Button, Card, Typography, notification } from "antd";
import type { FormProps } from "antd";
import { useAuth } from "@/hooks/auth/useAuth";
import { LoginCredentials } from "@/types/auth/auth.types";

const { Title, Text } = Typography;

type FieldType = LoginCredentials;

export default function LoginPage() {
  const { login, user, loading } = useAuth();
  const router = useRouter();
  const [form] = Form.useForm();

  useEffect(() => {
    if (user && !loading) {
      router.push("/admin");
    }
  }, [user, loading, router]);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      await login(values);
      notification.success({
        title: "Inicio de sesión exitoso",
        description: "Has iniciado sesión correctamente",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error al iniciar sesión";
      notification.error({
        title: "Error al iniciar sesión",
        description: errorMessage,
      });
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
    notification.error({
      title: "Error de validación",
      description: "Por favor, completa todos los campos requeridos",
    });
  };

  if (user) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <div className="mb-6 text-center">
          <Title level={2}>Iniciar Sesión</Title>
          <Text type="secondary">Sistema de Gestión de Caravanas</Text>
        </div>

        <Form
          form={form}
          name="login"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          size="large"
        >
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[
              { required: true, message: "El email es requerido" },
              { type: "email", message: "Email inválido" },
            ]}
          >
            <Input
              type="email"
              placeholder="tu@email.com"
              autoComplete="email"
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Contraseña"
            name="password"
            rules={[
              { required: true, message: "La contraseña es requerida" },
              {
                min: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            ]}
          >
            <Input.Password
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
            >
              Iniciar Sesión
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
