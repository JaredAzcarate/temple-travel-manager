"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "./useAuthState";

interface UseProtectedRouteOptions {
  redirectTo?: string;
  requireAuth?: boolean;
}

export function useProtectedRoute(options: UseProtectedRouteOptions = {}) {
  const { redirectTo = "/admin/login", requireAuth = true } = options;
  const { isAuthenticated, loading } = useAuthState();
  const router = useRouter();

  useEffect(() => {
    if (!loading && requireAuth && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, loading, requireAuth, redirectTo, router]);

  return {
    isAuthenticated,
    loading,
    isAccessible: requireAuth ? isAuthenticated : true,
  };
}
