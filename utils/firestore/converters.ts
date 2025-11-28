import { Timestamp } from "firebase/firestore";
import { FirestoreTimestamp } from "../../types/common/firestore.types";

export function timestampToDate(timestamp: FirestoreTimestamp): Date {
  return timestamp.toDate();
}

export function dateToTimestamp(date: Date): Timestamp {
  return Timestamp.fromDate(date);
}

export function nowTimestamp(): Timestamp {
  return Timestamp.now();
}

export function isValidTimestamp(value: unknown): value is FirestoreTimestamp {
  return value instanceof Timestamp;
}

