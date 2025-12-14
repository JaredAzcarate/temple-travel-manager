import { CreateInput, UpdateInput, WithId } from "@/common/models/index";
import { Timestamp } from "firebase/firestore";

export interface Caravan {
  name: string;
  templeName?: string;
  departureAt: Timestamp;
  returnAt: Timestamp;
  formOpenAt: Timestamp;
  formCloseAt: Timestamp;
  isActive: boolean;
  busIds: string[]; // references to buses.id
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type CreateCaravanInput = CreateInput<Caravan>;
export type UpdateCaravanInput = UpdateInput<Caravan>;
export type CaravanWithId = WithId<Caravan>;
