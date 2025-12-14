"use client";

import { CreateCaravanForm } from "@/features/caravans/components/CreateCaravanForm";
import { Typography } from "antd";

const { Title } = Typography;

export default function CaravansPage() {
  return (
    <div className="p-6">
      <Title level={2}>Gestão de Caravanas</Title>
      <div className="mt-6">
        <Title level={4}>Criar Nova Caravana</Title>
        <CreateCaravanForm />
      </div>
    </div>
  );
}
