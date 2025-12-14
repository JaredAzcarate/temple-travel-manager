"use client";

import { useBuses } from "@/features/buses/hooks/buses.hooks";
import {
  useActiveCaravans,
  useCaravan,
} from "@/features/caravans/hooks/caravans.hooks";
import { useChapels } from "@/features/chapels/hooks/chapels.hooks";
import { App, Button, Form, Input, Radio, Select, Switch } from "antd";
import { useEffect, useMemo } from "react";
import { useCreateRegistration } from "../hooks/registrations.hooks";
import {
  CreateRegistrationInput,
  OrdinanceType,
} from "../models/registrations.model";

interface FormValues {
  caravanId: string;
  chapelId: string;
  busId: string;
  phone: string;
  fullName: string;
  isAdult: boolean;
  gender: "M" | "F";
  isOfficiator: boolean;
  legalGuardianName?: string;
  legalGuardianEmail?: string;
  legalGuardianPhone?: string;
  ordinanceType: OrdinanceType;
  ordinanceSlot: string;
  isFirstTimeConvert: boolean;
}

const ORDINANCE_SLOTS: Record<OrdinanceType, string[]> = {
  INITIATORY: [
    "9:30-10:00",
    "10:00-10:30",
    "10:30-11:00",
    "14:00-14:30",
    "14:30-15:00",
    "15:00-15:30",
    "15:30-16:00",
  ],
  BAPTISTRY: ["9:30-11:00", "11:00-12:30", "14:00-15:30"],
  ENDOWMENT: [
    "9:00-10:00",
    "10:00-11:00",
    "11:00-12:00",
    "14:00-15:00",
    "15:00-16:00",
    "16:00-17:00",
  ],
  SEALING: ["10:00-11:00", "11:00-12:00", "15:00-16:00", "16:00-17:00"],
};

export const CreateRegistrationForm = () => {
  const { notification } = App.useApp();
  const [form] = Form.useForm<FormValues>();
  const { createRegistration, isPending, isSuccess, error } =
    useCreateRegistration();
  const { caravans: activeCaravans, loading: loadingCaravans } =
    useActiveCaravans();
  const { chapels, loading: loadingChapels } = useChapels();
  const { buses, loading: loadingBuses } = useBuses();

  const selectedCaravanId = Form.useWatch("caravanId", form);
  const selectedOrdinanceType = Form.useWatch("ordinanceType", form);
  const isAdult = Form.useWatch("isAdult", form);

  const { caravan: selectedCaravan } = useCaravan(selectedCaravanId || "");

  const availableBuses = useMemo(() => {
    if (!selectedCaravan) return buses;
    return buses.filter((bus) => selectedCaravan.busIds.includes(bus.id));
  }, [buses, selectedCaravan]);

  const availableSlots = useMemo(() => {
    if (!selectedOrdinanceType) return [];
    return ORDINANCE_SLOTS[selectedOrdinanceType] || [];
  }, [selectedOrdinanceType]);

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        title: "Sucesso",
        description: "A inscrição foi criada com sucesso",
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
        description: `Não foi possível criar a inscrição: ${errorMessage}`,
      });
    }
  }, [error, notification]);

  useEffect(() => {
    if (selectedOrdinanceType && availableSlots.length > 0) {
      form.setFieldsValue({ ordinanceSlot: availableSlots[0] });
    }
  }, [selectedOrdinanceType, availableSlots, form]);

  useEffect(() => {
    if (!isAdult) {
      form.setFieldsValue({
        legalGuardianName: undefined,
        legalGuardianEmail: undefined,
        legalGuardianPhone: undefined,
      });
    }
  }, [isAdult, form]);

  const handleSubmit = (values: FormValues) => {
    const paymentStatus: "PENDING" | "FREE" = values.isFirstTimeConvert
      ? "FREE"
      : "PENDING";

    const input: CreateRegistrationInput = {
      caravanId: values.caravanId,
      chapelId: values.chapelId,
      busId: values.busId,
      phone: values.phone,
      fullName: values.fullName,
      isAdult: values.isAdult,
      gender: values.gender,
      isOfficiator: values.isOfficiator,
      legalGuardianName: values.legalGuardianName,
      legalGuardianEmail: values.legalGuardianEmail,
      legalGuardianPhone: values.legalGuardianPhone,
      ordinanceType: values.ordinanceType,
      ordinanceSlot: values.ordinanceSlot,
      isFirstTimeConvert: values.isFirstTimeConvert,
      paymentStatus,
      participationStatus: "ACTIVE",
    };
    createRegistration(input);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      style={{ maxWidth: 800 }}
    >
      <Form.Item
        name="caravanId"
        label="Caravana"
        rules={[
          { required: true, message: "Por favor, selecione uma caravana" },
        ]}
      >
        <Select
          placeholder="Selecione uma caravana"
          loading={loadingCaravans}
          options={activeCaravans.map((caravan) => ({
            label: caravan.name,
            value: caravan.id,
          }))}
        />
      </Form.Item>

      <Form.Item
        name="chapelId"
        label="Capela de Partida"
        rules={[{ required: true, message: "Por favor, selecione uma capela" }]}
      >
        <Select
          placeholder="Selecione uma capela"
          loading={loadingChapels}
          options={chapels.map((chapel) => ({
            label: chapel.name,
            value: chapel.id,
          }))}
        />
      </Form.Item>

      <Form.Item
        name="busId"
        label="Autocarro"
        rules={[
          { required: true, message: "Por favor, selecione um autocarro" },
        ]}
      >
        <Select
          placeholder="Selecione um autocarro"
          loading={loadingBuses}
          disabled={!selectedCaravanId}
          options={availableBuses.map((bus) => ({
            label: `${bus.name} (Capacidade: ${bus.capacity})`,
            value: bus.id,
          }))}
        />
      </Form.Item>

      <Form.Item
        name="fullName"
        label="Nome Completo"
        rules={[
          { required: true, message: "Por favor, insira o nome completo" },
        ]}
      >
        <Input placeholder="Ex: João Silva" />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Número de Telefone"
        rules={[
          { required: true, message: "Por favor, insira o número de telefone" },
          {
            pattern: /^\+?[1-9]\d{1,14}$/,
            message: "Por favor, insira um número de telefone válido",
          },
        ]}
      >
        <Input placeholder="Ex: +351912345678" />
      </Form.Item>

      <Form.Item
        name="isAdult"
        label="És adulto ou jovem?"
        rules={[{ required: true, message: "Por favor, selecione uma opção" }]}
        valuePropName="checked"
      >
        <Switch checkedChildren="Adulto" unCheckedChildren="Jovem" />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Sexo"
        rules={[{ required: true, message: "Por favor, selecione o sexo" }]}
      >
        <Radio.Group>
          <Radio value="M">Masculino</Radio>
          <Radio value="F">Feminino</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="isOfficiator"
        label="És oficiante?"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      {!isAdult && (
        <>
          <Form.Item
            name="legalGuardianName"
            label="Nome do Responsável Legal"
            rules={[
              {
                required: !isAdult,
                message: "Por favor, insira o nome do responsável legal",
              },
            ]}
          >
            <Input placeholder="Ex: Maria Silva" />
          </Form.Item>

          <Form.Item
            name="legalGuardianEmail"
            label="Email do Responsável Legal"
            rules={[
              {
                type: "email",
                message: "Por favor, insira um email válido",
              },
            ]}
          >
            <Input placeholder="Ex: maria@exemplo.pt" />
          </Form.Item>

          <Form.Item
            name="legalGuardianPhone"
            label="Telefone do Responsável Legal"
            rules={[
              {
                pattern: /^\+?[1-9]\d{1,14}$/,
                message: "Por favor, insira um número de telefone válido",
              },
            ]}
          >
            <Input placeholder="Ex: +351912345678" />
          </Form.Item>
        </>
      )}

      <Form.Item
        name="ordinanceType"
        label="Tipo de Ordenança"
        rules={[
          {
            required: true,
            message: "Por favor, selecione o tipo de ordenança",
          },
        ]}
      >
        <Select placeholder="Selecione o tipo de ordenança">
          <Select.Option value="BAPTISTRY">Batistério</Select.Option>
          <Select.Option value="INITIATORY">Iniciatória</Select.Option>
          <Select.Option value="ENDOWMENT">Investidura</Select.Option>
          <Select.Option value="SEALING">Selamento</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="ordinanceSlot"
        label="Horário"
        rules={[{ required: true, message: "Por favor, selecione um horário" }]}
      >
        <Select
          placeholder="Selecione um horário"
          disabled={!selectedOrdinanceType}
          options={availableSlots.map((slot) => ({
            label: slot,
            value: slot,
          }))}
        />
      </Form.Item>

      <Form.Item
        name="isFirstTimeConvert"
        label="É a sua primeira vez no templo como recém-converso?"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isPending} block>
          {isPending ? "A criar..." : "Criar Inscrição"}
        </Button>
      </Form.Item>
    </Form>
  );
};
