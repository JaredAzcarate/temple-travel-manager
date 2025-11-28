import type { Timestamp } from "firebase/firestore";

export type WithId<T> = T & { id: string };

export type FirestoreTimestamp = Timestamp;

export interface FirestoreBaseDocument {
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

export type CreateInput<T> = Omit<T, "id" | "createdAt" | "updatedAt">;

export type UpdateInput<T> = Partial<CreateInput<T>>;

