"use client";

import { useAuthState } from "@/hooks/auth/useAuthState";
import { UserRole } from "@/types/models/user.types";
import { canAccessAdminArea } from "@/utils/auth/role.utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Result, Button } from "antd";

interface RequireRoleProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallback?: React.ReactNode;
}

export function RequireRole({ children, allowedRoles, fallback }: RequireRoleProps) {
  const { user, loading } = useAuthState();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && !allowedRoles.includes(user.role)) {
      router.push("/admin");
    }
  }, [user, loading, allowedRoles, router]);

  if (loading) {
    return null;
  }

  if (!user) {
    return null;
  }

  if (!allowedRoles.includes(user.role)) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <Result
        status="403"
        title="403"
        subTitle="No tienes permisos para acceder a esta página."
        extra={
          <Button type="primary" onClick={() => router.push("/admin")}>
            Volver al Dashboard
          </Button>
        }
      />
    );
  }

  return <>{children}</>;
}

