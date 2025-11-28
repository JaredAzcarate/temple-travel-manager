import { UserRole } from "@/types/models/user.types";

export function isAdmin(role: UserRole | undefined): boolean {
  return role === "ADMIN";
}

export function isChapel(role: UserRole | undefined): boolean {
  return role === "CHAPEL";
}

export function hasRole(userRole: UserRole | undefined, requiredRole: UserRole): boolean {
  return userRole === requiredRole;
}

export function canAccessAdminArea(role: UserRole | undefined): boolean {
  return role === "ADMIN" || role === "CHAPEL";
}

