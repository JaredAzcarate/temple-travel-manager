import { User as FirebaseUser } from "firebase/auth";
import { User, UserRole } from "../models/user.types";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser extends User {
  firebaseUser: FirebaseUser;
}

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

export interface SessionData {
  user: User;
  role: UserRole;
  chapelId?: string;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

