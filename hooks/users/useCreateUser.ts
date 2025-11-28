import type { ApiResponse } from "@/types/common/api.types";
import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import { useRouter } from "next/navigation";

export interface CreateUserInput {
  email: string;
  password: string;
  name: string;
  role: "ADMIN" | "CHAPEL";
  chapelId?: string;
}

interface CreateUserResponse {
  userId: string;
}

export function useCreateUser() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: CreateUserInput): Promise<CreateUserResponse> => {
      const response = await fetch("/api/admin/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result: ApiResponse<CreateUserResponse> = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Error al crear el usuario");
      }

      if (!result.data) {
        throw new Error("No se recibió información del usuario creado");
      }

      return result.data;
    },
    onSuccess: () => {
      notification.success({
        title: "Usuario creado",
        description: "El usuario ha sido creado exitosamente",
      });
      router.push("/admin/login");
    },
    onError: (error: Error) => {
      notification.error({
        title: "Error al crear usuario",
        description: error.message || "Ocurrió un error inesperado",
      });
    },
  });
}
