import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/lib/auth/auth.service";
import { LoginCredentials } from "@/types/auth/auth.types";
import { ApiResponse } from "@/types/common/api.types";

export async function POST(request: NextRequest) {
  try {
    const body: LoginCredentials = await request.json();

    if (!body.email || !body.password) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Email and password are required",
        },
        { status: 400 }
      );
    }

    const user = await authService.login(body);

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          chapelId: user.chapelId,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Login failed";
    
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: errorMessage,
      },
      { status: 401 }
    );
  }
}

