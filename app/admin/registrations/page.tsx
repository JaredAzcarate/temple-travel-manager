"use client";

import { CreateRegistrationForm } from "@/features/registrations/components/CreateRegistrationForm";
import { Typography } from "antd";

const { Title } = Typography;

export default function RegistrationsPage() {
  return (
    <div className="p-6">
      <Title level={2}>Gestão de Inscrições</Title>
      <div className="mt-6">
        <Title level={4}>Criar Nova Inscrição</Title>
        <CreateRegistrationForm />
      </div>
    </div>
  );
}
