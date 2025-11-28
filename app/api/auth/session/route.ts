import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth/auth.middleware";
import { ApiResponse } from "@/types/common/api.types";

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        data: {
          authenticated: !!user,
          user: user || null,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Failed to check session",
      },
      { status: 500 }
    );
  }
}

