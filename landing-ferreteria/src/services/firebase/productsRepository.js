import { collection, getDocs } from 'firebase/firestore'
import { db, isFirebaseConfigured } from './config'

const PRODUCTS_COLLECTION = 'products'

/**
 * Fetches all products from Firestore.
 * Note: filtering/featured/best-sellers is computed in the client layer.
 */
export async function fetchProducts() {
  if (!isFirebaseConfigured || !db) {
    return []
  }

  const snapshot = await getDocs(collection(db, PRODUCTS_COLLECTION))
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

