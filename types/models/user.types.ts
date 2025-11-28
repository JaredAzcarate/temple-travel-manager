import { FirestoreBaseDocument, CreateInput, UpdateInput } from "../common/firestore.types";

export type UserRole = "ADMIN" | "CHAPEL";

export interface User extends FirestoreBaseDocument {
  name: string;
  email: string;
  role: UserRole;
  chapelId?: string;
}

export type UserCreateInput = CreateInput<User>;

export type UserUpdateInput = UpdateInput<User>;

