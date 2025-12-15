"use client";

import { useBus } from "@/features/buses/hooks/buses.hooks";
import {
  useCaravans,
  useDeleteCaravan,
} from "@/features/caravans/hooks/caravans.hooks";
import { CaravanWithId } from "@/features/caravans/models/caravans.model";
import { useCountActiveByBus } from "@/features/registrations/hooks/registrations.hooks";
import { App, Button, Space, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

const { Title } = Typography;

interface CaravanOccupationProps {
  caravan: CaravanWithId;
}

const CaravanOccupation = ({ caravan }: CaravanOccupationProps) => {
  const busIds = caravan.busIds || [];

  if (busIds.length === 0) {
    return <span className="text-gray-400">Sem autocarros</span>;
  }

  return (
    <div className="space-y-1">
      {busIds.map((busId) => (
        <BusOccupation key={busId} busId={busId} caravanId={caravan.id} />
      ))}
    </div>
  );
};

interface BusOccupationProps {
  busId: string;
  caravanId: string;
}

const BusOccupation = ({ busId, caravanId }: BusOccupationProps) => {
  const { bus, loading: loadingBus } = useBus(busId);
  const { count, loading: loadingCount } = useCountActiveByBus(
    caravanId,
    busId
  );

  if (loadingBus || loadingCount || !bus) {
    return <span className="text-gray-400">-</span>;
  }

  const available = bus.capacity - count;
  const isFull = count >= bus.capacity;
  const isAlmostFull = available <= 3 && available > 0;

  const color = isFull ? "red" : isAlmostFull ? "orange" : "green";

  return (
    <div className="text-sm">
      <Tag color={color}>
        {bus.name}: {count}/{bus.capacity} ({available} disponíveis)
      </Tag>
    </div>
  );
};

export const CaravansList = () => {
  const router = useRouter();
  const { notification, modal } = App.useApp();
  const { caravans, loading } = useCaravans();
  const { deleteCaravan, isPending: isDeleting } = useDeleteCaravan();

  const handleDelete = (caravan: CaravanWithId) => {
    modal.confirm({
      title: "Eliminar Caravana",
      content: `Tem certeza que deseja eliminar a caravana "${caravan.name}"?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk: () => {
        deleteCaravan(caravan.id);
        notification.success({
          title: "Sucesso",
          description: "A caravana foi eliminada com sucesso",
        });
      },
    });
  };

  const columns: ColumnsType<CaravanWithId> = [
    {
      title: "Status",
      key: "isActive",
      render: (_, record) => {
        const now = new Date();
        const formOpenAt = record.formOpenAt?.toDate();
        const formCloseAt = record.formCloseAt?.toDate();

        let isActive = false;
        if (formOpenAt && formCloseAt) {
          isActive = now >= formOpenAt && now <= formCloseAt;
        }

        return (
          <Tag color={isActive ? "green" : "default"}>
            {isActive ? "Ativa" : "Inativa"}
          </Tag>
        );
      },
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Partida",
      key: "departureAt",
      render: (_, record) => {
        const timestamp = record.departureAt;
        if (timestamp && "toDate" in timestamp) {
          return dayjs(timestamp.toDate()).format("DD/MM/YYYY HH:mm");
        }
        return "-";
      },
    },
    {
      title: "Regresso",
      key: "returnAt",
      render: (_, record) => {
        const timestamp = record.returnAt;
        if (timestamp && "toDate" in timestamp) {
          return dayjs(timestamp.toDate()).format("DD/MM/YYYY HH:mm");
        }
        return "-";
      },
    },
    {
      title: "Ocupação",
      key: "occupation",
      render: (_, record) => {
        return <CaravanOccupation caravan={record} />;
      },
    },
    {
      title: "Ações",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            onClick={() => router.push(`/admin/caravans/edit/${record.id}`)}
          >
            Editar
          </Button>
          <Button
            type="link"
            onClick={() =>
              router.push(`/admin/caravans/distribution?caravanId=${record.id}`)
            }
          >
            Ver Distribuição
          </Button>
          <Button
            type="link"
            danger
            onClick={() => handleDelete(record)}
            loading={isDeleting}
          >
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <Title level={4} style={{ margin: 0 }}>
          Lista de Caravanas
        </Title>
        <Button
          type="primary"
          onClick={() => router.push("/admin/caravans/new")}
        >
          Nova Caravana
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={caravans}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total: ${total} caravanas`,
        }}
        locale={{
          emptyText: "Nenhuma caravana criada ainda",
        }}
      />
    </>
  );
};
