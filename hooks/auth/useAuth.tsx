"use client";

import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/lib/auth/auth.service";
import { AuthUser, LoginCredentials, AuthState } from "@/types/auth/auth.types";

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  const {
    data: user,
    isLoading: loading,
    refetch: refetchUser,
  } = useQuery<AuthUser | null>({
    queryKey: ["auth", "user"],
    queryFn: () => authService.getCurrentUser(),
    retry: false,
  });

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((authUser) => {
      queryClient.setQueryData(["auth", "user"], authUser);
    });

    return () => unsubscribe();
  }, [queryClient]);

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      queryClient.setQueryData(["auth", "user"], data);
      setError(null);
      router.push("/admin");
    },
    onError: (error: Error) => {
      setError(error.message);
      throw error;
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.setQueryData(["auth", "user"], null);
      queryClient.clear();
      setError(null);
      router.push("/admin/login");
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      return loginMutation.mutateAsync(credentials);
    },
    [loginMutation]
  );

  const logout = useCallback(async () => {
    return logoutMutation.mutateAsync();
  }, [logoutMutation]);

  const refreshUser = useCallback(async () => {
    await refetchUser();
  }, [refetchUser]);

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        loading,
        error,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

