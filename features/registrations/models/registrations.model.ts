import { CreateInput, UpdateInput, WithId } from "@/common/models/index";
import { Timestamp } from "firebase/firestore";

export type OrdinanceType =
  | "BAPTISTRY"
  | "INITIATORY"
  | "ENDOWMENT"
  | "SEALING";

export type PaymentStatus = "PENDING" | "PAID" | "FREE" | "CANCELLED";

export type ParticipationStatus = "ACTIVE" | "CANCELLED";

export interface Registration {
  caravanId: string; // references caravans.id
  chapelId: string; // chapel of departure
  busId: string; // assigned bus

  phone: string; // main identifier for this caravan (unique per caravanId)
  fullName: string;
  isAdult: boolean; // true = adult, false = youth
  gender: "M" | "F";
  isOfficiator: boolean;

  legalGuardianName?: string;
  legalGuardianEmail?: string;
  legalGuardianPhone?: string;

  ordinanceType: OrdinanceType;
  ordinanceSlot: string; // e.g. "9:30-10:00"

  isFirstTimeConvert: boolean;
  paymentStatus: PaymentStatus;
  paymentConfirmedAt?: Timestamp;
  userReportedPaymentAt?: Timestamp;

  participationStatus: ParticipationStatus;
  cancellationReason?: string;
  cancelledAt?: Timestamp;

  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type CreateRegistrationInput = CreateInput<Registration>;
export type UpdateRegistrationInput = UpdateInput<Registration>;
export type RegistrationWithId = WithId<Registration>;
