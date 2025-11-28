"use client";

import { AuthGuard } from "./AuthGuard";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({ children, redirectTo }: ProtectedRouteProps) {
  return <AuthGuard redirectTo={redirectTo}>{children}</AuthGuard>;
}

