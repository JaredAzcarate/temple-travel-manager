import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { getFirebaseFirestore } from "@/firebase/client";
import { COLLECTIONS } from "@/firebase/config/config";
import { User, UserCreateInput, UserUpdateInput, WithId } from "@/types/models/user.types";
import { FirestoreNotFoundError } from "@/utils/firestore/errors";
import { nowTimestamp } from "@/utils/firestore/converters";

export class UserRepository {
  private readonly collectionName = COLLECTIONS.USERS;
  private readonly firestore = getFirebaseFirestore();

  async getUserById(id: string): Promise<WithId<User>> {
    const docRef = doc(this.firestore, this.collectionName, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new FirestoreNotFoundError("User", id);
    }

    return {
      id: docSnap.id,
      ...(docSnap.data() as User),
    };
  }

  async getUserByEmail(email: string): Promise<WithId<User> | null> {
    const q = query(
      collection(this.firestore, this.collectionName),
      where("email", "==", email)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const docSnap = querySnapshot.docs[0];
    return {
      id: docSnap.id,
      ...(docSnap.data() as User),
    };
  }

  async createUser(data: UserCreateInput): Promise<string> {
    const now = nowTimestamp();
    const userData: User = {
      ...data,
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await addDoc(collection(this.firestore, this.collectionName), userData);
    return docRef.id;
  }

  async updateUser(id: string, data: UserUpdateInput): Promise<void> {
    const docRef = doc(this.firestore, this.collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: nowTimestamp(),
    });
  }

  async getAllUsers(): Promise<WithId<User>[]> {
    const querySnapshot = await getDocs(collection(this.firestore, this.collectionName));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as User),
    }));
  }

  async getUsersByRole(role: User["role"]): Promise<WithId<User>[]> {
    const q = query(
      collection(this.firestore, this.collectionName),
      where("role", "==", role)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as User),
    }));
  }

  async getUsersByChapel(chapelId: string): Promise<WithId<User>[]> {
    const q = query(
      collection(this.firestore, this.collectionName),
      where("chapelId", "==", chapelId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as User),
    }));
  }
}

export const userRepository = new UserRepository();

