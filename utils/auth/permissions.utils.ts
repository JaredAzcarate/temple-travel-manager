import { UserRole } from "@/types/models/user.types";

export const PERMISSIONS = {
  // Caravan permissions
  VIEW_ALL_CARAVANS: ["ADMIN", "CHAPEL"] as UserRole[],
  CREATE_CARAVAN: ["ADMIN"] as UserRole[],
  EDIT_CARAVAN: ["ADMIN"] as UserRole[],
  DELETE_CARAVAN: ["ADMIN"] as UserRole[],

  // Chapel permissions
  VIEW_ALL_CHAPELS: ["ADMIN"] as UserRole[],
  CREATE_CHAPEL: ["ADMIN"] as UserRole[],
  EDIT_CHAPEL: ["ADMIN"] as UserRole[],
  DELETE_CHAPEL: ["ADMIN"] as UserRole[],

  // User permissions
  VIEW_ALL_USERS: ["ADMIN"] as UserRole[],
  CREATE_USER: ["ADMIN"] as UserRole[],
  EDIT_USER: ["ADMIN"] as UserRole[],
  DELETE_USER: ["ADMIN"] as UserRole[],

  // Bus permissions
  VIEW_ALL_BUSES: ["ADMIN"] as UserRole[],
  CREATE_BUS: ["ADMIN"] as UserRole[],
  EDIT_BUS: ["ADMIN"] as UserRole[],
  DELETE_BUS: ["ADMIN"] as UserRole[],

  // Registration permissions
  VIEW_ALL_REGISTRATIONS: ["ADMIN"] as UserRole[],
  VIEW_OWN_CHAPEL_REGISTRATIONS: ["CHAPEL"] as UserRole[],
  EDIT_REGISTRATION: ["ADMIN", "CHAPEL"] as UserRole[],
  CHANGE_PAYMENT_STATUS: ["ADMIN", "CHAPEL"] as UserRole[],
  CHANGE_PARTICIPATION_STATUS: ["ADMIN"] as UserRole[],

  // PDF Export permissions
  EXPORT_ALL_PDFS: ["ADMIN"] as UserRole[],
  EXPORT_OWN_CHAPEL_PDF: ["CHAPEL"] as UserRole[],
} as const;

export function hasPermission(role: UserRole | undefined, permission: keyof typeof PERMISSIONS): boolean {
  if (!role) return false;
  return PERMISSIONS[permission].includes(role);
}

export function canPerformAction(role: UserRole | undefined, actions: UserRole[]): boolean {
  if (!role) return false;
  return actions.includes(role);
}

