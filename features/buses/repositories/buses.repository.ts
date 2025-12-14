import { db } from "@/common/lib/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import {
  BusWithId,
  CreateBusInput,
  UpdateBusInput,
} from "../models/buses.model";

export class BusRepository {
  private collectionName = "buses";

  async getAll(): Promise<BusWithId[]> {
    const snap = await getDocs(collection(db, this.collectionName));
    return snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as BusWithId[];
  }

  async getById(id: string): Promise<BusWithId> {
    const docRef = doc(db, this.collectionName, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error(`Bus with id ${id} not found`);
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as BusWithId;
  }

  async create(input: CreateBusInput): Promise<BusWithId> {
    const now = Timestamp.now();
    const docRef = await addDoc(collection(db, this.collectionName), {
      ...input,
      createdAt: now,
      updatedAt: now,
    });

    const createdDoc = await getDoc(docRef);
    return {
      id: createdDoc.id,
      ...createdDoc.data(),
    } as BusWithId;
  }

  async update(id: string, input: UpdateBusInput): Promise<BusWithId> {
    const docRef = doc(db, this.collectionName, id);
    await updateDoc(docRef, {
      ...input,
      updatedAt: Timestamp.now(),
    });

    return this.getById(id);
  }

  async delete(id: string): Promise<void> {
    const docRef = doc(db, this.collectionName, id);
    await deleteDoc(docRef);
  }
}
