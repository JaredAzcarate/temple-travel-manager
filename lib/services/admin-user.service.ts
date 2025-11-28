import {
  getFirebaseAdminAuth,
  getFirebaseAdminFirestore,
} from "@/firebase/admin";
import { COLLECTIONS } from "@/firebase/config/config";
import { User } from "@/types/models/user.types";
import { Timestamp } from "firebase-admin/firestore";

export interface CreateAdminUserInput {
  email: string;
  password: string;
  name: string;
}

export class AdminUserService {
  private readonly adminAuth = getFirebaseAdminAuth();
  private readonly adminFirestore = getFirebaseAdminFirestore();

  async createAdminUser(input: CreateAdminUserInput): Promise<string> {
    const { email, password, name } = input;

    try {
      const userRecord = await this.adminAuth.createUser({
        email,
        password,
        emailVerified: true,
      });

      const userId = userRecord.uid;
      const now = Timestamp.now();

      const userData: User = {
        name,
        email,
        role: "ADMIN",
        createdAt: now,
        updatedAt: now,
      };

      await this.adminFirestore
        .collection(COLLECTIONS.USERS)
        .doc(userId)
        .set(userData);

      return userId;
    } catch (error) {
      if (error instanceof Error && error.message.includes("already exists")) {
        throw new Error(`El usuario con email ${email} ya existe`);
      }
      throw error;
    }
  }

  async createChapelUser(
    input: CreateAdminUserInput & { chapelId: string }
  ): Promise<string> {
    const { email, password, name, chapelId } = input;

    try {
      const userRecord = await this.adminAuth.createUser({
        email,
        password,
        emailVerified: true,
      });

      const userId = userRecord.uid;
      const now = Timestamp.now();

      const userData: User = {
        name,
        email,
        role: "CHAPEL",
        chapelId,
        createdAt: now,
        updatedAt: now,
      };

      await this.adminFirestore
        .collection(COLLECTIONS.USERS)
        .doc(userId)
        .set(userData);

      return userId;
    } catch (error) {
      if (error instanceof Error && error.message.includes("already exists")) {
        throw new Error(`El usuario con email ${email} ya existe`);
      }
      throw error;
    }
  }
}

export const adminUserService = new AdminUserService();
