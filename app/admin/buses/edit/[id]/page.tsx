"use client";

import { BusForm } from "@/features/buses/components/BusForm";
import { useBus } from "@/features/buses/hooks/buses.hooks";
import { useBusStopsByBusId } from "@/features/buses/hooks/busStops.hooks";
import { Button, Spin, Typography } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const { Title } = Typography;

export default function EditBusPage() {
  const params = useParams();
  const router = useRouter();
  const busId = params.id as string;

  const { bus, loading: loadingBus, error: busError } = useBus(busId);
  const { busStops, loading: loadingStops } = useBusStopsByBusId(busId);

  useEffect(() => {
    if (busError && !loadingBus) {
      router.push("/admin/buses");
    }
  }, [busError, loadingBus, router]);

  if (loadingBus || loadingStops) {
    return (
      <div className="p-6">
        <Spin size="large" />
      </div>
    );
  }

  if (!bus) {
    return (
      <div className="p-6">
        <Title level={2}>Autocarro não encontrado</Title>
        <Button onClick={() => router.push("/admin/buses")}>
          Voltar para lista
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Title level={2}>Editar Autocarro</Title>

      <div className="mt-6">
        <BusForm
          mode="edit"
          busId={busId}
          initialBusData={bus}
          initialBusStops={busStops}
        />
      </div>
    </div>
  );
}
