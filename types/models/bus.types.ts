import { FirestoreBaseDocument, CreateInput, UpdateInput, FirestoreTimestamp } from "../common/firestore.types";

export interface Bus extends FirestoreBaseDocument {
  name: string;
  capacity: number;
}

export interface BusStop extends FirestoreBaseDocument {
  busId: string;
  chapelId: string;
  order: number;
  pickupTime?: FirestoreTimestamp;
}

export type BusCreateInput = CreateInput<Bus>;

export type BusUpdateInput = UpdateInput<Bus>;

export type BusStopCreateInput = CreateInput<BusStop>;

export type BusStopUpdateInput = UpdateInput<BusStop>;

