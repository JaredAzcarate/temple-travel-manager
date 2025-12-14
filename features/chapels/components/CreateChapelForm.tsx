"use client";

import { App, Button, Form, Input } from "antd";
import { useEffect } from "react";
import { useCreateChapel } from "../hooks/chapels.hooks";
import { CreateChapelInput } from "../models/chapels.model";

interface FormValues {
  name: string;
  whatsappPhone?: string;
  email?: string;
  address?: string;
}

export const CreateChapelForm = () => {
  const { notification } = App.useApp();
  const [form] = Form.useForm<FormValues>();
  const { createChapel, isPending, isSuccess, error } = useCreateChapel();

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        title: "Sucesso",
        description: "A capela foi criada com sucesso",
      });
      form.resetFields();
    }
  }, [isSuccess, form, notification]);

  useEffect(() => {
    if (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";
      notification.error({
        title: "Erro",
        description: `Não foi possível criar a capela: ${errorMessage}`,
      });
    }
  }, [error, notification]);

  const handleSubmit = (values: FormValues) => {
    const input: CreateChapelInput = {
      name: values.name,
      whatsappPhone: values.whatsappPhone,
      email: values.email,
      address: values.address,
    };
    createChapel(input);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        name="name"
        label="Nome da Capela"
        rules={[
          { required: true, message: "Por favor, insira o nome da capela" },
        ]}
      >
        <Input placeholder="Ex: Capela de Lisboa" />
      </Form.Item>

      <Form.Item
        name="whatsappPhone"
        label="Telefone WhatsApp"
        rules={[
          {
            pattern: /^\+?[1-9]\d{1,14}$/,
            message: "Por favor, insira um número de telefone válido",
          },
        ]}
      >
        <Input placeholder="Ex: +351912345678" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            type: "email",
            message: "Por favor, insira um email válido",
          },
        ]}
      >
        <Input placeholder="Ex: capela@exemplo.pt" />
      </Form.Item>

      <Form.Item name="address" label="Endereço">
        <Input.TextArea
          placeholder="Ex: Rua Exemplo, 123, 1000-000 Lisboa"
          rows={3}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isPending} block>
          {isPending ? "A criar..." : "Criar Capela"}
        </Button>
      </Form.Item>
    </Form>
  );
};
