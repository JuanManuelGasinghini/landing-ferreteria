import { useEffect, useMemo, useState } from 'react'
import { isFirebaseConfigured } from '../services/firebase/config'
import { fetchProducts } from '../services/firebase/productsRepository'
import { mapFirestoreProductToUiProduct } from '../data/productUiMapper'
import { bestSellerProducts, featuredProducts } from '../data/products'

export function useShopProducts() {
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState(featuredProducts)
  const [remoteState, setRemoteState] = useState('fallback') // 'not_configured' | 'loaded' | 'empty' | 'error'

  useEffect(() => {
    let cancelled = false

    async function load() {
      setIsLoading(true)
      try {
        if (!isFirebaseConfigured) {
          setProducts(featuredProducts)
          setRemoteState('not_configured')
          return
        }

        const remoteProducts = await fetchProducts()
        const mapped = remoteProducts.map(mapFirestoreProductToUiProduct)

        if (!cancelled) {
          setProducts(mapped)
          setRemoteState(remoteProducts.length > 0 ? 'loaded' : 'empty')
        }
      } catch {
        if (!cancelled) {
          setProducts(featuredProducts)
          setRemoteState('error')
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const bestSeller = useMemo(() => {
    if (remoteState === 'loaded') {
      return [...products]
        .sort((a, b) => (b.stock ?? 0) - (a.stock ?? 0))
        .slice(0, 3)
        .map((p, index) => ({
          id: `best-${p.id}-${index}`,
          name: p.name,
          summary: p.description,
          badge: 'Selección por disponibilidad',
          imageUrl: p.imageUrl,
          imageAlt: p.imageAlt,
        }))
    }

    // Fallback local only when Firebase is not configured or fetch fails.
    if (remoteState === 'not_configured' || remoteState === 'error') {
      return bestSellerProducts
    }

    return []
  }, [remoteState, products])

  return { isLoading, products, bestSeller }
}

