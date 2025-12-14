import { db } from "@/common/lib/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  BusStopWithId,
  CreateBusStopInput,
  UpdateBusStopInput,
} from "../models/busStops.model";

export class BusStopRepository {
  private collectionName = "busStops";

  async getAll(): Promise<BusStopWithId[]> {
    const snap = await getDocs(collection(db, this.collectionName));
    return snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as BusStopWithId[];
  }

  async getById(id: string): Promise<BusStopWithId> {
    const docRef = doc(db, this.collectionName, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error(`BusStop with id ${id} not found`);
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as BusStopWithId;
  }

  async create(input: CreateBusStopInput): Promise<BusStopWithId> {
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
    } as BusStopWithId;
  }

  async update(id: string, input: UpdateBusStopInput): Promise<BusStopWithId> {
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

  async getByBusId(busId: string): Promise<BusStopWithId[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where("busId", "==", busId),
        orderBy("order", "asc")
      );
      const snap = await getDocs(q);
      return snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as BusStopWithId[];
    } catch (error) {
      // Fallback: si el índice no existe, obtener todos y filtrar/ordenar en memoria
      if (error instanceof Error && error.message.includes("index")) {
        const allStops = await this.getAll();
        const filtered = allStops
          .filter((stop) => stop.busId === busId)
          .sort((a, b) => (a.order || 0) - (b.order || 0));
        return filtered;
      }
      throw error;
    }
  }
}
