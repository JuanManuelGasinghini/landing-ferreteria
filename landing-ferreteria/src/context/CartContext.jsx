import { useCallback, useEffect, useMemo, useState } from 'react'
import { CartContext } from './cart-context'
import { getRemoteCart, saveRemoteCart } from '../services/firebase/cartRepository'

const CART_ID_KEY = 'casa-fluxo-cart-id'
const CART_ITEMS_KEY = 'casa-fluxo-cart-items'

function getOrCreateCartId() {
  const savedId = localStorage.getItem(CART_ID_KEY)
  if (savedId) {
    return savedId
  }

  const generatedId = `cart_${Date.now()}_${Math.random().toString(16).slice(2, 10)}`
  localStorage.setItem(CART_ID_KEY, generatedId)
  return generatedId
}

function parsePriceToNumber(priceText) {
  if (typeof priceText !== 'string') {
    return 0
  }

  const sanitized = priceText.replace(/[^\d]/g, '')
  const numberValue = Number(sanitized)
  return Number.isNaN(numberValue) ? 0 : numberValue
}

function formatPrice(value) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(value)
}

export function CartProvider({ children }) {
  const [cartId, setCartId] = useState('')
  const [items, setItems] = useState([])
  const [isHydrating, setIsHydrating] = useState(true)

  useEffect(() => {
    const nextCartId = getOrCreateCartId()
    setCartId(nextCartId)

    const localItems = localStorage.getItem(CART_ITEMS_KEY)
    if (localItems) {
      try {
        setItems(JSON.parse(localItems))
      } catch {
        setItems([])
      }
    }

    const hydrateRemoteCart = async () => {
      try {
        const remoteItems = await getRemoteCart(nextCartId)
        if (remoteItems) {
          setItems(remoteItems)
        }
      } catch {
        // If Firestore is unavailable, app still works with local persistence.
      } finally {
        setIsHydrating(false)
      }
    }

    hydrateRemoteCart()
  }, [])

  useEffect(() => {
    if (!cartId || isHydrating) {
      return
    }

    localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(items))
    saveRemoteCart(cartId, items).catch(() => {
      // Ignore sync errors, local state remains source of truth for UX continuity.
    })
  }, [cartId, isHydrating, items])

  const addItem = useCallback((product) => {
    setItems((previousItems) => {
      const foundItem = previousItems.find((item) => item.id === product.id)
      if (foundItem) {
        return previousItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }

      return [
        ...previousItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          priceValue: parsePriceToNumber(product.price),
          quantity: 1,
        },
      ]
    })
  }, [])

  const removeItem = useCallback((productId) => {
    setItems((previousItems) => previousItems.filter((item) => item.id !== productId))
  }, [])

  const updateQuantity = useCallback((productId, quantity) => {
    setItems((previousItems) =>
      previousItems
        .map((item) => (item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item))
        .filter((item) => item.quantity > 0),
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const cartCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  )

  const cartTotal = useMemo(
    () => items.reduce((total, item) => total + item.priceValue * item.quantity, 0),
    [items],
  )

  const value = useMemo(
    () => ({
      items,
      cartCount,
      cartTotal,
      cartTotalFormatted: formatPrice(cartTotal),
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [items, cartCount, cartTotal, addItem, removeItem, updateQuantity, clearCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
