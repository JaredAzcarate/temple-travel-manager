import { FirestoreBaseDocument, CreateInput, UpdateInput, FirestoreTimestamp } from "../common/firestore.types";

export type OrdinanceType = "BAPTISTRY" | "INITIATORY" | "ENDOWMENT" | "SEALING";

export type PaymentStatus = "PENDING" | "PAID" | "FREE" | "CANCELLED";

export type ParticipationStatus = "ACTIVE" | "CANCELLED";

export type Gender = "M" | "F";

export interface Registration extends FirestoreBaseDocument {
  caravanId: string;
  chapelId: string;
  busId: string;
  phone: string;
  fullName: string;
  isAdult: boolean;
  gender: Gender;
  isOfficiator: boolean;
  legalGuardianName?: string;
  legalGuardianEmail?: string;
  legalGuardianPhone?: string;
  ordinanceType: OrdinanceType;
  ordinanceSlot: string;
  isFirstTimeConvert: boolean;
  paymentStatus: PaymentStatus;
  paymentConfirmedAt?: FirestoreTimestamp;
  userReportedPaymentAt?: FirestoreTimestamp;
  participationStatus: ParticipationStatus;
  cancellationReason?: string;
  cancelledAt?: FirestoreTimestamp;
}

export type RegistrationCreateInput = CreateInput<Registration>;

export type RegistrationUpdateInput = UpdateInput<Registration>;

