import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { getFirebaseAuth } from "@/firebase/client";
import { userRepository } from "@/lib/repositories/user.repository";
import { AuthUser, LoginCredentials } from "@/types/auth/auth.types";
import { FirestoreNotFoundError, FirestorePermissionError } from "@/utils/firestore/errors";

export class AuthService {
  private readonly auth = getFirebaseAuth();

  async login(credentials: LoginCredentials): Promise<AuthUser> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        credentials.email,
        credentials.password
      );

      const firebaseUser = userCredential.user;
      const userData = await userRepository.getUserByEmail(credentials.email);

      if (!userData) {
        await signOut(this.auth);
        throw new FirestoreNotFoundError("User", credentials.email);
      }

      if (userData.id !== firebaseUser.uid) {
        await this.logout();
        throw new FirestorePermissionError("User ID mismatch between Auth and Firestore");
      }

      return {
        ...userData,
        firebaseUser,
      };
    } catch (error) {
      if (error instanceof FirestoreNotFoundError || error instanceof FirestorePermissionError) {
        throw error;
      }

      throw new Error("Invalid email or password");
    }
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    const firebaseUser = this.auth.currentUser;
    if (!firebaseUser) {
      return null;
    }

    try {
      const userData = await userRepository.getUserById(firebaseUser.uid);
      return {
        ...userData,
        firebaseUser,
      };
    } catch (error) {
      if (error instanceof FirestoreNotFoundError) {
        await this.logout();
        return null;
      }
      throw error;
    }
  }

  onAuthStateChanged(callback: (user: AuthUser | null) => void): () => void {
    return onAuthStateChanged(this.auth, async (firebaseUser) => {
      if (!firebaseUser) {
        callback(null);
        return;
      }

      try {
        const userData = await userRepository.getUserById(firebaseUser.uid);
        callback({
          ...userData,
          firebaseUser,
        });
      } catch (error) {
        if (error instanceof FirestoreNotFoundError) {
          callback(null);
        } else {
          console.error("Error fetching user data:", error);
          callback(null);
        }
      }
    });
  }
}

export const authService = new AuthService();

