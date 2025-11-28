export const COLLECTIONS = {
  CHAPELS: "chapels",
  USERS: "users",
  CARAVANS: "caravans",
  BUSES: "buses",
  BUS_STOPS: "busStops",
  REGISTRATIONS: "registrations",
} as const;

export type CollectionName = typeof COLLECTIONS[keyof typeof COLLECTIONS];

