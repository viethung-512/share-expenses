import { firestoreAdmin } from "@/lib/firebase/admin";
import { firestore } from "firebase-admin";
import WhereFilterOp = firestore.WhereFilterOp;

export type FilterListInput<T> = Partial<{
  [field in keyof T]: {
    operation: WhereFilterOp | "like";
    value: any;
  };
}>;

export abstract class BaseAdapter<T extends object> {
  protected abstract collectionName: string;

  private getDocRef(id: string) {
    return firestoreAdmin.doc(`${this.collectionName}/${id}`);
  }

  async getDoc(id: string): Promise<T | null> {
    const docRef = this.getDocRef(id);
    const docSnap = await docRef.get();
    return docSnap.exists ? (docSnap.data() as T) : null;
  }

  async getList(filters?: FilterListInput<T>): Promise<(T & { id: string })[]> {
    // Start a query from the collection reference and chain filters onto it.
    let query: firestore.Query = firestoreAdmin.collection(
      this.collectionName,
    ) as firestore.CollectionReference;

    if (filters) {
      Object.keys(filters).forEach((filter) => {
        const filterData = filters[filter as keyof T];
        if (filterData && filterData.value !== undefined) {
          if (filterData.operation === "like") {
            // Perform a prefix match using range queries.
            // Example: value = "foo" -> where >= "foo" and <= "foo\uf8ff"
            const valueStr = String(filterData.value);
            const start = valueStr;
            const end = valueStr + "\uf8ff";
            query = query.where(filter, ">=", start).where(filter, "<=", end);
          } else {
            // .where returns a new Query — assign it back so chaining works
            query = query.where(
              filter,
              filterData.operation as WhereFilterOp,
              filterData.value,
            );
          }
        }
      });
    }

    const snapshot = await query.get();
    return snapshot.docs.map(
      (doc) => ({ ...(doc.data() as T), id: doc.id }) as T & { id: string },
    );
  }

  async createDoc(data: Partial<T>) {
    const docRef = await firestoreAdmin
      .collection(this.collectionName)
      .add(data as T);
    return docRef.id;
  }

  async updateDoc(id: string, data: Partial<T>) {
    const docRef = this.getDocRef(id);
    await docRef.set(data, { merge: true });
  }

  async deleteDoc(id: string) {
    const docRef = this.getDocRef(id);
    await docRef.delete();
  }
}
