import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateBusStopInput,
  UpdateBusStopInput,
} from "@/features/buses/models/busStops.model";
import { BusStopRepository } from "@/features/buses/repositories/busStops.repository";

const repository = new BusStopRepository();

export const useBusStops = () => {
  const {
    data: busStops = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["busStops"],
    queryFn: () => repository.getAll(),
  });

  return {
    busStops,
    loading: isLoading,
    error: error
      ? error instanceof Error
        ? error.message
        : "Erro desconhecido"
      : null,
  };
};

export const useBusStop = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["busStops", id],
    queryFn: () => repository.getById(id),
    enabled: !!id,
  });

  return {
    busStop: data,
    loading: isLoading,
    error: error
      ? error instanceof Error
        ? error.message
        : "Erro desconhecido"
      : null,
  };
};

export const useBusStopsByBusId = (busId: string) => {
  const {
    data: busStops = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["busStops", "byBus", busId],
    queryFn: () => repository.getByBusId(busId),
    enabled: !!busId && busId.length > 0,
  });

  return {
    busStops,
    loading: isLoading,
    error: error
      ? error instanceof Error
        ? error.message
        : "Erro desconhecido"
      : null,
  };
};

export const useCreateBusStop = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (input: CreateBusStopInput) => repository.create(input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["busStops"] });
      queryClient.invalidateQueries({
        queryKey: ["busStops", "byBus", data.busId],
      });
    },
  });

  const createBusStop = (input: CreateBusStopInput) => {
    mutation.mutate(input);
  };

  return {
    createBusStop,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};

export const useUpdateBusStop = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateBusStopInput }) =>
      repository.update(id, input),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["busStops"] });
      queryClient.invalidateQueries({
        queryKey: ["busStops", variables.id],
      });
      if (data.busId) {
        queryClient.invalidateQueries({
          queryKey: ["busStops", "byBus", data.busId],
        });
      }
    },
  });

  const updateBusStop = (id: string, input: UpdateBusStopInput) => {
    mutation.mutate({ id, input });
  };

  return {
    updateBusStop,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};

export const useDeleteBusStop = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => repository.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["busStops"] });
    },
  });

  const deleteBusStop = (id: string) => {
    mutation.mutate(id);
  };

  return {
    deleteBusStop,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
