"use client";

import { useBus } from "@/features/buses/hooks/buses.hooks";
import {
  useCaravan,
  useCaravans,
} from "@/features/caravans/hooks/caravans.hooks";
import { useChapels } from "@/features/chapels/hooks/chapels.hooks";
import { RegistrationForm } from "@/features/registrations/components/RegistrationForm";
import {
  useCountActiveByBus,
  useRegistrationsByBusId,
} from "@/features/registrations/hooks/registrations.hooks";
import {
  OrdinanceType,
  RegistrationWithId,
} from "@/features/registrations/models/registrations.model";
import {
  Button,
  Card,
  Drawer,
  Select,
  Spin,
  Table,
  Tag,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useSearchParams } from "next/navigation";
import React, { useMemo, useState } from "react";

const { Title } = Typography;

const ORDINANCE_TYPE_MAP: Record<OrdinanceType, string> = {
  BAPTISTRY: "Batistério",
  INITIATORY: "Iniciatória",
  ENDOWMENT: "Investidura",
  SEALING: "Selamento",
};

export const CaravanDistributionView = () => {
  const searchParams = useSearchParams();
  const initialCaravanId = searchParams.get("caravanId");
  const { caravans, loading: loadingCaravans } = useCaravans();
  const { chapels, loading: loadingChapels } = useChapels();

  const [selectedCaravanId, setSelectedCaravanId] = React.useState<string>(
    initialCaravanId || ""
  );

  const { caravan: selectedCaravan, loading: loadingCaravan } =
    useCaravan(selectedCaravanId);

  const chapelMap = useMemo(() => {
    const map = new Map<string, string>();
    chapels.forEach((chapel) => {
      map.set(chapel.id, chapel.name);
    });
    return map;
  }, [chapels]);

  return (
    <div className="space-y-4">
      <div>
        <Title level={4}>Distribuição de Passageiros</Title>
        <Select
          placeholder="Selecione uma caravana"
          value={selectedCaravanId || undefined}
          onChange={(value) => setSelectedCaravanId(value)}
          loading={loadingCaravans}
          style={{ width: 300 }}
          options={caravans.map((caravan) => ({
            label: caravan.name,
            value: caravan.id,
          }))}
        />
      </div>

      {loadingCaravan && (
        <div className="flex justify-center">
          <Spin size="large" />
        </div>
      )}

      {!loadingCaravan && selectedCaravan && (
        <div className="space-y-4">
          {selectedCaravan.busIds && selectedCaravan.busIds.length > 0 ? (
            selectedCaravan.busIds.map((busId) => (
              <BusDistributionCard
                key={busId}
                busId={busId}
                caravanId={selectedCaravan.id}
                chapelMap={chapelMap}
                loadingChapels={loadingChapels}
              />
            ))
          ) : (
            <Card>
              <p className="text-gray-500">
                Esta caravana não tem autocarros atribuídos.
              </p>
            </Card>
          )}
        </div>
      )}

      {!loadingCaravan && !selectedCaravan && selectedCaravanId && (
        <Card>
          <p className="text-gray-500">Caravana não encontrada.</p>
        </Card>
      )}

      {!selectedCaravanId && (
        <Card>
          <p className="text-gray-500">
            Selecione uma caravana para ver a distribuição de passageiros.
          </p>
        </Card>
      )}
    </div>
  );
};

interface BusDistributionCardProps {
  busId: string;
  caravanId: string;
  chapelMap: Map<string, string>;
  loadingChapels: boolean;
}

const BusDistributionCard = ({
  busId,
  caravanId,
  chapelMap,
  loadingChapels,
}: BusDistributionCardProps) => {
  const { bus, loading: loadingBus } = useBus(busId);
  const { registrations, loading: loadingRegistrations } =
    useRegistrationsByBusId(busId, caravanId);

  const { count } = useCountActiveByBus(caravanId, busId);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRegistration, setSelectedRegistration] =
    useState<RegistrationWithId | null>(null);

  const handleEdit = (record: RegistrationWithId) => {
    setSelectedRegistration(record);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedRegistration(null);
  };

  const handleEditSuccess = () => {
    setDrawerOpen(false);
    setSelectedRegistration(null);
  };

  if (loadingBus || loadingRegistrations) {
    return (
      <Card>
        <Spin />
      </Card>
    );
  }

  if (!bus) {
    return (
      <Card>
        <p className="text-gray-500">Autocarro não encontrado.</p>
      </Card>
    );
  }

  const available = bus.capacity - count;
  const isFull = count >= bus.capacity;

  const columns: ColumnsType<RegistrationWithId> = [
    {
      title: "Nome Completo",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Capela",
      key: "chapelId",
      render: (_, record) => {
        const chapelName = chapelMap.get(record.chapelId);
        return chapelName || record.chapelId;
      },
    },
    {
      title: "Status de Pagamento",
      key: "paymentStatus",
      render: (_, record) => {
        const colorMap: Record<string, string> = {
          PENDING: "orange",
          PAID: "green",
          FREE: "blue",
          CANCELLED: "red",
        };
        const labelMap: Record<string, string> = {
          PENDING: "Pendente",
          PAID: "Pago",
          FREE: "Grátis",
          CANCELLED: "Cancelado",
        };
        return (
          <Tag color={colorMap[record.paymentStatus] || "default"}>
            {labelMap[record.paymentStatus] || record.paymentStatus}
          </Tag>
        );
      },
    },
    {
      title: "Ordenança",
      key: "ordinance",
      render: (_, record) => {
        const ordinanceTypeLabel =
          ORDINANCE_TYPE_MAP[record.ordinanceType] || record.ordinanceType;
        return `${ordinanceTypeLabel} - ${record.ordinanceSlot}`;
      },
    },
    {
      title: "Ações",
      key: "actions",
      render: (_, record) => (
        <Button type="link" onClick={() => handleEdit(record)}>
          Editar
        </Button>
      ),
    },
  ];

  return (
    <>
      <Card
        title={
          <div className="flex items-center justify-between">
            <span>{bus.name}</span>
            <Tag color={isFull ? "red" : "green"}>
              {count}/{bus.capacity} lugares ({available} disponíveis)
            </Tag>
          </div>
        }
      >
        <Table
          columns={columns}
          dataSource={registrations}
          rowKey="id"
          loading={loadingRegistrations}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total: ${total} passageiros`,
          }}
          locale={{
            emptyText: "Nenhum passageiro registrado neste autocarro",
          }}
        />
      </Card>

      <Drawer
        title="Editar Inscrição"
        open={drawerOpen}
        onClose={handleDrawerClose}
        size="large"
        destroyOnClose
      >
        {selectedRegistration && (
          <RegistrationForm
            mode="edit"
            registrationId={selectedRegistration.id}
            initialRegistrationData={selectedRegistration}
            onSuccess={handleEditSuccess}
          />
        )}
      </Drawer>
    </>
  );
};
