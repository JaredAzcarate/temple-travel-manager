import { adminUserService } from "@/lib/services/admin-user.service";
import type { ApiResponse } from "@/types/common/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const isDevelopment = process.env.NODE_ENV === "development";
    const secretKey = request.headers.get("x-secret-key");
    const requiredSecretKey = process.env.ADMIN_CREATE_USER_SECRET_KEY;

    if (!isDevelopment && (!secretKey || secretKey !== requiredSecretKey)) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error:
            "Unauthorized. This endpoint requires a valid secret key or development mode.",
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { email, password, name, role, chapelId } = body;

    if (!email || !password || !name) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Email, password y name son requeridos",
        },
        { status: 400 }
      );
    }

    if (role === "CHAPEL" && !chapelId) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "chapelId es requerido para usuarios CHAPEL",
        },
        { status: 400 }
      );
    }

    let userId: string;

    if (role === "CHAPEL") {
      userId = await adminUserService.createChapelUser({
        email,
        password,
        name,
        chapelId,
      });
    } else {
      userId = await adminUserService.createAdminUser({
        email,
        password,
        name,
      });
    }

    return NextResponse.json<ApiResponse<{ userId: string }>>(
      {
        success: true,
        data: { userId },
        message: `Usuario ${role || "ADMIN"} creado exitosamente`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Error al crear el usuario",
      },
      { status: 500 }
    );
  }
}
