"use client";

import { useAuth } from "./useAuth";
import { AuthUser } from "@/types/auth/auth.types";

export function useAuthState(): {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
} {
  const { user, loading } = useAuth();

  return {
    user,
    loading,
    isAuthenticated: !!user && !loading,
  };
}

