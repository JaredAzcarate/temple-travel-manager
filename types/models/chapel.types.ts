import { FirestoreBaseDocument, CreateInput, UpdateInput } from "../common/firestore.types";

export interface Chapel extends FirestoreBaseDocument {
  name: string;
  whatsappPhone?: string;
  email?: string;
  address?: string;
}

export type ChapelCreateInput = CreateInput<Chapel>;

export type ChapelUpdateInput = UpdateInput<Chapel>;

