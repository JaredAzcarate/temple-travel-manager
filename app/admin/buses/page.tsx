"use client";

import { BusesList } from "@/features/buses/components/BusesList";
import { Typography } from "antd";

const { Title } = Typography;

export default function BusesPage() {
  return (
    <div className="p-6">
      <Title level={2}>Gestão de Autocarros</Title>

      <div className="mt-8">
        <BusesList />
      </div>
    </div>
  );
}
