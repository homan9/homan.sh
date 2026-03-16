import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Villager } from "@/lib/types";

const VILLAGERS_COLLECTION = "villagers";

export async function getVillagers(): Promise<Villager[]> {
  const snapshot = await getDocs(collection(db, VILLAGERS_COLLECTION));
  return snapshot.docs.map((d) => {
    const data = d.data() as Omit<Villager, "id">;
    return { id: d.id, ...data };
  });
}

export async function getVillagerById(id: string): Promise<Villager | null> {
  const snap = await getDoc(doc(db, VILLAGERS_COLLECTION, id));
  if (!snap.exists()) return null;
  const data = snap.data() as Omit<Villager, "id">;
  return { id: snap.id, ...data };
}
