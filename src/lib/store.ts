import { create } from 'zustand';
import { 
  collection, 
  onSnapshot, 
  query, 
  setDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  getDocs,
  Timestamp
} from 'firebase/firestore';
import { db, OperationType, handleFirestoreError } from './firebase';

interface SystemState {
  users: any[];
  clients: any[];
  leads: any[];
  projects: any[];
  inventory: any[];
  collaborators: any[];
  production_orders: any[];
  isLoading: boolean;
  error: string | null;

  // Sync methods
  syncCollection: (collectionName: string) => () => void;
  
  // CRUD methods
  addItem: (collectionName: string, id: string, data: any) => Promise<void>;
  updateItem: (collectionName: string, id: string, data: any) => Promise<void>;
  removeItem: (collectionName: string, id: string) => Promise<void>;
  
  // Seeding helper
  seedCollection: (collectionName: string, data: any[]) => Promise<void>;
}

export const useStore = create<SystemState>((set, get) => ({
  users: [],
  clients: [],
  leads: [],
  projects: [],
  inventory: [],
  collaborators: [],
  production_orders: [],
  isLoading: false,
  error: null,

  syncCollection: (collectionName) => {
    set({ isLoading: true });
    const q = query(collection(db, collectionName));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      set({ [collectionName]: items, isLoading: false });
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, collectionName);
      set({ error: error.message, isLoading: false });
    });

    return unsubscribe;
  },

  addItem: async (collectionName, id, data) => {
    try {
      const docRef = doc(db, collectionName, id);
      await setDoc(docRef, { ...data, createdAt: Timestamp.now() });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `${collectionName}/${id}`);
    }
  },

  updateItem: async (collectionName, id, data) => {
    try {
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, { ...data, updatedAt: Timestamp.now() });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${collectionName}/${id}`);
    }
  },

  removeItem: async (collectionName, id) => {
    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${collectionName}/${id}`);
    }
  },

  seedCollection: async (collectionName, data) => {
    const existingData = get()[collectionName as keyof SystemState];
    if (Array.isArray(existingData) && existingData.length > 0) return;

    console.log(`Seeding ${collectionName}...`);
    for (const item of data) {
      const { id, ...rest } = item;
      await setDoc(doc(db, collectionName, id), { ...rest, createdAt: Timestamp.now() });
    }
  }
}));
