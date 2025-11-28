"use client";

import { UserRole } from "@/types/models/user.types";
import { hasRole } from "@/utils/auth/role.utils";
import { useAuthState } from "./useAuthState";

export function useRoleCheck(requiredRole: UserRole): boolean {
  const { user } = useAuthState();

  if (!user) {
    return false;
  }

  return hasRole(user.role, requiredRole);
}

export function useIsAdmin(): boolean {
  return useRoleCheck("ADMIN");
}

export function useIsChapel(): boolean {
  return useRoleCheck("CHAPEL");
}
