import { CreateInput, UpdateInput, WithId } from "@/common/models/index";
import { Timestamp } from "firebase/firestore";

export interface Bus {
  name: string;
  capacity: number; // max ACTIVE registrations per caravan for this bus
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type CreateBusInput = CreateInput<Bus>;
export type UpdateBusInput = UpdateInput<Bus>;
export type BusWithId = WithId<Bus>;
