import { NextRequest } from "next/server";
import { getFirebaseAdminAuth } from "@/firebase/admin";
import { userRepository } from "@/lib/repositories/user.repository";
import { UserRole } from "@/types/models/user.types";
import { FirestoreNotFoundError } from "@/utils/firestore/errors";

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string;
    email: string;
    role: UserRole;
    chapelId?: string;
    name: string;
  };
}

export async function verifyAuth(request: NextRequest): Promise<string | null> {
  const authHeader = request.headers.get("authorization");
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.substring(7);

  try {
    const adminAuth = getFirebaseAdminAuth();
    const decodedToken = await adminAuth.verifyIdToken(token);
    return decodedToken.uid;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}

export async function getUserFromRequest(request: NextRequest): Promise<AuthenticatedRequest["user"] | null> {
  const userId = await verifyAuth(request);
  
  if (!userId) {
    return null;
  }

  try {
    const user = await userRepository.getUserById(userId);
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      chapelId: user.chapelId,
      name: user.name,
    };
  } catch (error) {
    if (error instanceof FirestoreNotFoundError) {
      return null;
    }
    throw error;
  }
}

export async function verifyRole(
  request: NextRequest,
  allowedRoles: UserRole[]
): Promise<AuthenticatedRequest["user"] | null> {
  const user = await getUserFromRequest(request);
  
  if (!user) {
    return null;
  }

  if (!allowedRoles.includes(user.role)) {
    return null;
  }

  return user;
}

