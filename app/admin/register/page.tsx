"use client";

import {
  useCreateUser,
  type CreateUserInput,
} from "@/hooks/users/useCreateUser";
import type { FormProps } from "antd";
import {
  Button,
  Card,
  Form,
  Input,
  notification,
  Select,
  Space,
  Typography,
} from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const { Title, Text } = Typography;
const { Option } = Select;

interface RegisterFormData extends CreateUserInput {
  confirmPassword: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [form] = Form.useForm<RegisterFormData>();
  const [role, setRole] = useState<"ADMIN" | "CHAPEL">("ADMIN");
  const createUserMutation = useCreateUser();

  const onFinish: FormProps<RegisterFormData>["onFinish"] = async (values) => {
    const userData: CreateUserInput = {
      email: values.email,
      password: values.password,
      name: values.name,
      role: values.role,
      ...(values.chapelId && { chapelId: values.chapelId }),
    };
    await createUserMutation.mutateAsync(userData);
  };

  const onFinishFailed: FormProps<RegisterFormData>["onFinishFailed"] = () => {
    notification.error({
      title: "Error de validación",
      description: "Por favor, completa todos los campos requeridos",
    });
  };

  const handleRoleChange = (value: "ADMIN" | "CHAPEL") => {
    setRole(value);
    form.setFieldsValue({ chapelId: undefined });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <div className="mb-6 text-center">
          <Title level={2}>Registrar Usuario</Title>
          <Text type="secondary">Crear nuevo usuario ADMIN o CHAPEL</Text>
        </div>

        <Form
          form={form}
          name="register"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          size="large"
          initialValues={{ role: "ADMIN" }}
        >
          <Form.Item<RegisterFormData>
            label="Nombre Completo"
            name="name"
            rules={[
              { required: true, message: "El nombre es requerido" },
              { min: 2, message: "El nombre debe tener al menos 2 caracteres" },
            ]}
          >
            <Input placeholder="Juan Pérez" />
          </Form.Item>

          <Form.Item<RegisterFormData>
            label="Email"
            name="email"
            rules={[
              { required: true, message: "El email es requerido" },
              { type: "email", message: "Email inválido" },
            ]}
          >
            <Input type="email" placeholder="usuario@example.com" />
          </Form.Item>

          <Form.Item<RegisterFormData>
            label="Rol"
            name="role"
            rules={[{ required: true, message: "El rol es requerido" }]}
          >
            <Select onChange={handleRoleChange}>
              <Option value="ADMIN">Administrador</Option>
              <Option value="CHAPEL">Capilla</Option>
            </Select>
          </Form.Item>

          {role === "CHAPEL" && (
            <Form.Item<RegisterFormData>
              label="ID de Capilla"
              name="chapelId"
              rules={[
                {
                  required: true,
                  message: "El ID de capilla es requerido para usuarios CHAPEL",
                },
              ]}
            >
              <Input placeholder="chapel-id-123" />
            </Form.Item>
          )}

          <Form.Item<RegisterFormData>
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
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          <Form.Item<RegisterFormData>
            label="Confirmar Contraseña"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Por favor confirma la contraseña" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Las contraseñas no coinciden")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          <Form.Item className="mb-0">
            <Space orientation="vertical" className="w-full" size="middle">
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={createUserMutation.isPending}
              >
                Crear Usuario
              </Button>
              <Button
                type="link"
                block
                onClick={() => router.push("/admin/login")}
              >
                ¿Ya tienes cuenta? Iniciar Sesión
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
