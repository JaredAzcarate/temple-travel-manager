import { CreateInput, UpdateInput, WithId } from "@/common/models/index";
import { Timestamp } from "firebase/firestore";

export interface BusStop {
  busId: string; // references buses.id
  chapelId: string; // references chapels.id
  order: number; // route order (1,2,3…)
  pickupTime?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type CreateBusStopInput = CreateInput<BusStop>;
export type UpdateBusStopInput = UpdateInput<BusStop>;
export type BusStopWithId = WithId<BusStop>;
