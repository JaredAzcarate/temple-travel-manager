"use client";

import { CreateChapelForm } from "@/features/chapels/components/CreateChapelForm";
import { Typography } from "antd";

const { Title } = Typography;

export default function ChapelsPage() {
  return (
    <div className="p-6">
      <Title level={2}>Gestão de Capelas</Title>
      <div className="mt-6">
        <Title level={4}>Criar Nova Capela</Title>
        <CreateChapelForm />
      </div>
    </div>
  );
}
