import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateBusInput, UpdateBusInput } from "@/features/buses/models/buses.model";
import { BusRepository } from "@/features/buses/repositories/buses.repository";

const repository = new BusRepository();

export const useBuses = () => {
  const {
    data: buses = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["buses"],
    queryFn: () => repository.getAll(),
  });

  return {
    buses,
    loading: isLoading,
    error: error
      ? error instanceof Error
        ? error.message
        : "Erro desconhecido"
      : null,
  };
};

export const useBus = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["buses", id],
    queryFn: () => repository.getById(id),
    enabled: !!id,
  });

  return {
    bus: data,
    loading: isLoading,
    error: error
      ? error instanceof Error
        ? error.message
        : "Erro desconhecido"
      : null,
  };
};

export const useCreateBus = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (input: CreateBusInput) => repository.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["buses"] });
    },
  });

  const createBus = (input: CreateBusInput) => {
    mutation.mutate(input);
  };

  return {
    createBus,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
  };
};

export const useUpdateBus = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateBusInput }) =>
      repository.update(id, input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["buses"] });
      queryClient.invalidateQueries({ queryKey: ["buses", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["busStops"] });
    },
  });

  const updateBus = (id: string, input: UpdateBusInput) => {
    mutation.mutate({ id, input });
  };

  return {
    updateBus,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};

export const useDeleteBus = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: string) => repository.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["buses"] });
      queryClient.invalidateQueries({ queryKey: ["busStops"] });
    },
  });

  const deleteBus = (id: string) => {
    mutation.mutate(id);
  };

  return {
    deleteBus,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
