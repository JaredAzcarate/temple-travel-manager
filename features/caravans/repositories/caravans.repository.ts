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
  CaravanWithId,
  CreateCaravanInput,
  UpdateCaravanInput,
} from "../models/caravans.model";

export class CaravanRepository {
  private collectionName = "caravans";

  async getAll(): Promise<CaravanWithId[]> {
    const snap = await getDocs(collection(db, this.collectionName));
    return snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as CaravanWithId[];
  }

  async getById(id: string): Promise<CaravanWithId> {
    const docRef = doc(db, this.collectionName, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error(`Caravan with id ${id} not found`);
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as CaravanWithId;
  }

  async create(input: CreateCaravanInput): Promise<CaravanWithId> {
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
    } as CaravanWithId;
  }

  async update(id: string, input: UpdateCaravanInput): Promise<CaravanWithId> {
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

  async getActive(): Promise<CaravanWithId[]> {
    const now = Timestamp.now();
    const allCaravans = await this.getAll();

    // Filter caravans where current time is between formOpenAt and formCloseAt
    return allCaravans.filter((caravan) => {
      const formOpenAt = caravan.formOpenAt;
      const formCloseAt = caravan.formCloseAt;

      if (!formOpenAt || !formCloseAt) return false;

      const nowMillis = now.toMillis();
      const openMillis = formOpenAt.toMillis();
      const closeMillis = formCloseAt.toMillis();

      return nowMillis >= openMillis && nowMillis <= closeMillis;
    });
  }
}
