import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db, isFirebaseConfigured } from './config'

const CART_COLLECTION = 'carts'

export async function getRemoteCart(cartId) {
  if (!isFirebaseConfigured || !db) {
    return null
  }

  const cartRef = doc(db, CART_COLLECTION, cartId)
  const snapshot = await getDoc(cartRef)
  if (!snapshot.exists()) {
    return null
  }

  const data = snapshot.data()
  return Array.isArray(data.items) ? data.items : []
}

export async function saveRemoteCart(cartId, items) {
  if (!isFirebaseConfigured || !db) {
    return
  }

  const cartRef = doc(db, CART_COLLECTION, cartId)
  await setDoc(
    cartRef,
    {
      items,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  )
}
