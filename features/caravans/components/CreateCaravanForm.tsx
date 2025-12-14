"use client";

import { App, Button, DatePicker, Form, Input, Switch } from "antd";
import type { Dayjs } from "dayjs";
import { Timestamp } from "firebase/firestore";
import { useEffect } from "react";
import { useCreateCaravan } from "../hooks/caravans.hooks";
import { CreateCaravanInput } from "../models/caravans.model";

interface FormValues {
  name: string;
  templeName?: string;
  departureAt: Dayjs;
  returnAt: Dayjs;
  formOpenAt: Dayjs;
  formCloseAt: Dayjs;
  isActive: boolean;
  busIds?: string[];
}

export const CreateCaravanForm = () => {
  const { notification } = App.useApp();
  const [form] = Form.useForm<FormValues>();
  const { createCaravan, isPending, isSuccess, error } = useCreateCaravan();

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        title: "Sucesso",
        description: "A caravana foi criada com sucesso",
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
        description: `Não foi possível criar a caravana: ${errorMessage}`,
      });
    }
  }, [error, notification]);

  const handleSubmit = (values: FormValues) => {
    const convertToTimestamp = (dayjsValue: Dayjs): Timestamp => {
      return Timestamp.fromDate(dayjsValue.toDate());
    };

    const input: CreateCaravanInput = {
      name: values.name,
      templeName: values.templeName,
      departureAt: convertToTimestamp(values.departureAt),
      returnAt: convertToTimestamp(values.returnAt),
      formOpenAt: convertToTimestamp(values.formOpenAt),
      formCloseAt: convertToTimestamp(values.formCloseAt),
      isActive: values.isActive ?? false,
      busIds: values.busIds ?? [],
    };
    createCaravan(input);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      style={{ maxWidth: 600 }}
      initialValues={{
        isActive: false,
        busIds: [],
      }}
    >
      <Form.Item
        name="name"
        label="Nome da Caravana"
        rules={[
          { required: true, message: "Por favor, insira o nome da caravana" },
        ]}
      >
        <Input placeholder="Ex: Caravana de Março 2025" />
      </Form.Item>

      <Form.Item name="templeName" label="Nome do Templo">
        <Input placeholder="Ex: Templo de Lisboa" />
      </Form.Item>

      <Form.Item
        name="departureAt"
        label="Data e Hora de Partida"
        rules={[
          {
            required: true,
            message: "Por favor, selecione a data e hora de partida",
          },
        ]}
      >
        <DatePicker
          showTime
          format="DD/MM/YYYY HH:mm"
          placeholder="Selecione a data e hora de partida"
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item
        name="returnAt"
        label="Data e Hora de Retorno"
        rules={[
          {
            required: true,
            message: "Por favor, selecione a data e hora de retorno",
          },
        ]}
      >
        <DatePicker
          showTime
          format="DD/MM/YYYY HH:mm"
          placeholder="Selecione a data e hora de retorno"
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item
        name="formOpenAt"
        label="Data e Hora de Abertura do Formulário"
        rules={[
          {
            required: true,
            message: "Por favor, selecione a data e hora de abertura",
          },
        ]}
      >
        <DatePicker
          showTime
          format="DD/MM/YYYY HH:mm"
          placeholder="Selecione quando o formulário será aberto"
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item
        name="formCloseAt"
        label="Data e Hora de Fechamento do Formulário"
        rules={[
          {
            required: true,
            message: "Por favor, selecione a data e hora de fechamento",
          },
        ]}
      >
        <DatePicker
          showTime
          format="DD/MM/YYYY HH:mm"
          placeholder="Selecione quando o formulário será fechado"
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item name="isActive" label="Caravana Ativa" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isPending} block>
          {isPending ? "A criar..." : "Criar Caravana"}
        </Button>
      </Form.Item>
    </Form>
  );
};
