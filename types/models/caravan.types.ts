import { FirestoreBaseDocument, CreateInput, UpdateInput, FirestoreTimestamp } from "../common/firestore.types";

export interface Caravan extends FirestoreBaseDocument {
  name: string;
  templeName?: string;
  departureAt: FirestoreTimestamp;
  returnAt: FirestoreTimestamp;
  formOpenAt: FirestoreTimestamp;
  formCloseAt: FirestoreTimestamp;
  isActive: boolean;
  busIds: string[];
}

export type CaravanCreateInput = CreateInput<Caravan>;

export type CaravanUpdateInput = UpdateInput<Caravan>;

